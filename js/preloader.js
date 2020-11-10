(function($) {
	"use strict";
	$(window).on("load", function() { // makes sure the whole site is loaded
		//preloader
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website. 
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
				$('.progress .progress-bar').css("width", function() {
					return $(this).attr("aria-valuenow") + "%";
				})
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
	});
})(jQuery);