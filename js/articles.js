(function($) {
    "use strict";

	var $article = $('body.articles .article-container');

	/* Set body to half width and move images to right col. */
	var $imgCol = $('<div class="img-grid col-lg-6">');
	$article.find('.article-body').removeClass('w-100').addClass('col-lg-6').insertAfter($imgCol);
	$article.find('img').each(function(){
		$(this).appendTo($imgCol);
	});

	/* Wrap first sentence */
	var $firstP = $article.find('.article-body p:first');
	var parts = $firstP.html().split('.');
	var firstSentence = '<span class="first-sentence">' + parts.shift() + '.</span>';
	$firstP.html(firstSentence + parts.join('.'));


})(jQuery);