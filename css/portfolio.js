(function($) {
    "use strict";

    //slider for home fullscreen slider
	$('.work-slider').slick({
        autoplay: true,
        dots: false,
        nextArrow: '<i class="fa fa-arrow-right"></i>',
        prevArrow: '<i class="fa fa-arrow-left"></i>',
        speed: 800,
        fade: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });
	
	$(window).on("load", function() { // makes sure the whole site is loaded


        //isotope setting(portfolio)
        var $container = $('.port-single-body');
        $container.imagesLoaded(function() {
            $container.isotope();
        });

    });
   
    // script popup image
    $('.popup-gallery').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

})(jQuery);