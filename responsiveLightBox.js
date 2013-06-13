//--------------------------------------------------------------- LIGHTBOX UTILS

var lightBox = {

  init: function () {
        lightBox.theBox();
    },

    calculate: function ($lightBoxImg, $styledContainer, originalWidth, originalHeight) { 

 		var $isImage = $('.LBContainer img');   	

        if ($styledContainer !== null && $styledContainer !== undefined && $styledContainer !== "" && $isImage.length) {
            
            var width = $lightBoxImg.width(),
	        	height = $lightBoxImg.height(),
	            LBWidth = parseInt(width, 10), 
	            LBHeight = parseInt(height, 10),
	            windowWidth = $(window).width(),
				windowHeight = $(window).height(),
				maxWidth = windowWidth * .7,
				maxHeight = windowHeight * .7;
				
			if(windowWidth < windowHeight && windowWidth <= originalWidth + 40) {   
				
				var ratio = maxWidth / originalWidth;

			 	$styledContainer.css({
			 		width: maxWidth,
			 		height: originalHeight * ratio
			 	});
			
			 	$lightBoxImg.css({
			 		width: '100%',
			 		height: originalHeight * ratio
			 	});
			 	
			 	setTimeout(function(){
			 		$styledContainer.css({
			 			marginLeft: (-$styledContainer.width() / 2) -40 + 'px',
			 			marginTop: (-$styledContainer.height() / 2) -40 + 'px',	
			 			visibility: 'visible',
						opacity: '100' 
					});
					$styledContainer.fadeIn();
			 	},100);		
			}
			
			else if (windowWidth > windowHeight && windowHeight < originalHeight + 40) {
				
				var ratio = maxHeight / originalHeight;

				$styledContainer.css({
					width: originalWidth * ratio,
					height: maxHeight + 'px'
				});
		
			 	$lightBoxImg.css({
			 		width: '100%',
			 		height: maxHeight + 'px'
			 	});
			 	
			 	setTimeout(function(){
			 		$styledContainer.css({
			 			marginLeft: (-$styledContainer.width() / 2) -40 + 'px',
			 			marginTop: (-$styledContainer.height() / 2) -40 + 'px',				 		
			 			visibility: 'visible',
		    			opacity: '100'
		    		});
		    		$styledContainer.fadeIn();
			 	},100);		
			}
			
			else {

		        $lightBoxImg.css({
		        	width: '100%',
					height: originalHeight
				});
		
				$styledContainer.css({
					width: originalWidth + 'px',
					height: originalHeight + 'px'
				});
				
				setTimeout(function(){
					$styledContainer.css({
			        	marginTop: (-$styledContainer.height() / 2) -40 + 'px',
			            marginLeft: (-$styledContainer.width() / 2) -40 + 'px',
			            visibility: 'visible',
						opacity: '100' 
			        });
					
		        	$styledContainer.fadeIn();
		    	},100);	
			}
  		} // end of outer if statement  
        
    },

    winResize: function ($lightBoxImg, $styledContainer, originalWidth, originalHeight) {
        $(window).on('resize', function () {
            lightBox.calculate($lightBoxImg, $styledContainer, originalWidth, originalHeight);
        });
    },
	
	theBox: function() {
		var $body = $('body'),
			$auctLink = $("a[rel='lightbox']"),
			$lbContainer =  $('<div/>').addClass('LBContainer'),
			$closeIcon = $('<i/>').addClass('sprite closeLightbox'),
			$overlay = $('<div/>').addClass('overlay'),
			$closeBtn = $('<a/>')
							.addClass('closeLightboxLink')
							.attr('href', '#');
							
			$('<span>close</span>').appendTo($closeBtn);
										
		closeHandler = function(e) {
            e.preventDefault();
            $closeBtn.trigger('closeLB');
            $lbContainer.css('visibility', 'hidden');
            $overlay.fadeOut();
            $('.LBContainer img').remove();
        };

        $overlay.on('click', closeHandler);
        $closeBtn.on('click', closeHandler);

		$auctLink.on('click', function(e) {
			e.preventDefault();
			
			var imgURL = $(this).attr("href"),
           		imgString = "<img class='communityAuctItem' alt='Auction Item' src='" + imgURL + "' />",
           		$largeImage = $(imgString);

			$overlay.appendTo($body);
			$lbContainer.appendTo($body);
			$closeIcon.appendTo($closeBtn);
			$closeBtn.appendTo($lbContainer);

			// if overlay and container are not already in DOM append them, otherwise show them
			if(!$lbContainer) {
				$body.append($lbContainer, $overlay);
			}
			
			else {
				$overlay.fadeIn();
			}
		
			$largeImage
				.appendTo($lbContainer)
				.load(function() {

		        	var originalWidth = this.width;
		        	var originalHeight = this.height;
		        	
		        	lightBox.calculate($largeImage, $lbContainer, originalWidth, originalHeight);
    				lightBox.winResize($largeImage, $lbContainer, originalWidth, originalHeight);
		        });
		    						
            $closeBtn.on('closeLB', function() {
                $closeBtn.off('closeLB');
            });

		});
	}
	
};	
