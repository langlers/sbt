(function($) {
    "use strict";


    $(window).on("load", function() { // makes sure the whole site is loaded
	
        //move to hash after loading
        if (window.location.hash) {
            var menuheigt = $(".for-sticky").height();
            $('html, body').stop().animate({
                scrollTop: $(window.location.hash).offset().top - menuheigt
            }, 300, 'linear');
        }


        //skill progress bar
        $('.progress .progress-bar').waypoint(function(direction) {
            $('.progress .progress-bar').each(function() {
                $('.progress .progress-bar').css("width",
                    function() {
                        return $(this).attr("aria-valuenow") + "%";
                    }
                )
            });
        }, {
            offset: 'bottom-in-view',
            triggerOnce: true
        });

        //isotope setting(portfolio)
        var $container = $('.portfolio-body');
        $container.imagesLoaded(function() {
            $container.isotope();
        });

        // Custom transform modifier for Stellar.js
        $.stellar.positionProperty.transform3d = {
            setPosition: function(element, newLeft, originalLeft, newTop, originalTop) {
                var distance = newTop - originalTop;
                element.css('transform', 'translate3d(0, ' + distance + 'px, 0');
            }
        };
        if (Modernizr.touch) {
            //add class on touch device
            $('body').addClass('no-para');
        } else {
            //stellar/parallax trigger
            $.stellar({
                positionProperty: 'transform3d',
                horizontalScrolling: false,
                hideDistantElements: false,
                responsive: true
            });
        }
    });


    //slider for home slider
    $('.home-slider').slick({
        autoplay: true,
        dots: false,
        arrows: false,
        speed: 800,
        fade: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });


    //slider for home with work slider
    $('.home-work-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: '<i class="fa fa-arrow-right"></i>',
        prevArrow: '<i class="fa fa-arrow-left"></i>',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //slider client slider
    $('.client-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });


    // script popup image
    $('.popup-img').magnificPopup({
        type: 'image'
    });


    //create menu for tablet/mobile
    $(".menu-box .navigation").clone(false).find("ul,li").removeAttr("id").remove(".sub-menu").appendTo($(".mobile-menu"));
    //remove empty href
    $(".mobile-menu a[href='#']").parent().remove();
    $(".mobile-menu .sub-menu").remove();
    //remove empty ul on mobile menu
    $('.mobile-menu ul').not(':has(li)').remove();
    $('.mobile-menu').on('show.bs.collapse', function() {
        $('body').on('click', function() {
            $('.mobile-menu').collapse('hide');
        })
    })

    //toggle menu
    $('.menu-btn').on('click', function() {
        $('.mobile-menu').collapse({
            toggle: false
        });
    })


    //menu for tablet/mobile,slider button, about button scrolling
    $('.mobile-menu a,.sl-btn,.ab-btn').on('click', function() {
        var $anchor = $(this);
        var menuheigt = $(".for-sticky").height();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - menuheigt
        }, 800, 'linear');
    });



    //sticky navigation
    $(".for-sticky").sticky({
        topSpacing: 0
    });

    // Video responsive
    $("body").fitVids();




    //script for navigation(superfish)
    $('.menu-box ul').superfish({
        delay: 400, //delay on mouseout
        animation: {
            opacity: 'show',
            height: 'show'
        }, // fade-in and slide-down animation
        animationOut: {
            opacity: 'hide',
            height: 'hide'
        },
        speed: 200, //  animation speed
        speedOut: 200,
        autoArrows: false // disable generation of arrow mark-up
    })




    // testimonial ticker 
    $('.big-ticker:has(>div:eq(1))').list_ticker({
        speed: 7000,
        effect: 'fade'
    });


    //personal (testimonial)
    $('.personal-ticker:has(>div:eq(1))').list_ticker({
        speed: 500,
        effect: 'fade'
    });

    // filter items when filter link is clicked
    var $container = $('.portfolio-body');
    $('.port-filter a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            itemSelector: '.port-item',
            filter: selector
        });
        return false;
    });

    //adding active state to portfolio filtr
    $(".port-filter a").on('click', function() {
        $(".port-filter a").removeClass("active");
        $(this).addClass("active");
        setTimeout("$.stellar('refresh');", 600); //refresh stellar alignment
    });



})(jQuery);