
// Author: Guilherme Jaccoud <admin@tropicloud.net>
// Author URI: http://tapioca.ws
// Description: Chaordic Frontline
// Version: 0.4.7

//  Chaordic Script
var onSiteJS1 = $.getScript('//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.min.js');
var onSiteJS2 = $.getScript('//cdn.jsdelivr.net/mustache.js/2.1.3/mustache.min.js');
var onSiteJS3 = $.getScript('//cdn.jsdelivr.net/jquery.truncate/0.1/jquery.truncate.min.js');

// Chaordic Style
var onSiteCSS = [
  '//cdn.jsdelivr.net/pure/0.6.0/pure-min.css',
  '//cdn.jsdelivr.net/pure/0.6.0/grids-responsive-min.css',
  '//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.css',
  '//cdn.jsdelivr.net/jquery.slick/1.5.8/slick-theme.css',
  '//cdn.jsdelivr.net/fontawesome/4.4.0/css/font-awesome.min.css',
  '//cdn.rawgit.com/tropicloud/chaordic-frontline/master/chaordic/onsite.css'
];

// Chaordic CSS
$.each( onSiteCSS, function( index, style ) {
  $('head').append('<link rel="stylesheet" href="' + style + '">');
});

// Chaordic OnSite
$.when( onSiteJS1, onSiteJS2, onSiteJS3 )
 .then(function () {
   $('.chaordic-container').each(function () {
    var id = '#' + $(this).attr('id');
    var endpoint = $(this).attr('endpoint');
    var template = $(this).attr('template');
    $.when(
      $.get(template),
      $.getJSON(endpoint)
    ).then(function (template,response) {
      var containerTemplate = $(template[0]).filter('#container-template').html();
      var referenceTemplate = $(template[0]).filter('#reference-template').html();
      var recommendTemplate = $(template[0]).filter('#recommend-template').html();
      var containerRender = Mustache.render(containerTemplate);
      var referenceRender = Mustache.render(referenceTemplate, response[0].data);
      var recommendRender = Mustache.render(recommendTemplate, response[0].data);
      $(id).html(containerRender);
      $(id).find('.chaordic-ref').html(referenceRender).slick();
      $(id).find('.chaordic-rec').html(recommendRender).slick(onsiteConfig.carousel);
      $(id).find('.chaordic-item .name').truncate(onsiteConfig.truncation);
    });
  })
});
