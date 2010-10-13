#iPad Style Overlays with CSS3 & jQuery

While working on a project with the superb guys at Hydrant i was looking for an overlay or modal window that could be used for presenting edit forms or just any general content in a nice way.

Then i noticed the overlay that the iPad uses for most 'compose' windows - it doesn't occupy the full width of the window, and sticks to the top, perfect for the web! so i set out on a mission to create a flexible plugin that could be used with either ajax or DOM content.

So here it is! in it's 0.1 release - a plugin for creating iPad style editing overlays that you can inject or load content into, totally customizable with CSS, and doesn't rely on any images.

##Triggering it.

Just call the .JS plugin file, and the .CSS stylesheet in the `<head>` section of your page:
	
	<script type="text/javascript" src="js/ipadoverlays.js"></script>
			
	<link href="css/ipadoverlays.css" type="text/css" rel="stylesheet" />
	
###Initialisation

Triggering the overlay is done by simply calling the $.ipadoverlay() function with whatever options you want to pass through.

Call it on the jQuery function like so:

	$.ipadoverlay({

	title:'Contact Me',
	loaded: function() { $('#ipad_textarea').focus(); },
	rightButton: true,
	rightButtonLabel: 'Save',
	rightButtonFunction: function() {
		
		$('.you_typed_header').show();
		$('#you_typed').html($('#ipad_textarea').val());
	
	},
	content: '<textarea rows="10" cols="10" id="ipad_textarea"></textarea>'
	

	});

###Options

+ **content (string):**
+ Any HTML content you want to insert into the overlay's content area. This will over-ride any AJAX URL you pass to the function.
+ **url (string):**
+ A URL to be loaded into the overlay's content area using a GET request.
+ **title (string):**
+ The title to be displayed at the top of the overlay.
+ **loaded (function):**
+ A function to be called once the content has been inserted or the URL has finished loading.
+ **rightButton (boolean):**
+ Place a button on the right-hand side of the overlay for use with custom functions, like saving etc.
+ **rightButtonLabel (string):**
+ The label to be applied to the right-hand button.
+ **rightButtonFunction (function):**
+ Custom code to be executed when the right-hand button is clicked.
+ **closeAfter (boolean):**
+ Specify if the overlay should close after the custom code has been executed.