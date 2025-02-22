jQuery(document).ready(function ($) {

	function scriptAddUsr(j) {
		var flag_h3_usr = new Boolean(true);
		$("#h3_usr_" + j + "").on("click", function () {
			if (flag_h3_usr) {
				flag_h3_usr = false; swich1_h3_usr.call(this);
			} else { flag_h3_usr = true; swich2_h3_usr.call(this); }
			return false;
		});
		function swich1_h3_usr() {
			var $h3_usr = $h3_usr || $("#h3_usr_" + j + "");
			$h3_usr.addClass('h3_ce_press').removeClass('h3_amz');
			$h3_usr.find(".icon_plus").addClass('icon_plus_ce_press').removeClass('icon_plus_ce');
			$h3_usr.next(".div_certif").css('display', 'block');

		};
		function swich2_h3_usr() {
			var $h3_usr = $h3_usr || $("#h3_usr_" + j + "");
			$h3_usr.addClass('h3_ce').removeClass('h3_ce_press');
			$h3_usr.find(".icon_plus").addClass('icon_plus_ce').removeClass('icon_plus_ce_press');
			$h3_usr.next(".div_certif").hide(200);
		};
	}

	for (let i = 1; i < 50; i++) {
		var $add = $add || scriptAddUsr(i);
		$add += scriptAddUsr(i);
	}



	$("#h3_usr_5").on("click", function () {
		var html_form = '<p>Ввоз домашних животных и птиц на территорию США возможен только при наличии ветеринарного сертификата международного образца с указанием дат прививок (включая бешенство) и печатью ветеринарного контроля на выезде из страны происхождения.</p><p>Рекомендуется снабжать животное крепким ошейником и идентификационными метками (жетонами) с указанием адреса постоянного проживания владельца и номерами телефонов.</p><p>Все домашние животные, ввозимые на территорию Гавайских островов, должны, кроме всего прочего, пройти длительный (до 120 дней в зависимости от страны происхождения) карантин и обязательно иметь имплантированный микрочип, оформленный в State of Hawaii Department of Agriculture.</p>';
		$("#div_certif_5").html(html_form);
	})


});


