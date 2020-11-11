(function($) {
    "use strict";

	var $article = $('body.articles .article-container');

	/* Wrap first sentence */
	var $firstP = $article.find('.article-body p:first');
	var parts = $firstP.html().split('.');
	var firstSentence = '<span class="first-sentence">' + parts.shift() + '</span>';
	$firstP.html(firstSentence + parts.join('.'));


})(jQuery);