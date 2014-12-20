$(document).ready(function() {
  $('a.menu').click(function() {
    $('.site-header nav').slideToggle(100);
    return false;
  });

  $(window).resize(function(){
    var w = $(window).width();
    var menu = $('.site-header nav');
    if(w > 680 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });


  $('article.post iframe').wrap('<div class="video-container" />');

});

$(document).ready(function() {
    var vpH = $(window).height();
    var vH = vpH - 350;
    $('.overlay').css("height", vH);
    $('.featured-image').css("height", vH);
});

$(function(){
    $('.post-list li').each(function(i){
        var t = $(this);
        setTimeout(function(){ t.addClass('slider'); }, (i+1) * 330);
    });
});

var volumeOn = false;

function toggleVolume() {
  if (volumeOn == false) {
    player.loader.player.volume = 100;
    volumeOn = !volumeOn;
    $('#volume_font').removeClass('fa-volume-off').addClass('fa-volume-up')

  } else {
    player.loader.player.volume = 0;
    volumeOn = !volumeOn;
    $('#volume_font').removeClass('fa-volume-up').addClass('fa-volume-off')
  }
}

$('#volume_button').click(function(){ toggleVolume(); return false; });
