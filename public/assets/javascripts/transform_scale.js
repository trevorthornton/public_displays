// In development resize the scale






function applyVideoRowHeight() {
  var videoRow = $('.row');
  var height = videoRow.height();
  $(videoRow).css({ 'margin-top': height / 2, 'top': '50%'});
}

jQuery(document).ready(function($) {


  function transform_scale(callback) {
    var db = document.body;
    var sx = db.clientWidth / window.innerWidth;
    var sy = db.clientHeight / window.innerHeight;
    // console.log([db.clientWidth, window.innerWidth, db.clientHeight, window.innerHeight])
    var transform = "scale(" + (1/Math.max(sx, sy)) + ")";
    // console.log([sx, sy, transform]);
    db.style.transform = transform;
    db.style.transform = transform;
    // callback(transform);
  }


  var scaleBoxes = function(transform) {
    $('.box').each(function() {
      this[0].style.transform = transform;
    });
    $('.row').each(function() {
      this[0].style.transform = transform;
    });
  }

  // applyVideoRowHeight();
  $(window).on('resize', function(){
    transform_scale();
    // applyVideoRowHeight();
  });

  transform_scale();
});
