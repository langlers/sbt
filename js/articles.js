(function($) {
    "use strict";

	var $article = $('body.articles .article-container');
	var $articleBody = $article.find('.article-body');

	/* Set body to half width and move images to right col. */
	var $imgCol = $('<div class="img-grid col-lg-6">');
	$articleBody.after($imgCol);
	$articleBody.removeClass('w-100 mt-5 d-inline-block').addClass('col-lg-6');
	$article.find('.col-lg-6').wrapAll('<div class="row">');

	/* iterate over images, then run isotope */
	var $images = $articleBody.find('img');
	var count = $images.length;
	$images.each(function(){
		$(this).appendTo($imgCol).wrap('<div class="grid-item"><a class="popup-gallery" href="' + $(this).attr('src') + '">');
		if (!--count) {
			/* Set up Isotope Layout for Images */
			var $grid = $('.img-grid').isotope({
				itemSelector: '.grid-item',
				layoutMode: 'masonry',
				percentPosition: true,
				masonry: {
					columnWidth: '.grid-item'
				}
			});
			$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});
		};
	});

	/* Wrap first sentence & Create Hero title area */
	var $title = $('.article-container .article-main-title').replaceWith(function () {
		return "<h3 class='article-main-title'>" + $(this).html() + "</h3>";
	});;
	var $firstP = $article.find('.article-body p:first');
	var parts = $firstP.html().split('.');
	var firstSentence = '<p class="first-sentence">' + parts.shift() + '.</p>';
	$firstP.html(firstSentence + parts.join('.')).after($title);
	$('.article-container .article-main-title, .article-body .first-sentence').wrapAll('<div class="hero-box">');



	/* Create popup gallery from images */
	$('.popup-gallery').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});



})(jQuery);