jQuery(document).ready(function($) {
	$("#contact_feedback_order").submit(function(event) {		
		event.preventDefault();
		if ($("#ant_check_feedback_order").attr("checked") != 'checked') { return false; }
		if ($("#ant_submitted_feedback_order").length > 1) { return false;}


		var str = $(this).serialize();
		
		$.ajax({
			type: "POST",
			url: "/wp-content/themes/roadway/contact-feedback-order.php",
			data: str,
			success: function(msg) {
				$("#contact_feedback_order").trigger("reset");
				$('#submit_feedback_order').remove();	
				if(msg == 'OK') {
					result = '<div class="ok">Сообщение отправлено</div>';
					$("#fields").hide();
					dataLayer.push({'event': 'order'});
					
				}
				else {result = msg;}
				$('#note2').html(result);
			}
		});

		return false;
	});
		const telegram_hrefe = document.querySelectorAll('.telegram_icon');

		for (let hrefe of telegram_hrefe) {
			hrefe.closest('a').setAttribute("href", "https://t.me/cargosupp");
		}

	$(function($){
         $("input#phone_feedback_order").mask("+99(999) 999-9999");
    });
  

}); 	

