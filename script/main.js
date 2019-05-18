	function init_combobox(id, skip_city){
		var direction = document.getElementById("direction_de").checked;
		var combobox = document.getElementById(id);
		combobox.value = undefined;
		while(combobox.hasChildNodes()){
			combobox.removeChild(combobox.firstChild)
		}

		var first_element = undefined;
		var flag_skip = true;
		for(var index in city_list){
		city_name = city_list[index];
		if(!direction){
			city_name = city_list[city_list.length-index-1];
		}

		if(skip_city){
			if(flag_skip){
				flag_skip = !(skip_city == city_name);
				continue;
			}
		}

		var option = document.createElement('option');
		option.value = city_name;
		option["name"] = city_name;
		option.innerHTML =city_name;
		combobox.appendChild(option);

		if(!first_element){
			first_element = option;
		}
		}
		combobox.value = undefined;
		clear_amount();
}

function update_price(city_from, city_to){
	var direction = "ua";
	if (document.getElementById("direction_de").checked) {
		direction="de";
	}
	var amount = undefined;
	if( (city_from) && (city_to) ){
		try{
			amount = cost[direction][city_from][city_to];
		}catch(error){
		}
	}
	if(amount){
		document.getElementById("amount").innerHTML=amount+"&#8364;";
	}else{
		clear_amount();
	}
}

function clear_amount(){
	document.getElementById("amount").innerHTML="";
}

var direction_de_label = "Украина-Германия";
var direction_ua_label = "Германия-Украина";
var month =["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];

function show_next_trip(){
	next_trip = calculate_next_trip();
	document.getElementById("next_trip").innerHTML=
		next_trip[0].text+" <b>"+next_trip[0].date.getDate()+" "+month[next_trip[0].date.getMonth()] + "</b>, " +
		next_trip[1].text+" <b>"+next_trip[1].date.getDate()+" "+month[next_trip[1].date.getMonth()] + "</b>"
		;
}

function calculate_next_trip(){
	var current_date = new Date();
	if([0,1,2,3,4].indexOf(current_date.getDay())>=0){
		shift = 4 - current_date.getDay() + 1;
		return [
			{text:direction_de_label, date:new Date(current_date.getTime() + shift*24*60*60*1000)}, 
			{text:direction_ua_label, date:new Date(current_date.getTime() + (shift+2)*24*60*60*1000)}
			];
	}else{// [5,6]
		var shift = 6-current_date.getDay();
		return [
			{text:direction_ua_label, date:new Date(current_date.getTime() + (shift)*24*60*60*1000)}, 
			{text:direction_de_label, date:new Date(current_date.getTime() + (shift+5)*24*60*60*1000)}
			];
	}
}
function change_visibility(block_name){
	if(document.getElementById(block_name).style.display=="block"){
		document.getElementById(block_name).style.display="none";
	}else {
		document.getElementById(block_name).style.display="block";
	}
}
function init(){
	document.getElementById('block_price').style.display="none";
	document.getElementById('block_cargo').style.display="none";
	document.getElementById('block_contacts').style.display="none";
	document.getElementById('block_trip').style.display="none";
	show_next_trip();
}