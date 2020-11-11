(function($) {
    "use strict";

	var $article = $('body.articles .article-container');
	var $articleBody = $article.find('.article-body');

	/* Set body to half width and move images to right col. */
	var $imgCol = $('<div class="img-grid col-lg-6">');
	$articleBody.removeClass('w-100 mt-5 d-inline-block').addClass('col-lg-6');
	$articleBody.after($imgCol);
	$articleBody.find('img').each(function(){
		$(this).appendTo($imgCol).wrap('<div class="port-item popup-gallery">');
	});
	$article.find('.col-lg-6').wrapAll('<div class="row">');

	/* Wrap first sentence */
	var $firstP = $article.find('.article-body p:first');
	var parts = $firstP.html().split('.');
	var firstSentence = '<span class="first-sentence">' + parts.shift() + '.</span>';
	$firstP.html(firstSentence + parts.join('.'));

	/* Set up Isotope Layout for Images */
	var $grid = $('.img-grid');
	$grid.imagesLoaded(function(){
		$grid.isotope();
	});


})(jQuery);