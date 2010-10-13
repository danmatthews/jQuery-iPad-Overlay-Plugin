$(document).ready(function() {

	$('#trigger_overlay').click(function() {
	
		$('body').ipadoverlay({
		
			title:'Contact Me',
			width: '250px',
			loaded: function() { $('#ipad_textarea').focus(); },
			rightButton: true,
			rightButtonLabel: 'Save',
			rightButtonFunction: function() {
				
				$('.you_typed_header').show();
				$('#you_typed').html($('#ipad_textarea').val());
			
			},
			content: '<textarea rows="10" cols="10" id="ipad_textarea"></textarea>'
			
		
		});
		
		return false;
	
	});

});