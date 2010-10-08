(function($) {
  $.fn.ipadoverlay = function(options) {
    options = $.extend({
      url: null,
      content: null,
      title: null,
      loaded: function() {},
      rightButton: false,
      rightButtonLabel: null,
      rightButtonFunction: function() {},
      closeAfter: true
    }, options);

  $(this).each(function() {
    
    
    // Append a partially transparent div across the whole document.
    // Positioned ABSOLUTE in the stylesheet.
    $('body').append('<div id="screen_overlay"></div>');
    
    // Make the width & height the same as the document.
    $('#screen_overlay').css({
    
    	'width' : $(document).width(),
    	'height' : $(document).height()
    
    });
    
    
    // If there's a right hand button turned on in the options.
    if(options.rightButton == true) {
    	
    	// Assign the right button HTML to a var.
    	var rightButton = '<button id="ipadoverlay_function">'+options.rightButtonLabel+'</button>';
    	
    } else {
    	
    	// Blank the var so that nothing prints out.
    	var rightButton = '';
    
    }
    
    // This is the main HTML for the overlay, prints a container, a title bar div,
    // A h3 to be used as the title (options.title) and the buttons.
    $('#screen_overlay').prepend('<div class="ipadoverlay"><div class="ipad_overlay_titlebar"><button id="ipadoverlay_close">Close</button><h3 class="ipad_overlay_title">'+options.title+'</h3>'+rightButton+'</div><div class="ipadoverlay_content">'+options.content+'</div></div>');
    
    });
    
    
    // Figure out the distance to sit the overlay off-screen.
    var overlayHeight = $('.ipadoverlay').height();
    overlayHeight = 0 - overlayHeight;
    
    // Get the width, in order to center the overlay.
    overlayWidth = $('.ipadoverlay').width();
    windowWidth = $(window).width();
    
    halfWidth = Math.floor(overlayWidth/2);
    halfWindowWidth = Math.floor(windowWidth/2);
    
    overlayLeft = Math.floor(halfWindowWidth - halfWidth);
    
    // Center the overlay, and position it off screen vertically.
    $('.ipadoverlay').css({ 'top' : overlayHeight, 'left' : overlayLeft, 'opacity' : '0' }).animate({'top' : '0px', 'opacity' : '1'}, 150);
    
    // If the ESC key is pressed, close the overlay.
    $('body').keyup(function(e) {
	    if(e.which == 27) {
    		closeOverlay(); 
    	}
    });
    
    // Same, if the close button is clicked, close the overlay.
    $('#ipadoverlay_close').click(function() {
    
    	closeOverlay();
    
    });
    
	// A function to close the overlay (slide-fade it up out of view,
	// and remove the screen overlay.
    function closeOverlay() {
    	
    
	    	$('.ipadoverlay').animate({'top' : overlayHeight, 'opacity' : '0'}, 150, function() {
	    	
		    	$('#screen_overlay').fadeOut(150, function() {
		    		$('#screen_overlay').remove();
		    	});
	    	
	    	});
    	
    	
    	
    } // end closeOverlay()
    
    /*** AJAX AND CONTENT FUNCTIONS ***/
    
    // If an AJAX load URL is supplied, and there is no HTML content to insert,
    // load the URL.
    if( (options.url != null) && (options.content == null) ) {
    	
    	// Initiate an AJAX call.
    	$.ajax({
    	method: 'GET',
    	url: options.url, // URL from options.
    	beforeSend: function() {
    		
    		$('.ipadoverlay_content').html('<p class="loading">Loading...</p>');
    	
    	},
    	success: function(e) {
    		// Insert the returned HTML into the content Div.
    		$('.ipadoverlay_content').html(e);	
    		
    	},
    	complete: function() {
    		// Run the callback function specified in options.
    		options.loaded();
    	}
	    
	    });
    
    }
    // Else if HTML direct content is set.
    else if(options.content != null) {
    	
    	// Insert it into the container div.
    	$('.ipadoverlay_content').html(options.content);
    	
    	// Run the callback function specified in the options.
    	options.loaded();
    
    }
    
    /**
     * PRESENTATIONAL - Vertically centers the left and right buttons
     * This probably could have been done with CSS, but this way, if you have a 
     * long title that forces the height of the toolbar to be greater than one
     * line, the buttons automatically center
     */
     
    // Vertically center buttons.
    buttonHeight = $('#ipadoverlay_close').innerHeight();
    halfButtonHeight = Math.floor(buttonHeight/2);
    
    toolbarHeight = $('.ipad_overlay_titlebar').innerHeight();
    halfToolbarHeight = Math.floor(toolbarHeight/2);
    
    buttonTop = Math.floor(halfToolbarHeight - halfButtonHeight);
    
    $('#ipadoverlay_close').css({
    	'margin-top' : buttonTop
    });
    
    $('#ipadoverlay_function').css({
    	'margin-top' : buttonTop
    });
    
    $('#ipadoverlay_function').click(function() {
    	
    	// Run the functionality outlined in the options for the right button's
    	// functionality.
    	options.rightButtonFunction();
    	
    	// If the closeAfter option is set, close the overlay.
    	if(options.closeAfter == true) {
	    	closeOverlay();
    	}
    	return false; // returns the click false;    	
    
    });
    
    /*
     * PRESENTATIONAL
     * Adjusts alignments and sizes of overlay objects on window resize
     *
     */
     
    $(window).resize(function() {
    
    	var overlayHeight = $('.ipadoverlay').height();
    	overlayHeight = 0 - overlayHeight;
    	
    	overlayWidth = $('.ipadoverlay').width();
    	windowWidth = $(window).width();
    	
    	halfWidth = Math.floor(overlayWidth/2);
    	halfWindowWidth = Math.floor(windowWidth/2);
    	
    	overlayLeft = Math.floor(halfWindowWidth - halfWidth);
    	
    	$('.ipadoverlay').css({
    	
    		'left' : overlayLeft
    	
    	});
    	
    	$('#screen_overlay').css({
    	
    		'width' : $(document).width(),
    		'height' : $(document).height()
    	
    	});
    
    });
    
    
    
  }
})(jQuery);