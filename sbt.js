//console.log('sbt.js');


//jQuery(function($){
    /* jQuery isolated and on dom ready. */


$(document).ready(function() {

    // quick search regex
    var qsRegex;

    // init Isotope
    var $grid = $('.card-deck').isotope({
        itemSelector: '.card',
        layoutMode: 'fitRows',
        filter: function() {
            return qsRegex ? $(this).find('.recent-articles-title').text().match( qsRegex ) : true;
        },
        getSortData: {
            title: '.recent-articles-title' // text from querySelector
        }
    });

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout( timeout );
            var args = arguments;
            var _this = this;
            function delayed() {
                fn.apply( _this, args );
            }
            timeout = setTimeout( delayed, threshold );
        };
    }

    // layout Isotope after each image loads
       /* $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        }); */

    // filter items on button click
    $('.filters-button-group').on( 'click', '.button', function(e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $(".filters-button-group a").removeClass("active");
        $(this).addClass("active");
    });

    // sort items on button click
    $('.sort-button-group').on( 'click', '.button', function() {
        var sortValue = $(this).attr('data-sort-value');
        // make an array of values
        sortValue = sortValue.split(',');
        $grid.isotope({ sortBy: sortValue });
        $(".sort-button-group a").removeClass("active");
        $(this).addClass("active");
    });


    /* Change card images into background images */
    var $cardImg = $('.recent-articles-image-container img');
    $('.card-deck .card').each(function() {
        var $img = $(this).find('.recent-articles-image-container img');
        var imgSrc = $img.attr('src');
        $img.remove();
        $(this).find('.card-body .recent-articles-image-container').css('background-image', " url('" + imgSrc + "') ");
    });



});

