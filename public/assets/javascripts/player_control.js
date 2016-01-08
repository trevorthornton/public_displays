$(document).ready(function() {

  // CONFIGUABLES
  var videoPath = "http://localhost:9292/assets/video/"
  // END CONFIGUABLES

  var playlist;
  var repeatIndex = 0;
  var skip = [];
  var current;
  var played = [];

  var executeCallback = function(fn, data){
    if (typeof fn !== 'undefined') {
      fn(data);
    }
  }

  var removeFromArray = function(array, element) {
    var index = array.indexOf(element)
    if (index > -1) {
      array.splice(index, 1);
    }
  }


  var removeFromPlayed = function(filename) {
    removeFromArray(played, filename);
  }


  var removeFromPlaylist = function(filename) {
    removeFromArray(playlist, filename);
  }


  var removeBadFilesFromPlaylist = function() {
    for (var i = 0; i < skip.length; i++) {
      removeFromPlaylist(skip[i]);
    }
  }


  // Remove files from played that are no longer on the playlist
  var prunePlayed = function() {
    for (var i = 0; i < played.length; i++) {
      var filename = played[i];
      if (playlist.indexOf(filename) < 0) {
        removeFromPlayed(filename);
      }
    }
  }


  var unplayed = function() {
    var unplayedFiles = [];
    for (var i = 0; i < playlist.length; i++) {
      var filename = playlist[i];
      if (skip.indexOf(filename) > -1) {
        continue;
      }
      else {
        if (played.indexOf(filename) < 0) {
          unplayedFiles.push(filename);
        }
        else {
          continue;
        }
      }
    }
    return unplayedFiles;
  }


  var getNext = function() {
    var next;
    var unplayedFiles = unplayed();

    if (unplayedFiles.length > 0) {
      next = unplayedFiles.shift();
    }
    else {
      // Handle case where played array is truncated by playlist update
      if (repeatIndex >= played.length) {
        repeatIndex = 0;
      }
      next = played[repeatIndex];
      console.log("next: repeating from played at index" + repeatIndex + ": " + next);
      repeatIndex = (repeatIndex >= played.length - 1) ? 0 : (repeatIndex + 1);
      console.log("next repeatIndex: " + repeatIndex);
    }

    return next;
  }


  var updatePlaylist = function(callback) {
    $.get( "http://localhost:9292", function( data ) {
      console.log("playlist retrieved");
      playlist = data['playlist'];
      prunePlayed();
      removeBadFilesFromPlaylist();
      executeCallback(callback);
    });
  }


  $.fn.extend({

    diptych: function() {

      var players = $('#player1, #player2');
      var player1 = document.getElementById("player1");
      var player2 = document.getElementById("player2");

      var player1Complete = false;
      var player2Complete = false;

      var playNext = function() {
        var next = getNext();
        current = next;
        console.log("now playing: " + current);

        player2.src = videoPath + current;
        player2.play();

        $(player2).on('playing', function() {
          player1.play();
        });

        $(player2).on('play', function() {
          if (played.indexOf(current) < 0) {
            played.push(current);
          }
        });
      }

      var restartReady = function() {
        if (player1Complete && player2Complete) {
          player1Complete = false;
          player2Complete = false;
          return true;
        }
      }

      var restart = function() {
        var unplayedFiles = unplayed();

        console.log("unplayed: " + unplayedFiles);
        console.log("played: " + played);
        console.log("skip: " + skip);

        if (unplayedFiles.length > 0) {
          playNext();
        }
        else {
          updatePlaylist(playNext);
        }
      }

      var restartIfReady = function() {
        if (restartReady()) {
          restart();
        }
      }

      var forceRestart = function() {
        player1Complete = true;
        player2Complete = true;
        restart();
      }

      $(player1).on('ended', function() {
        player1Complete = true;
        restartIfReady();
      });

      $(player2).on('ended', function() {
        player2Complete = true;
        restartIfReady();
      });

      $(player2).on('error', function() {
        skip.push(current);
        removeFromPlayed(current);
        console.log('ERRR');
        forceRestart();
      });

      $(player1).on('loadeddata', function() {
        updatePlaylist(playNext);
      });
    },


    bradybunch: function() {

      var players = $(this).find('video');

      var testVid = "1L4A7202_4x3.mp4";

      var filenameFromUrl = function(url) {
        var parts = url.split('/');
        return parts[parts.length -1];
      }

      $(players).each(function() {

        var player = this;

        this.src = videoPath + testVid;
        this.play();

        var playNext = function(player) {
          var next = getNext();
          console.log("now playing: " + next);

          player.src = videoPath + next;
          player.play();

          $(player).on('play', function() {
            if (played.indexOf(current) < 0) {
              played.push(current);
            }
          });
        }

        $(this).on('error', function() {
          var filename = filenameFromUrl(player.src);
          skip.push(filename);
          removeFromPlayed(filename);
          console.log('ERRR');
          playNext(player);
        });

      });

    }


  });


  var diptych = $('.diptych');
  if (diptych.length > 0) {
    diptych.diptych();
  }

  $('.bradybunch').bradybunch();

});
