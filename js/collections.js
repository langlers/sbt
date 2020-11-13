(function($) {
    "use strict";

	var $article = $('body.articles .article-container');
	var $collection = $article.find('.sbt-collection-container');

	/* only run on see - our culture - collection pages */
	if ( $collection.length ) {
		//var $articleBody = $article.find('.article-body');
		var $collectionSection = $collection.find('.collection-section-inner');

		$collectionSection.each(function(){
			var $this = $(this);
			/* Set each section to half width and move images to right col. */
			var $imgCol = $('<div class="img-grid col-lg-6">').append('<div class="grid-sizer">');
			$this.after($imgCol);
			$this.removeClass('w-100 mt-5 d-inline-block').addClass('col-lg-6');
			$this.add($this.next()).wrapAll('<div class="row">');

			/* iterate over images, then run isotope */
			var $images = $this.find('img, .video');
			var count = $images.length;
			$images.each(function(){
				var $this = $(this);
				var horiz = '';
				if ( ($this.width() > $this.height()) || $this.hasClass('grid-item--width2') ) {
					horiz = 'grid-item--width2 '; /* double width of horiz images */
				}
				var imgTitle = $this.parent().siblings('.item-title').text();
				$this.attr('title', imgTitle);
				$this.addClass('shadow'); /* add a drop shadow to images */
				if ($this.hasClass('video')) {
					$this.attr('id', 'videoPopup' + count);
					$this.appendTo($imgCol).wrap('<div class="grid-item ' + horiz + '"><a class="popup-gallery mfp-inline" href="#videoPopup' + count + '">');
				} else {
					$this.appendTo($imgCol).wrap('<div class="grid-item ' + horiz + '"><a class="popup-gallery mfp-image" href="' + $this.attr('src') + '">');
				}
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
			if ($images.length == 1) {
				$images.first().closest('.grid-item').addClass('full-width');
			}
		}); /* END .each()



		/* Wrap first sentence & Create Hero title area */
		var $articleBody = $article.find('.article-body');
		$('.article-container > h1.article-main-title').replaceWith(function () {
			return "<h3 class='article-main-title'>" + $(this).html() + "</h3>";
		});
		var $title = $('.article-container > h3.article-main-title').prependTo($articleBody).wrap('<div class="hero-box col-lg-6">');
		var $firstP = $article.find('.article-body p:first');
		var parts = $firstP.html().split('.');
		var firstSentence = '<p class="first-sentence">' + parts.shift() + '.</p>';
		$firstP.html(firstSentence + parts.join('.'));
		$articleBody.find('.first-sentence').insertAfter($title);
		//$title.wrap('<div class="hero-box">').prependTo($articleBody);



		/* Create popup gallery from images */
		$('.popup-gallery').magnificPopup({
			gallery: {
				enabled: true
			},
			image: {
				titleSrc: 'title'
			}
		});


		/* isotope filtering on see -> our culture -> collections */
		// init Isotope
		var $colGrid = $('.collection-grid').isotope({
			itemSelector: '.collection-section',
			layoutMode: 'vertical',
		});
		// layout Isotope after each image loads
		$colGrid.imagesLoaded().progress( function() {
			$colGrid.isotope('layout');
		});
		// layout Isotope after collapse
		$('.collapse').on('hidden.bs.collapse shown.bs.collapse', function () {
			$colGrid.isotope('layout');
		})
		$('.collection-filters-button-group').on( 'click', '.button', function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$colGrid.isotope({ filter: filterValue });
			$(".collection-filters-button-group a").removeClass("active");
			$(this).addClass("active");
		});
	}

})(jQuery);