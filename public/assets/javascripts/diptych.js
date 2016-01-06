$(document).ready(function() {

  var players = $('#player1, #player2');
  var player1 = $('#player1').first();
  var player2 = $('#player2').first();
  var player1Complete = false;
  var player2Complete = false;
  var played = [];

  var playlist;

  // var next = null;
  var videoPath = "http://localhost:9292/assets/video/"
  var repeatIndex = 0;
  var skip = [];
  var current;

  $(players).each(function() {
    this.volume = 0;
  });

  var executeCallback = function(fn, data){
    if (typeof fn !== 'undefined') {
      fn(data);
    }
  }

  var restartReady = function() {
    if (player1Complete && player2Complete) {
      player1Complete = false;
      player2Complete = false;
      return true;
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


  var removeBadFilesFromPlaylist = function() {
    for (var i = 0; i < skip.length; i++) {
      removeFromArray(playlist, skip[i]);
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



  var playNext = function() {
    var next = getNext();
    current = next;
    console.log("now playing: " + current);

    player2[0].src = videoPath + current;
    player2[0].play();

    $(player2[0]).on('playing', function() {
      player1[0].play();
    });

    $(player2[0]).on('play', function() {
      if (played.indexOf(current) < 0) {
        played.push(current);
      }
    });
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

  updatePlaylist(playNext);
});
