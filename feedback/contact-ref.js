jQuery(document).ready(function($) {
	
	
  
	$("#contact").submit(function() {
		event.preventDefault();
		if ($("#ant_check_ref").attr("checked") != 'checked') { return false; }
		const ant_submitted_ref = $("#ant_submitted_ref").val();
		if (ant_submitted_adr.length > 1) { return false;}		
		var str = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "/wp-content/themes/roadway/contact-ref.php",
			data: str,
			success: function(msg) {
				if(msg == 'OK') {
					result = '<div class="ok">Ваше повідомлення успішно надіслано. Ми зв`яжемося з Вами найближчим часом.</div>';					
				}
				else {result = msg;}
				$('#note').html(result);
			}
		});
		return false;
	});

	$(function($){
         $("input#phone").mask("+99(999) 999-9999");
    });
	
});