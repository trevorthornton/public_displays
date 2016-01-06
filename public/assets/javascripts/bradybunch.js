$(document).ready( function() {

  var context = new AudioContext();

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var playlist = prelinger_playlist();

  var media_path = 'assets/media/prelinger_video/';

  var playlistCurrentIndex = 0;

  function executeCallback(callback) {
    if (typeof callback !== 'undefined') {
      callback();
    }
  }

  $.fn.extend({

    playNext: function() {
      nextUrl = media_path + playlist[playlistCurrentIndex];
      playlistCurrentIndex++;
      player = this[0];
      player.src = nextUrl;
      player.load();
      player.play();
    },

    appendVideoPlayer: function() {
      $(this).append('<div class="player-wrapper"><video/></div>');
    }
  });

  playlist = shuffle(playlist);

  $(".tvl-zone").not('.hidden').appendVideoPlayer();

  var players = $('video');

  console.log(players);

  $(players).each(function() {
    $(this).volume = 0;

    $(this).playNext();

    $(this).on('ended', function() {
      $(this).playNext();
    });

  });

});
