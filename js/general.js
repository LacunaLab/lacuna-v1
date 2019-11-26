$(function() {

  // this is the navbar animate to section code
  $("#header a").click(function(ev) {
    var linkTo = this.getAttribute("linkTo");
    var linkToSelector = "#" + linkTo;
    if ($(linkToSelector)[0] == undefined) return;

    ev.preventDefault();
    ev.stopImmediatePropagation();

    $('html, body').animate({
      scrollTop: $(linkToSelector).offset().top -100,
      easeing: "ease-out"
    }, "slow");

    $('#header a').each((i, e) => { $(e).removeClass('active'); });
    if (ev.target.tagName == "IMG")
        $('#mainNavigation a').first().addClass('active');
    else
        $(ev.target).addClass('active');
  });

  var sectionPosTop = [];
  $('.highlight').each(function(i) { 
    var o = $(this)[0];
    sectionPosTop.push({
      name: o.dataset.highlightMenu,
      top: $(o).position().top
    });
  })

  if (sectionPosTop.length > 0) {
      $(window).scroll($.throttle(250, function() {
        var doc = $(document);
        var scroll = doc.scrollTop();
        var scrollMax = (doc.height() - $(window).height());
        var percent = scroll / scrollMax;
        var y = doc.height() * percent * 0.9;
        var i = sectionPosTop.length - 1;
        while(y < sectionPosTop[i].top && i > 0) {
          i--;
        }
        var which = sectionPosTop[i].name;

        // hide logo when on 'about' sectionPos
        var logo = $('.navbar-brand a[linkTo=about]');
        var targetOpacity = (which == 'about') ? 0 : 1;
        var opacity = logo.css('opacity');
        if(opacity != targetOpacity) {
          logo.fadeTo(500, targetOpacity);
        }

        // deactivate all links
        $('.navbar-link').removeClass('active');

        // activate right one
        $('a.navbar-link[linkTo=' + which + ']').addClass('active');
      }));
  }
});
