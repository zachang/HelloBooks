$(document).ready(() => {
  $('.button-collapse').sideNav({
    closeOnclick: true,
    menuWidth:250,
  });

  $('body').click((event) => {
    $('#mobile-demo').css({"transform": "translateX(-100%)"});
  });
  $('#hambuger').click(() => {
    $('.drag-target').css({'left': '0px'});
  });
});