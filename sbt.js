//console.log('sbt.js');

//jQuery(function($){
    /* jQuery isolated and on dom ready. */


$(document).ready(function() {
    jQuery.migrateMute = true;

    // quick search regex
    var qsRegex;

    // init Isotope
    var $grid = $('.card-deck').isotope({
        itemSelector: '.card',
        layoutMode: 'fitRows',
        filter: function() {
            return qsRegex ? $(this).find('.card-title a.recent-articles-title').attr('title').match( qsRegex ) : true;
        },
        getSortData: {
            title: '.recent-articles-title' // text from querySelector
        },
        percentPosition: true,
        masonry: {
            // use element for option
            columnWidth: '.card'
        }
    });

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope({
            filter: function() {
                return qsRegex ? $(this).find('.card-title a.recent-articles-title').attr('title').match( qsRegex ) : true;
            }
        });
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
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

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
        var $cardTitle = $(this).find('.card-body h6.card-title');
        var title = $cardTitle.text();
        var $cardBody = $(this).find('.hide_images_in_container');
        $img.remove();
        $(this).addClass('col-md-4');
        $cardBody.prepend('<h3>' + title + '</h3>');
        $(this).find('.card-footer').appendTo($cardBody);
        $cardTitle.css('background-image', " url('" + imgSrc + "') ");
        $cardTitle.find('a').text('');
        $cardTitle.after('<div class="img-mask">');
        $grid.isotope('layout');
    });



});

