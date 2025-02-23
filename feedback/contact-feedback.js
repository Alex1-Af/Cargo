jQuery(document).ready(function($) {
	
	$("#contact_feedback").submit(function(event) {
		event.preventDefault();
		var str = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "/wp-content/themes/roadway/contact-feedback.php",
			data: str,
			success: function(msg) {
				if(msg == 'OK') {
					result = '<div class="ok">Сообщение отправлено</div>';
					$("#fields").hide();
					
				}
				else {result = msg;}
				$('#note1').html(result);
				$("#contact_feedback").trigger("reset");
				$('#submit_feedback').remove();
				dataLayer.push({'event': 'order'});
				
			}

		});

		return false;
	});
	
	$(function($){
         $("input#phone_feedback").mask("+99(999) 999-9999");
    });

});