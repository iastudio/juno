
$(function() {

  /////////////
  //   MAP   //
  /////////////

  if ($('#map').length > 0) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
          center: [43.110856, 131.916818],
          zoom: 17,
          controls: []
      });

      var myPlacemark = new ymaps.Placemark([43.110856, 131.916818], null, {
          iconLayout: 'default#image',
          iconImageHref: 'i/pin.png',
          iconImageSize: [37, 46],
          iconImageOffset: [-20,-50],
          iconShape: {
              type: 'Circle',
              coordinates: [0, 0],
              radius: 25
          },
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    });
  }

  /////////////////
  //   GALLERY   //
  /////////////////

  $('.item .item__images a').each(function(){
    var src = $(this).find('img').attr('src');
    $(this).css('background-image', 'url(' + src + ')');
    $(this).find('img').hide();
  });

  //////////////////////
  //   RANGE-SLIDER   //
  //////////////////////

  $( ".slider" ).slider({
    range: true,
    min: 1990,
    max: 2014,
    values: [ 1994, 2007 ],
    slide: function( event, ui ) {
      $(this).parent().find('.slider__year-1 strong').html(ui.values[ 0 ]);
      $(this).parent().find('.slider__year-2 strong').html(ui.values[ 1 ]);
    }
  });

  $( ".slider--1" ).slider({
    min: 1990,
    max: 2014,
    step: 1,
    values: [ 1994, 2007 ]
  });

  $( ".slider--2" ).slider({
    min: 700,
    max: 6000,
    step: 100,
    values: [ 1400, 3500 ]
  });

  $( ".slider--3" ).slider({
    min: 50,
    max: 4000,
    step: 50,
    values: [ 500, 2300 ]
  });

  $( ".slider" ).each( function() {
    var values = $(this).slider( "option", "values" );
    $(this).parent().find('.slider__year-1 strong').html(values[0]);
    $(this).parent().find('.slider__year-2 strong').html(values[1]);
  });

  ////////////////
  //   CHOSEN   //
  ////////////////

  $("select").chosen({disable_search_threshold: 10});

  /////////////////
  //   CAROUSEL  //
  /////////////////

  var carouselSlideSpeed = 500;
  var carouselEasing = 'linear';

  if ( $('.carousel .carousel__item').length > 4 ) {
    $('.carousel').each(function(){
      var $carousel = $(this);
      $carousel.find('ul li:last-child').prependTo( $carousel.find('ul') );
      var itemCount = $carousel.find('.carousel__item').length;
      var itemWidth = $carousel.find('.carousel__item').eq(0).outerWidth() + 15;
      var totalWidth = itemCount * itemWidth;
      $carousel.find('ul').css({ width: totalWidth, marginLeft: - itemWidth });
    });
  } else {
    $('.carousel__nav').hide();
  }

  $('.carousel__nav').on('click', function(e) {

    e.preventDefault();

    var $carousel = $(this).parent();
    var itemWidth = $carousel.find('.carousel__item').eq(0).outerWidth();

    if ($carousel.find('ul:animated').size() > 0) return;

    var direction;

    $(this).hasClass('carousel__nav--next') ? direction = 1 : direction = 0;

    if (direction == 1) {
      $carousel.find('ul').animate({
          left: - itemWidth
      }, carouselSlideSpeed, carouselEasing, function () {
          $carousel.find('ul li:first-child').appendTo( $carousel.find('ul') );
          $carousel.find('ul').css('left', '');
      });
    } else {
      $carousel.find('ul').animate({
          left: + itemWidth
      }, carouselSlideSpeed, carouselEasing, function () {
          $carousel.find('ul li:last-child').prependTo( $carousel.find('ul') );
          $carousel.find('ul').css('left', '');
      });
    }

  });

  /////////////////
  //    SLIDER   //
  /////////////////

  var autoSlider = true;
  var sliderSpeed = 4000;
  var sliderFadeSpeed = 500;
  var sliderEasing = 'linear';

  (function(){

    if ($('#slider-hero .slider__item').length > 0) {

      if ($('#slider-hero').attr('data-count') == undefined)
        $('#slider-hero').attr('data-count', 0);
      var count = parseInt($('#slider-hero').attr('data-count'));
      var slidesCount = $('#slider-hero .slider__item').size()-1;

    }

    $('#slider-hero .slider__nav').on('click', function(e) {
      e.preventDefault();

      if ($('#slider-hero .slider__item:animated').size()>0) return;

      var direction;
      $(this).hasClass('slider__nav--next') ? direction = 1 : direction = 0;

      if (direction == 0)
        (count == 0) ? count = slidesCount + 1 : count = count;
      else
        (count == slidesCount) ? count = - 1 : count = count;

      $('#slider-hero .slider__item.active').fadeOut(sliderFadeSpeed, sliderEasing, function() {
        $(this).removeClass('active');
        (direction == 1) ? count++ : count--;
        $('#slider-hero .slider__item').eq(count).fadeIn(sliderFadeSpeed, sliderEasing);
        $('#slider-hero .slider__item').eq(count).addClass('active');
        $('#slider-hero .slider__menu li.active').removeClass('active');
        $('#slider-hero .slider__menu li').eq(count).addClass('active');
        $('#slider-hero').attr('data-count', count);
        $('#slider-hero .slider__dots li .slider__spinner.active').removeClass('active');
        $('#slider-hero .slider__dots li').eq(count).find('.slider__spinner').addClass('active');
      });

    });

    if (autoSlider) {
      setInterval(function() {
        $( "#slider-hero .slider__nav--next" ).trigger( "click" );
      }, sliderSpeed);
      $('#slider-hero .slider__item').each(function() {
        var li = document.createElement('li');
        var content = document.getElementById('slider__dots__content').childNodes[1].cloneNode(true);
        $(li).appendTo('ul.slider__dots').append(content);
      });
      $('#slider-hero .slider__dots li').eq(0).find('.slider__spinner').addClass('active');
    }
  })();

  ////////////////////////
  //  PLACEHOLDERS FIX  //
  ////////////////////////

  if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
  } else if ($.fn.placeholder.input) {
    $('textarea').placeholder();
  } else {
    $('input, textarea').placeholder();
  }

});

// /////////////////////////
// //  BROWSER DETECTION  //
// /////////////////////////

// var BrowserDetect =
// {
//     init: function ()
//     {
//         this.browser = this.searchString(this.dataBrowser) || "Other";
//         this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
//     },

//     searchString: function (data)
//     {
//         for (var i=0 ; i < data.length ; i++)
//         {
//             var dataString = data[i].string;
//             this.versionSearchString = data[i].subString;

//             if (dataString.indexOf(data[i].subString) != -1)
//             {
//                 return data[i].identity;
//             }
//         }
//     },

//     searchVersion: function (dataString)
//     {
//         var index = dataString.indexOf(this.versionSearchString);
//         if (index == -1) return;
//         return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
//     },

//     dataBrowser:
//     [
//         { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
//         { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
//         { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
//         { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
//         { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
//     ]

// };

// BrowserDetect.init();
