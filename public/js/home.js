$(document).ready(function(){
  $('#lrft-open').click(function(e){
    e.preventDefault();
    $('#shelf-header').addClass('shelf__header--show-back');
    $('#lrft-open').addClass('shelf__book--is-opened');
    $('#lrft-info').removeClass('shelf__info--is-hidden');
    $('#book-2').addClass('shelf__book--is-hidden');
    $('#book-3').addClass('shelf__book--is-hidden');
    $('#book-4').addClass('shelf__book--is-hidden');
    $('#shelf-footer').addClass('shelf__footer--is-hidden');
  });

  $('#lrft-back').click(function(e){
    $('#shelf-header').removeClass('shelf__header--show-back');
    $('#lrft-open').removeClass('shelf__book--is-opened');
    $('#lrft-info').addClass('shelf__info--is-hidden');
    $('#book-2').removeClass('shelf__book--is-hidden');
    $('#book-3').removeClass('shelf__book--is-hidden');
    $('#book-4').removeClass('shelf__book--is-hidden');
    $('#shelf-footer').removeClass('shelf__footer--is-hidden');
  });

  const growEmojis = ['🌱', '🌿', '🌳', '🌻', '🌷'];
  const expandEmojis = ['🍂', '🌼', '🌸', '🍃']; // not in use yet, needs different expand animation
  let rand = Math.floor(Math.random() * 9);
  $('#nature').text(growEmojis[rand]);
});
