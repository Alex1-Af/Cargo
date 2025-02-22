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

	for (let i = 1; i < 5; i++) {
		var $add = $add || scriptAddUsr(i);
		$add += scriptAddUsr(i);
	}


	$("#h3_usr_3").on("click", function () {
		var html_form = '<ul><li><span="strong_ce">Deere & Company</span> — американская машиностроительная компания, выпускающая сельскохозяйственную, строительную и лесозаготовительную технику. </li><li><span="strong_ce"> John Deere (Deere & Company — NYSE: DE) </span> – мировой лидер по производству и обслуживанию сельскохозяйственного, лесозаготовительного, строительного оборудования, а также садово-парковой техники.</li><li><span="strong_ce"> Donaldson Company, Inc. </span> Дональдсон является мировым лидером в поставке фильтровальных систем и комплектующих.</li><li><span="strong_ce"> Johnson Controls, Inc. </span> — американская компания, крупный производитель оборудования HVAC, систем безопасности и автоматизации для зданий и сооружений, автокомплектующих. </li><li><span="strong_ce"> Caterpillar </span> — мировой лидер в области производства строительного и добывающего оборудования, дизельных и газовых двигателей, промышленных газовых турбин и дизельноэлектрических локомотивов.</li><li><span="strong_ce"> National Oilwell Varco (NOV) </span> — мировой лидер в разработке, производстве и продаже бурового оборудования и комплектующих для применения в сфере бурения скважин и производства нефти и газа,</li><li><span="strong_ce">Компания «Dixon»</span> является мировым лидером в производстве и поставке присоединительной арматуры и резинотехнических изделий для различных областей промышленности.</ul>В В ';
		$("#div_certif_3").html(html_form);
	})


});


