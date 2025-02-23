jQuery(document).ready(function($) {
	
		async function ip() {
		let res = await (await fetch ('https://ipapi.co/json/'));
		let data = await res.json();
		return data.city+' - '+ data.country_name+' переход с ('+ document.referrer +')';
	}
	
	async function t1() {
		//console.log(await ip());
		//return await ip();
		$('.inform').val(await ip());
	}
	t1();


	
	$('.open-form-new').on("click touchend", function(){
		 $(".hide11").show("slow");
		 $(".block_slow").hide();
		 //$('.inform').val(info);
		});
  	$('.closebtn').click(function(){
		 $(".hide11").hide();
		  $(".block_slow").show("fast");
		});

	async function ip() {
		let res = await (await fetch ('https://ipapi.co/json/'));
		let data = await res.json();
		return data.city+' - '+ data.country_name+' переход с ('+ document.referrer +')';
	}
	
	
		const form = document.getElementById('contact');
		const note = document.getElementById('note');

	$("#contact").submit(function(e) {
		e.preventDefault();
		
		if ($("#ant_check_aviacalc").attr("checked") != 'checked') { return false; }
		if ($("#ant_submitted_aviacalc").length > 1) { return false;}

		var str = $(this).serialize();
		let error = formValidate(form);


		if (error === 0) {
			form.classList.add('_sending');

		$.ajax({
			type: "POST",
			url: "/wp-content/themes/roadway/contact-euro.php",
			data: str,
			success: function(msg) {
				if(msg == 'OK') {
					result = '<div class="ok">Сообщение отправлено</div>';
					$(".hide11").hide();
				}
				else {result = msg;}
				$('#note').html(result);
				form.classList.remove('_sending');
				$("#contact").trigger("reset");
				dataLayer.push({'event': 'order'});
			},
			error: function(msg) {
				$(".hide11").hide();
			}
		});
		return false;

		} else {
			//note.html('<div class="err">  Заполните поле</div>');
			note.innerHTML = '<div class="err">&nbsp;&nbsp;  Заполните поле</div>';
		}
	});

		function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index =0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);


		if (input.classList.contains('_email')) {
			if (emailTest(input)) {
				formAddEror(input);
				error++;
			}
		} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			formAddEror(input);
			error++;
		} else {
			if (input.value === '') {
				formAddEror(input);
				error++;
				}
			}
		}
		return error;
	}

	function formAddEror(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
		note.innerHTML = '';
		//$('#note').html('');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	$(function($){
         $("input#phone").mask("+99(999) 999-9999");
    });
	
});