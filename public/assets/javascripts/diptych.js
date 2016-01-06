$(document).ready(function() {

  var players = $('#player1, #player2');
  var player1 = $('#player1').first();
  var player2 = $('#player2').first();
  var player1Complete = false;
  var player2Complete = false;
  var played = [];
  var next = null;
  var videoPath = "http://localhost:9292/assets/video/"
  var repeatIndex = 0;
  var skip = [];
  var current = null;

  $(players).each(function() {
    this.volume = 0;
  });

  var executeCallback = function(fn, data){
    if (typeof fn !== 'undefined') {
      fn(data);
    }
  }

  var resetReady = function() {
    if (player1Complete && player2Complete) {
      player1Complete = false;
      player2Complete = false;
      return true;
    }
  }

  var removeFromPlayed = function(filename) {
    var index = played.indexOf(filename)
    if (index > -1) {
      played.splice(index, 1);
    }
  }

  var updateNext = function(callback) {
    $.get( "http://localhost:9292", function( data ) {

      var playlist = data['playlist'];

      next = null;

      for (var i = 0; i < playlist.length; i++) {
        var filename = playlist[i];
        if (skip.indexOf(filename) > -1) {
          continue;
        }
        else {
          if (played.indexOf(filename) < 0) {
            next = filename;
            break;
          }
          else {
            continue;

          }
        }

        if (!next) {
          next = played[repeatIndex];
          repeatIndex = (repeatIndex >= played.length - 1) ? 0 : (repeatIndex + 1);
        }

      }
      executeCallback(callback);
    });
  }

  var playNext = function() {
    console.log(next);
    current = next;

    player2[0].src = videoPath + next;
    // player2[0].load();
    $(player2).each(function() {
      this.play();
      $(this).on('playing', function() {
        played.push(current);
        player1[0].play();
        updateNext();
      })
    })
  }

  var resetIfReady = function() {
    if (resetReady()) {
      playNext();
    }
  }

  var forceReset = function() {
    player1Complete = true;
    player2Complete = true;
    updateNext(playNext);
  }

  // var diptych = new Diptych();
  $(player1).on('ended', function() {
    player1Complete = true;
    resetIfReady();
  });

  $(player2).on('ended', function() {
    player2Complete = true;
    resetIfReady();
  });

  $(player2).on('error', function() {
    skip.push(current);
    removeFromPlayed(current);
    console.log('ERRR');
    forceReset();
  });

  updateNext(playNext);
});
