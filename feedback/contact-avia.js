jQuery(document).ready(function($) {
	
	
	$('.open-form-new').on("click touchend", function(){
		 $(".hide11").show("slow");
		 $(".block_slow").hide();
		});
  	$('.closebtn').click(function(){
		 $(".hide11").hide();
		  $(".block_slow").show("fast");
		});


		const form = document.getElementById('contact');
		const note = document.getElementById('note');
	//===============
	
	// текущий язык сайта 
	function currentLang() {
		const currentUrl = window.location.href;
		return currentUrl.includes('/ua/'); //если укр. то true
	}
	// языковые переменные формы
	function langFormVars() {
		const langVars = {};

		if (!currentLang()) {
			langVars.fillField = 'Заполните поле';
			langVars.messageSent = 'Сообщение отправленно';
		} else {
			langVars.fillField = 'Заповніть поле';
			langVars.messageSent = 'Повідомлення надіслано';
		}
		return langVars;
	}
	

	//=================	

	$("#contact").submit(function(e) {
		e.preventDefault();
		const langVars = langFormVars();
		
		if ($("#ant_check_aviacalc").attr("checked") != 'checked') { return false; }
		if ($("#ant_submitted_aviacalc").length > 1) { return false;}

		var str = $(this).serialize();
		let error = formValidate(form);


		if (error === 0) {
			form.classList.add('_sending');

		$.ajax({
			type: "POST",
			url: "/wp-content/themes/roadway/contact-avia.php",
			data: str,
			success: function(msg) {
				if(msg == 'OK') {
					result = `<div class="ok">${langVars.messageSent}</div>`;
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
			note.innerHTML = `<div class="err">&nbsp;&nbsp;  ${langVars.fillField}</div>`;
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