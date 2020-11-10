//console.log('sbt.js');


jQuery(function($){
    /* jQuery isolated and on dom ready. */

    // init Isotope
        var $grid = $('.card-deck').isotope({
            itemSelector: '.card',
            layoutMode: 'fitRows'
        });
    // layout Isotope after each image loads
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
});

