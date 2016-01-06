$(document).ready( function() {

  var players = $('video');


  console.log(players);





  var playlist = [
    'https://archive.org/download/Sleepfor1950/Sleepfor1950_512kb.mp4',
    'https://archive.org/download/JoanAvoi1947/JoanAvoi1947_512kb.mp4',
    'https://archive.org/download/EatforHe1954/EatforHe1954_512kb.mp4',
    'https://archive.org/download/MakeMine1948/MakeMine1948_512kb.mp4',
    'https://archive.org/download/bacteria_friend_and_foe/bacteria_friend_and_foe_512kb.mp4',
    'https://archive.org/download/isforAto1953/isforAto1953_512kb.mp4',
    'https://archive.org/download/a-bomb_blast_effects/a-bomb_blast_effects_512kb.mp4',
    'https://archive.org/download/AboutBan1935/AboutBan1935_512kb.mp4',
    'https://archive.org/download/Doctorin1946/Doctorin1946_512kb.mp4',
    'https://archive.org/download/FromtheG1954/FromtheG1954_512kb.mp4',
    'https://archive.org/download/Achievem1955/Achievem1955_512kb.mp4',
    'https://archive.org/download/0621_1952_Chevrolet_Advertising_M02527_18_00_55_00/0621_1952_Chevrolet_Advertising_M02527_18_00_55_00_3mb.mp4',
    'https://archive.org/download/1955Chev1955/1955Chev1955_512kb.mp4',
    'https://archive.org/download/0413_5050_Chance_A_15_11_39_00/0413_5050_Chance_A_15_11_39_00_3mb.ogv',
    'https://archive.org/download/ChinaGir1970/ChinaGir1970_512kb.mp4',
    'https://archive.org/download/Californ1939/Californ1939_512kb.mp4',
    'https://archive.org/download/0053_California_Picture_Book_05_26_28_00/0053_California_Picture_Book_05_26_28_00.mp4',
    'https://archive.org/download/0042_Capitalism_E00102_18_20_52_00/0042_Capitalism_E00102_18_20_52_00-0010.mp4',
    'https://archive.org/download/0852_Captain_John_Smith_Founder_of_Virginia/0852_Captain_John_Smith_Founder_of_Virginia_02_22_30_00_3mb.mp4',
    'https://archive.org/download/6060_Ransohoffs_Goes_to_the_Fair_March_12th_1939_01_21_14_09/6060_Ransohoffs_Goes_to_the_Fair_March_12th_1939_01_21_14_09.mp4',
    'https://archive.org/download/0505_Bomber_10_11_25_08/0505_Bomber_10_11_25_08.mp4',
'https://archive.org/download/6393_HM_Can_10877_1_S_F_-N_O_1935_01_33_00_09/6393_HM_Can_10877_1_S_F_-N_O_1935_01_33_00_09_3mb.mp4',
'https://archive.org/download/Gould_can_5483_1_Kinograms_Newsreel/0206_Gould_can_5483_1_Kinograms_Newsreel_01_44_19_00_3mb.ogv',
'https://archive.org/download/6396_HM_Radde_Collection_Palm_Sunday_Cottage_and_Flats_1940-41_01_13_22_00/6396_HM_Radde_Collection_Palm_Sunday_Cottage_and_Flats_1940-41_01_13_22_00_3mb.mp4',
'https://archive.org/download/0516_Social_Seminar_Bunny_08_18_38_02/0516_Social_Seminar_Bunny_08_18_38_02.mp4',
'https://archive.org/download/Gould_can_5483_6_Kinograms_Newsreel/0206_Gould_can_5483_6_Kinograms_Newsreel_01_51_12_09_3mb.ogv',
'https://archive.org/download/0881_Tuna_Seining_and_Porpoise_Safety_04_22_43_00/0881_Tuna_Seining_and_Porpoise_Safety_04_22_43_00.mp4',
'https://archive.org/download/0782_Taft_Center_Story_The_21_01_04_00/0782_Taft_Center_Story_The_21_01_04_00.mp4',
'https://archive.org/download/0426_Industrial_Breakthrough_00_10_25_00/0426_Industrial_Breakthrough_00_10_25_00.mp4',
'https://archive.org/download/Pa2118London/Pa2118London.ogv',
'https://archive.org/download/0566_Sinclair_Driveway_Selling_and_Appearance_11_10_42_00/0566_Sinclair_Driveway_Selling_and_Appearance_11_10_42_00.mp4',
'https://archive.org/download/0597_McCarthy_09_32_35_00/0597_McCarthy_09_32_35_00.mp4',

  ]

  // var playlist = [
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0110-178-001/ua024-002-bx0110-178-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-248-001/ua024-002-bx0113-248-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0121-277-001/ua024-002-bx0121-277-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-245-001/ua024-002-bx0113-245-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0120-125-001/ua024-002-bx0120-125-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-238-001/ua024-002-bx0113-238-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0110-147-001/ua024-002-bx0110-147-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-237-001/ua024-002-bx0113-237-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-244-001/ua024-002-bx0113-244-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0113-241-001/ua024-002-bx0113-241-001.mp4',
  //   'http://siskel.lib.ncsu.edu/SCRC/ua024-002-bx0110-198-001/ua024-002-bx0110-198-001.mp4'
  // ]

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

  playlist = shuffle(playlist);

  var playlistCurrentIndex = 0;


  $('.play-pause').on('click', function() {

    if ($(this).hasClass('pause')) {
      $(players).each(function() {
        this.pause();
      });
      $(this).removeClass('pause');
    }
    else {
      $(players).each(function() {
        this.play();
      });
      $(this).addClass('pause');
    }
  });

  function executeCallback(callback) {
    if (typeof callback !== 'undefined') {
      callback();
    }
  }

  $.fn.extend({

    playNext: function() {
      nextUrl = playlist[playlistCurrentIndex];
      playlistCurrentIndex++;
      player = this[0]
      player.src = nextUrl;
      player.load();
      player.play();
    },
    manageAudio: function() {
      var minVol = 0.1;
      var maxVol = 0.80;
      // var fadeIncrement = 0.05;
      // var fadeStep = 50;
      // var fadeDuration = ((maxVol - minVol) / fadeIncrement) * fadeStep;
      var fadeDuration = 15000;
      var holdDuration = 5000;
      var crossfadeOffset = 7000;
      var presentationInterval = ((fadeDuration) + holdDuration) - crossfadeOffset;

      var playerIndex = $(players).index(this);

      players.each(function() {
        this.volume = minVol;
      });

      var presentationPhase = function(player) {
        var vol = minVol;

        var fadeIn = function(callback) {

          console.log('fade in');

          $(player).animate({volume: maxVol}, fadeDuration);

          executeCallback(callback);
        }

        var fadeOut = function(callback) {

          console.log('fade out');

          $(player).animate({volume: minVol}, fadeDuration);

          executeCallback(callback);
        }

        fadeIn(function() {
          setTimeout(fadeOut, holdDuration);
        });

        console.log(player.volume);

      }


      var presentAudio = function(index, callback) {
        var player = players[index];
        presentationPhase(player);
        executeCallback(callback);
      }

      i = 0;
      presentAudio(i);

      setInterval(function() {
        console.log(i);
        console.log(players.length - 1);
        i = (i == players.length - 1) ? 0 : i + 1;
        presentAudio(i);
      }, presentationInterval);

    }
  });



  /*

  raise audio levels for each player in succession
  for each player:
    start 0 at 0.8
    atart others at 0.1

  */
  $(players).manageAudio();

  $(players).each(function() {

    $(this).playNext();

    $(this).on('ended', function() {
      $(this).playNext();
    });

  });


  transform_scale();


});

/*

To do:
Deal with audio!
SEE:
http://stackoverflow.com/questions/15118524/get-audio-from-an-html5-video
http://www.html5rocks.com/en/tutorials/webaudio/intro/

*/
