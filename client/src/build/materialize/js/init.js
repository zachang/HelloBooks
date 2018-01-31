$(document).ready(() => {
  $('.button-collapse').sideNav({
    closeOnclick: true,
    menuWidth:250,
  });

  $('.menu-iconic-link').click(function () {
    $('body').css({'width': '100%', 'overflow-y': 'auto'});
  });
});