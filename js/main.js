// Header when scroll the page
$(window).on('scroll', function () {
  if ($(window).scrollTop() >= 30) {
    $('.page-header').addClass('page-header--scroll');
  } else {
    $('.page-header').removeClass('page-header--scroll');
  }
});


// Button to scroll top
var buttonTop = $('.scroll-button')
$(window).on('scroll', function () {
  if ($(window).scrollTop() >= 50) {
    buttonTop.fadeIn();
  } else {
    buttonTop.fadeOut();
  }
});

buttonTop.on('click', function (){
  $('html,body').animate({scrollTop:0}, 900)
});


// Popup
$('.modal-open').click(function (event) {
  event.preventDefault();
  $('.modal__overlay').fadeIn(350);
  $('.modal__sign-up').css('opacity','0').css('display','block');
    setTimeout (function () {
      $('.modal__sign-up').css('display','block');
    }, 350);
  $('.modal__sign-up').addClass('modal-opening');
  $('.modal__content-wrapper').addClass('content-opening');
  $('.modal__mobile').focus();
});

$('.modal__close').click(function (event) {
  event.preventDefault();
  $('.modal__sign-up').fadeOut(350);
  $('.modal__overlay').fadeOut(350);
});

$('.modal__overlay').click(function() {
  $('.modal__sign-up').fadeOut(350);
  $('.modal__overlay').fadeOut(350);
});

$(document).keydown(function(e) {
  if (e.keyCode == 27) {
    $('.modal__sign-up').fadeOut(350);
    $('.modal__overlay').fadeOut(350);
    }
});
