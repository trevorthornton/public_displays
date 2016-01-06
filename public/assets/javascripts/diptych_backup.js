$(document).ready(function() {

  var players = $('#player1, #player2');
  var player1 = $('#player1').first();
  var player2 = $('#player2').first();
  var player1Complete = false;
  var player2Complete = false;
  var played = [];

  var playlist = [];

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


  var removeFromArray = function(array, element) {
    var index = array.indexOf(element)
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  var removeFromPlayed = function(filename) {
    removeFromArray(played, filename);
  }


  // var updatePlaylist = function() {
  //   $.get( "http://localhost:9292", function( data ) {
  //     console.log("playlist retrieved");
  //     var playlist = data['playlist'];
  // }


  var prunePlayed = function(files) {
    for (var i = 0; i < files.length; i++) {
      if ()
    }
  }


  var updateNext = function(callback) {
    $.get( "http://localhost:9292", function( data ) {
      console.log("playlist retrieved");
      var playlist = data['playlist'];
      next = null;
      for (var i = 0; i < playlist.length; i++) {
        var filename = playlist[i];
        if (skip.indexOf(filename) > -1) {
          console.log("next: skipped: " + filename);
          continue;
        }
        else {
          if (played.indexOf(filename) < 0) {
            console.log("next: playing first time: " + filename);
            next = filename;
            break;
          }
          else {
            continue;
          }
        }
      }
      if (!next) {
        next = played[repeatIndex];
        console.log("next: repeating from played at index" + repeatIndex + ": " + next);
        repeatIndex = (repeatIndex >= played.length - 1) ? 0 : (repeatIndex + 1);
        console.log("new repeatIndex: " + repeatIndex);
      }
      executeCallback(callback);
    });
  }


  var playNext = function() {
    current = next;

    console.log("now playing: " + next);

    player2[0].src = videoPath + next;
    // player2[0].load();

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


  var resetIfReady = function() {
    if (resetReady()) {
      updateNext(playNext);
    }
  }


  var forceReset = function() {
    player1Complete = true;
    player2Complete = true;
    updateNext(playNext);
  }

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
