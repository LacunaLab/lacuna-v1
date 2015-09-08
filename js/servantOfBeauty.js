$(document).ready(function(){
  $('a').attr('target', '_blank');

  // Retina images.
  if (window.devicePixelRatio == 2){
    $("#header img").each(function(){
      var n = $(this).attr("src");
      $(this).attr("src", n.substring(0, n.lastIndexOf('.')) + "X2" + n.substring(n.lastIndexOf('.')));
    });
  }
});