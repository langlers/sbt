(function($) {
    "use strict";

	var $article = $('body.articles .article-container');

	/* only run this code on article pages excluding collections */
	if ($article.length && !$article.find('.sbt-collection-container').length ) {
		var $articleBody = $article.find('.article-body');

		/* Set body to half width and move images to right col. */
		var $imgCol = $('<div class="img-grid col-lg-6">').append('<div class="grid-sizer">');
		$articleBody.after($imgCol);
		$articleBody.removeClass('w-100 mt-5 d-inline-block').addClass('col-lg-6');
		$article.find('.col-lg-6').wrapAll('<div class="row">');

		/* iterate over images, then run isotope */
		var $images = $articleBody.find('img');
		var count = $images.length;
		$images.each(function(){
			var $this = $(this);
			var horiz = '';
			if ( ($this.width() > $this.height()) || $this.hasClass('grid-item--width2') ) {
				horiz = 'grid-item--width2 '; /* double width of horiz images */
			}
			var imgTitle = $this.parent().siblings('.item-title').text();
			$this.attr('title', imgTitle);
			$this.appendTo($imgCol).wrap('<div class="grid-item ' + horiz + '"><a class="popup-gallery" href="' + $this.attr('src') + '">');
			if (!--count) {
				/* Set up Isotope Layout for Images */
				var $grid = $('.img-grid').isotope({
					itemSelector: '.grid-item',
					layoutMode: 'fitRows',
					percentPosition: true,
					masonry: {
						columnWidth: '.grid-sizer'
					}
				});
				$grid.imagesLoaded().progress( function() {
					$grid.isotope('layout');
				});
			};
		});
		if ($images.length == 1) {
			$images.first().closest('.grid-item').addClass('full-width');
		}

		/* Wrap first sentence & Create Hero title area */
		$('.article-container > h1.article-main-title').replaceWith(function () {
			return "<h3 class='article-main-title'>" + $(this).html() + "</h3>";
		});
		var $title = $('.article-container > h3.article-main-title').prependTo($articleBody).wrap('<div class="hero-box">');
		var $firstP = $article.find('.article-body p:first');
		var parts = $firstP.html().split('.');
		var firstSentence = '<p class="first-sentence">' + parts.shift() + '.</p>';
		$firstP.html(firstSentence + parts.join('.'));
		$articleBody.find('.first-sentence').insertAfter($title);
		//$title.wrap('<div class="hero-box">').prependTo($articleBody);



		/* Create popup gallery from images */
		$('.popup-gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			titleSrc: 'alt'
			/*titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}*/
		});

	}

})(jQuery);