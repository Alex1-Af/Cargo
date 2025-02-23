


jQuery(document).ready(function($) {
	$(".calcultor_avia").keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // Ничего не делаем
                 return;
        }
        else {
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
$('#type_cargo').on('change', function() {
	CaseCargo();
});

$('#calculate_borisp').on('click', function() {

	var casecargo = CaseCargo();
	var $weight_borisp = $("#weight_borisp"),
		$large_storage = $("#large_storage"),
		$err_emty_weight = $("#err_emty_weight"),
		$err_large_storage = $("#err_large_storage"),
		weight = weight || 0,
		large_size = large_size || 0,
		err_storage = true,
		err_weight = false,
		Valid_cargo_Array = {}; 
	
		weight = parseFloat($weight_borisp.val());
		if(isNaN(weight)) {weight = 0; }
		if (weight == 0){ 
			$weight_borisp.css("border-color", "red");	
			$err_emty_weight.show({"display": "block"}, 100);			
			err_weight = false;
			} else { 
				$weight_borisp.css("border-color", "#e2e2e2");	
				$err_emty_weight.css("display", "none");
				err_weight = true;
				}
	
		if (casecargo == 2) {
			large_size = parseFloat($large_storage.val());
			if(isNaN(large_size)) {large_size = 0; }
			if (large_size == 0){ 		
				$large_storage.css("border-color", "red");
				$err_large_storage.show({"display": "block"}, 100);
				err_storage = false;	
			} else {
				$large_storage.css("border-color", "#e2e2e2");
				$err_large_storage.css("display", "none");
				err_storage = true;		
			}
		}
		
		err = err_weight && err_storage;
		if (err) { 			
			CalculCargo();

		} else {return false; }
});



function CaseCargo() {
	var $type_cargo = $type_cargo || $('#type_cargo option:selected').val(),
	    $normal = $("#normal"),
		$special = $("#special"),
		$valuable = $("#valuable"),
		$large = $("#large"),
		$dangerous = $("#dangerous"), 
		$img_normal = $("#img_normal"),
		$img_dangerous = $("#img_dangerous"),
		variant_cargo = variant_cargo || 1, 
		Type_cargo_Array = {};

	switch ($type_cargo) { 
		case "1":	
		  $normal.show({"display": "block"}, 100);  //обычный
		  $special.css("display", "none");
		  $valuable.css("display", "none");
		  $large.css("display", "none");
		  $dangerous.css("display", "none");
		  $img_normal.show({"display": "block"}, 100);
		  $img_dangerous.css("display", "none");
		  variant_cargo = 1;
		 break;
		  
		case "2":
		  $normal.show({"display": "block"}, 100);   //крупногабаритный
		  $special.css("display", "none");
		  $valuable.css("display", "none");
		  $large.show({"display": "block"}, 100);
		  $dangerous.css("display", "none");
		  $img_normal.show({"display": "block"}, 100);
		  $img_dangerous.css("display", "none");
		  variant_cargo = 2;
		 break;
		case "3":
		  $normal.css("display", "none");
		  $special.show({"display": "block"}, 100);  // радиоактивный
		  $valuable.css("display", "none");
		  $large.css("display", "none");
		  $dangerous.css("display", "none");
		  $img_dangerous.show({"display": "block"}, 100);
		  $img_normal.css("display", "none");
		  variant_cargo = 3;
		 break;
		case "4":
		  $normal.css("display", "none");
		  $special.show({"display": "block"}, 100);  //скоропортящийся
		  $valuable.css("display", "none");
		  $large.css("display", "none");
		  $dangerous.show({"display": "block"}, 100);
		  $img_dangerous.show({"display": "block"}, 100);
		  $img_normal.css("display", "none");
		  variant_cargo = 4;
		 break;
		case "5":
		  $normal.css("display", "none");
		  $special.show({"display": "block"}, 100);  //Ценный
		  $valuable.show({"display": "block"}, 100);
		  $large.css("display", "none");
		  $dangerous.css("display", "none");
		  $img_normal.show({"display": "block"}, 100);
		  $img_dangerous.css("display", "none");
		  variant_cargo = 5;
		 break;
		  	  
	}
	return variant_cargo;

}

function CalculCargo() {
	var casecargo = CaseCargo();
	var $weight_borisp = $("#weight_borisp"),
		$large_storage = $("#large_storage"),
		$quantity_days = $("#quantity_days"), 
		$use_refrigerator = $("input:radio[name=use_refrigerator]:checked"),
		awb_service = awb_service || 76.56,
		message_service = message_service || 7.68,
		storage	= storage || 0,
		storage_10 = storage_10 || 0,
		storage_30 = storage_30 || 0,
		days = days || 0,
		days_10 = days_10 || 0,
		days_30 = days_30 || 0,
		weight = weight || 0,
		large_size = large_size || 0,		
		k_less_50_10 = k_less_50_10 || 0,
		k_more_50_10 = k_more_50_10 || 0,
		k_less_50_10_30 = k_less_50_10_30 ||0,
		k_more_50_10_30 = k_more_50_10_30 || 0,
		k_less_50_30 = k_less_50_30 || 0,
		k_more_50_30 = k_more_50_30 || 0,
		valuable = valuable || 0,
		cargo_handling_k = cargo_handling_k || 0,
		loading = loading || 0,
		storage_html = '',
		Calcul_cargo_Array = {};
		
		weight = parseFloat($weight_borisp.val());
		large_size = parseFloat($large_storage.val());
		days = $quantity_days.val();
	
	
	if (casecargo == 2) {
			cargo_handling_k = cargo_handling_k || 0.24;
			cargo_handling = 0.24 * weight; //Терминальное обслуж.за кг груза Крупногабаритный			
		} else  { 
			cargo_handling_k = cargo_handling_k || 0.66;
			cargo_handling = 0.6 * weight; //Терминальное обслуж.за кг груза	
		}
		
		cargo_handling = cargo_handling_k * weight; //Терминальное обслуж.за кг груза
		
	if (casecargo == 1) {
		var k_less_50_10 = k_less_50_10 || 29.04,
			k_more_50_10 = k_more_50_10 || 0.6,
			k_less_50_10_30 = k_less_50_10_30 || 38.28,
			k_more_50_10_30 = k_more_50_10_30 || 0.78,
			k_less_50_30 = k_less_50_30 || 42.24,
			k_more_50_30 = k_more_50_30 || 0.96,
			Normal_Cargo_Array = {};
									//обычный
		CalculStorage();
	}
	if (casecargo == 3) {
		var k_less_50_10 = k_less_50_10 || 59.4,
			k_more_50_10 = k_more_50_10 || 1.2,
			k_less_50_10_30 = k_less_50_10_30 || 67.32,
			k_more_50_10_30 = k_more_50_10_30 || 1.32,
			k_less_50_30 = k_less_50_30 || 76.56,
			k_more_50_30 = k_more_50_30 || 1.56,
			Normal_Cargo_Array = {};
									//радиоактивный
		CalculStorage();
	}
	if (casecargo == 4 && $use_refrigerator.val() == 0) {
		var k_less_50_10 = k_less_50_10 || 46.2,
			k_more_50_10 = k_more_50_10 || 0.96,
			k_less_50_10_30 = k_less_50_10_30 || 55.44,
			k_more_50_10_30 = k_more_50_10_30 || 1.14,
			k_less_50_30 = k_less_50_30 || 63.36,
			k_more_50_30 = k_more_50_30 || 1.32,
			Normal_Cargo_Array = {};
									//скоропортящийся 
		CalculStorage();
	}
	if (casecargo == 4 && $use_refrigerator.val() == 1) {
		var k_less_50_10 = k_less_50_10 || 101.64,
			k_more_50_10 = k_more_50_10 || 1.98,
			Normal_Cargo_Array = {};
								//скоропортящийся Использовать холодильную камеру
			if (days != 0){
				if (weight <= 50 ) { 
					storage = k_less_50_10 * days;					
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза до 50кг холод.камера</td>'
						+ '<td>' + weight + '</td><td>' + days + '</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'					
					}
				else  { 
					storage = k_more_50_10 * weight * days;					
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза более 50кг холод.камера</td>'
						+ '<td>' + weight + '</td><td>' + days + '</td><td>' + k_more_50_10 + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
					}
				} else { 
					storage = 0;
					storage_html = '';
					}
	}
	if (casecargo == 4 && $use_refrigerator.val() == 2) {
		var k_less_50_10 = k_less_50_10 || 300,
			Normal_Cargo_Array = {};
								//скоропортящийся Использовать термоконтейнер
				if (days != 0){
				 
					storage = k_less_50_10 * days;					
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза в термоконтейнере</td>'
						+ '<td>' + weight + '</td><td>' + days + '</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
				} else { 
					storage = 0;
					storage_html = '';
					}
			
	}
	if (casecargo == 5) {
		var k_less_50_10 = k_less_50_10 || 1560,
			valuable = valuable || 6120,
			Normal_Cargo_Array = {};    //Ценный
			
			if (days != 0){
				 
					storage = k_less_50_10 * days;					
					storage_html = '<tr>'
						+   '<td>Сопровождение цен.груза</td>'
						+   '<td>1</td><td>0</td><td>' + valuable.toFixed(2) + '</td><td>' + valuable.toFixed(2) + '</td>'
						+'</tr>'					
					    + '<tr>'
						+   '<td>Хранение кг. ценного груза</td>'
						+   '<td>' + weight + '</td><td>' + days + '</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
				} else { 
					storage = 0;
					storage_html = '<tr>'
						+   '<td>Сопровождение цен.груза</td>'
						+   '<td>1</td><td>0</td><td>' + valuable.toFixed(2) + '</td><td>' + valuable.toFixed(2) + '</td>'
						+'</tr>'	
					}	
	
	}
	if (casecargo == 2) {
		var k_more_50_10 = k_more_50_10 || 42.24,
			Normal_Cargo_Array = {};	// крупногабаритный
				
				//if ($("#loading").is(':checked')){
				//	loading = 660;
				//	storage_html += '<tr>'
				//		+ '<td>Погрузка/разгрузка автотрака</td>'
				//		+ '<td>1</td><td>0</td><td>' + loading.toFixed(2) + '</td><td>' + loading.toFixed(2) + '</td>'
				//	    +'</tr>'
				
				//	} else { 
				//		loading = 0;					
				//	}
				if (days != 0){				
					storage = k_more_50_10 * large_size * days;					
					storage_html += '<tr>'
						+ '<td>Хранение м².крупногабар.груза</td>'
						+ '<td>' + large_size + '</td><td>' + days + '</td><td>' + k_more_50_10 + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
						
					} else { 
						storage = 0;
					}
	
	}
	if ($("#message").is(':checked')){		
		message_html = '<tr>'
					+   '<td>Сообщение (e-mail)</td>'
					+   '<td>1</td><td>0</td><td>' + message_service.toFixed(2) + '</td><td>' + message_service.toFixed(2) + '</td>'
					+ '</tr>';	
		} else {
			message_service = 0;
			message_html = '';	
			}
	
	
function CalculStorage() {
		if (days != 0){	
			if (days <= 10){
				if (weight <= 50 ) { 
					storage = k_less_50_10 * days;					
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза до 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>' + days + '</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'					
					}
				else  { 
					storage = k_more_50_10 * weight * days;					
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза более 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>' + days + '</td><td>' + k_more_50_10 + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
					}			
			}
		if (days > 10 && days <= 30) {
				if (weight <= 50 ) { 
					storage = k_less_50_10 * 10;
					days_10 = days - 10;
					storage_10 = k_less_50_10_30 * ( days - 10 );
					
					storage_html = '<tr>'					
						+ '<td>Хранение кг.груза до 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>10</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'						
						+'<tr>'
						+ '<td>Хранение кг.груза до 50кг от 11 до 30 дней</td>'
						+ '<td>' + weight + '</td><td>' + days_10 + '</td><td>' + k_less_50_10_30.toFixed(2) + '</td><td>' + storage_10.toFixed(2) + '</td>'
					    +'</tr>'					
					}
				else  { 
					storage = k_more_50_10 * weight * 10;
					days_10 = days - 10;
					storage_10 = k_more_50_10_30 * weight * days_10;										
						
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза более 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>10</td><td>' + k_more_50_10 + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
						+'<tr>'
						+ '<td>Хранение кг.груза более 50кг от 11 до 30 дней</td>'
						+ '<td>' + weight + '</td><td>' + days_10 + '</td><td>' + k_more_50_10_30 + '</td><td>' + storage_10.toFixed(2) + '</td>'
					    +'</tr>'					
					}
				}
		if (days > 30) {
				if (weight <= 50 ) { 
					storage = k_less_50_10 * 10;
					storage_10 = k_less_50_10_30 * 20;
					days_30 = days - 30;					
					storage_30 = k_less_50_30 * days_30;					
					storage_html = '<tr>'					
						+ '<td>Хранение кг.груза до 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>10</td><td>' + k_less_50_10.toFixed(2) + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
						+'<tr>'
						+ '<td>Хранение кг.груза до 50кг от 11 до 30 дней</td>'
						+ '<td>' + weight + '</td><td>20</td><td>' + k_less_50_10_30.toFixed(2) + '</td><td>' + storage_10.toFixed(2) + '</td>'
					    +'</tr>'						
						+'<tr>'
						+ '<td>Хранение кг.груза до 50кг от 30 дней</td>'
						+ '<td>' + weight + '</td><td>' + days_30 + '</td><td>' + k_less_50_30.toFixed(2) + '</td><td>' + storage_30.toFixed(2) + '</td>'
					    +'</tr>'					
					}
				else  { 
					storage = k_more_50_10 * weight * 10;
					storage_10 = k_more_50_10_30 * weight * 20;
					days_30 = days - 30;
					storage_30 = k_more_50_30 * weight * days_30;		
									
					storage_html = '<tr>'
						+ '<td>Хранение кг.груза более 50кг до 10 дней</td>'
						+ '<td>' + weight + '</td><td>10</td><td>' + k_more_50_10 + '</td><td>' + storage.toFixed(2) + '</td>'
					    +'</tr>'
						+'<tr>'
						+ '<td>Хранение кг.груза более 50кг от 11 до 30 дней</td>'
						+ '<td>' + weight + '</td><td>20</td><td>' + k_more_50_10_30 + '</td><td>' + storage_10.toFixed(2) + '</td>'
					    +'</tr>'	
						+'<tr>'
						+ '<td>Хранение кг.груза более 50кг от 30 дней</td>'
						+ '<td>' + weight + '</td><td>' + days_30 + '</td><td>' + k_more_50_30 + '</td><td>' + storage_30.toFixed(2) + '</td>'
					    +'</tr>'
					}
		
			}
		} else { 
			storage = 0;
			storage_html = '';
			}

}
	

	total_sum = cargo_handling + awb_service + message_service + storage + storage_10 + storage_30 + valuable + loading + message_service;
	
	var rez_html = '<table class="table_aero_tariff">'	   
	+ '<tr>'
	+	'<th><span>Услуги</span></td>'    
	+	'<th><span>К-во</span></th>'
	+	'<th><span>Дней</span></th>'
	+	'<th><span>Цена</span></th>'
	+	'<th><span>Сумма</span></th>'
	+ '</tr>' + storage_html
	+ '<tr>'
    +   '<td>Терминальное обслуж.за авианакладную</td>'
    +   '<td>1</td><td>0</td><td>' + awb_service.toFixed(2) + '</td><td>' + awb_service.toFixed(2) + '</td>'
    +'</tr>'
	+ '<tr>'
    +   '<td>Терминальное обслуж.за кг груза</td>'
    +   '<td>' + weight + '</td><td>0</td><td>' + cargo_handling_k.toFixed(2) + '</td><td>' + cargo_handling.toFixed(2) + '</td>'
    +'</tr>' + message_html
	+'<tr>'
    +   '<td colspan="4"><b>Всего, грн (сумма с НДС)</b></td>'
    +   '<td><b>' + total_sum.toFixed(2) + '</b></td>'
    +'</tr>'

	
	 $("#result_borisp").show({"display": "block"}, 100);
	 $("#total_rez").html(rez_html);
	
	
}


});