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



	$("#h3_usr_4").on("click", function () {
		var html_form = '<p>«Страшный сон» ягодника – это забракованная партия и реэкспорт назад, в Украину. 100% случаев – из-за несоответствия спецификации. Если там указано, что должно быть 95% целой ягоды, значит только так и должно быть. Нужно контролировать температурный режим, качество, делать анализы урожая ягод. Поставка должна произойти в заранее оговоренные строки – не раньше, и не позже.</p>';
		$("#div_certif_4").html(html_form);
	})
	$("#h3_usr_5").on("click", function () {
		var html_form = '<p><strong>НАССР </strong> или Система качества управления безопасностью пищевых продуктов,  Эта система обнаруживает опасные факторы и контролирует с момента посадки и до самой полки магазинов.</p> <p>Проведением работ по разработке ХАСП и документированию системы НАССР  в общественном питании, обучению персонала предприятия, определению критических точек контроля и оценки рисков, внедрению системы управления безопасностью пищевых продуктов Согласно ЗУ «Об основных принципах и требованиях к безопасности и качеству пищевой продукции» производители пищевой продукции обязаны внедрить процедуры, основанные на принципах системы НАССР , сертификация НАССР  не является обязательной.</p> <p>Принципы НАССР  – неотъемлемая часть международного стандарта ISO 22000, поэтому сертификат ХАССП является свидетельством соответствия системы безопасности пищевых продуктов требованиям стандарта <em>ISO 22000</em>.</p>';
		$("#div_certif_5").html(html_form);
	})


});

