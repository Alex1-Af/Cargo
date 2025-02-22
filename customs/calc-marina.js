"use strict";

const items = [

	{
		"id": 1,
		"container": "20GP",
		"agent": {
			"MSC": 2200,
			"MSK": 2100
		},
		"from": {
			"YTN": "Yantian",
			"NAN": "Nansha",
			"NB": "Ningbo",
			"SH": "Shanghai",
			"XMG": "Xiamen",
			"QIN": "Qingdao",
			"TW": "Tianjin"
		},
		"to": {
			"PL": "Gdansk",
			"PLGDY": "Gdynia",
			"DE": "Hamburg"
		}
	},
	{
		"id": 2,
		"container": "40HQ",
		"agent": {
			"MSC": 3600,
			"MSK": 3500
		},
		"from": {
			"YTN": "Yantian",
			"NAN": "Nansha",
			"NB": "Ningbo",
			"SH": "Shanghai",
			"XMG": "Xiamen",
			"QIN": "Qingdao",
			"TW": "Tianjin"
		},
		"to": {
			"PL": "Gdansk",
			"PLGDY": "Gdynia",
			"DE": "Hamburg"
		}
	},
	{
		"id": 3,
		"container": "20GP",
		"agent": {
			"OOCL": 2700,
			"Cosco": 2700
		},
		"from": {
			"YTN": "Yantian",
			"NB": "Ningbo",
			"SH": "Shanghai",
			"QIN": "Qingdao"
		},
		"to": {
			"PL": "Gdansk"
		}
	},
	{
		"id": 4,
		"container": "40HQ",
		"agent": {
			"OOCL": 4200,
			"Cosco": 4200
		},
		"from": {
			"YTN": "Yantian",
			"NB": "Ningbo",
			"SH": "Shanghai",
			"QIN": "Qingdao"
		},
		"to": {
			"PL": "Gdansk"
		}
	},
]

const transl = {
	"Guangzhou": "Гуанчжоу",
	"Huangpu": "Гуанчжоу(Huangpu)",
	"Qingdao": "Циндао",
	"Zhuhai": "Чжухай",
	"Dalian": "Далянь",
	"Xiamen": "Сямень",
	"Shanghai": "Шанхай",
	"Shenzhen": "Шеньчжень",
	"Yantian": "Шеньчжэнь(Yantian)",
	"Shekou": "Шеньчжэнь(Shekou)",
	"Ningbo": "Нінбо",
	"Tianjin": "Тяньцзінь",
	"Constanta": "Констанца (RO)",
	"Szczecin": "Щецін (PLSZZ)",
	"Gdansk": "Гданьск (PL)",
	"Gdynia": "Гдиня (PLGDY)",
	"Hamburg": "Гамбург (DE)",
	"Rotterdam": "Роттердам (NL)",
	"Antwerp": "Антверпен (BE)",
	"Nansha": "Наньша (NAN)",
	"Hongkong": "Гонконг (HKG)",
	"Felixstowe": "Філікстоу(GB)",
	"20GP": "20GP",
	"40HQ": "40HQ",
	"Cosco": "Cosco",
	"MSC": "MSC",
	"MSK": "MSK",
	"HPL": "HPL",
	"YML": "YML",
	"CMA": "CMA",
	"OOCL": "OOCL",
	"2M": "2M",
	"OA": "OA",
	"HMM": "HMM",
	"EMC": "EMC",
	"ONE nac": "ONE nac",
	"From": "Звідки",
	"To": "Куди",
	"Line": "Line",
	"Container": "Контейнер",
	"Price": "Ціна $"
}
//---------------формирование списка select----------------------------
function getName(items, field) {
	const name = [];
	items.forEach(item => {
		if (!item[field]) return;
		const keys = (field === 'container') ? [item[field]] : Object.keys(item[field]);
		name.push(...keys);
	});
	return Array.from(new Set(name));
}

function getValue(items, field, display) {
	const value = [];
	items.forEach(item => {
		if (!item[field]) return;
		const itemValue = item[field];

		for (let key in itemValue) {
			let text = createTextInput(itemValue[key], key, display);
			value.push(text);
		}
	});
	return Array.from(new Set(value));
}

function createTextInput(value, key, display) {
	if (display == 1) return value + ' (' + key + ')';
	return value;
}



const fromCity = getValue(items, 'from');
const toCountry = getValue(items, 'to');
const containerType = getName(items, 'container');
const agentType = getName(items, 'agent');


const createSortListElement = () => {
	const newElement = document.createElement('ul');
	newElement.className = "sort-main__list sort-list";
	return newElement;
};

const containerSelect = document.querySelector('.container-select');
const textInfo = document.querySelector('.info__text');

const inputCountryFrom = document.querySelector('.country-from');
const inputCountryTo = document.querySelector('.country-to');
const inputAgent = document.querySelector('.agent-type');
const inputContainer = document.querySelector('.container-type');

const newElementFrom = createSortListElement();
const newElementTo = createSortListElement();
const newElementAgent = createSortListElement();
const newElementContainer = createSortListElement();

function renderInput(items, elementTo, newElement) {
	const text = items.map(item => `<li data-value="${item}">${transl[item]}</li>`).join('');
	newElement.innerHTML = text;
	elementTo.after(newElement);
}


renderInput(fromCity, inputCountryFrom, newElementFrom);
renderInput(toCountry, inputCountryTo, newElementTo);
renderInput(agentType, inputAgent, newElementAgent);
renderInput(containerType, inputContainer, newElementContainer);
//console.log();


//==========mainCalc=======================
function renderNew(itemsFilter, elementFilter, categoryFilter, functionFilter) {
	if (itemsFilter.length === 0) {
		renderSelect(categoryFilter);
		itemsFilter = functionFilter(items, elementFilter, categoryFilter, functionFilter);
	}
	viewTable(itemsFilter);
}
function renderSelect(categoryFilter) {
	const selectActive = containerSelect.querySelector('[data-select="' + categoryFilter + '"]')
	const buttonsContainer = containerSelect.querySelectorAll('.sort-select')
	buttonsContainer.forEach(element => {
		//console.log(element.dataset.select);
		if (element.dataset.select != selectActive.dataset.select) {
			element.querySelector('.sort-button').innerHTML = element.dataset.default;
		}


	});
}

let itemsFilter = JSON.parse(JSON.stringify(items));
function mainCalc(element) {

	const categoryFilter = element.closest('[data-select]').dataset.select;
	const elementFilter = element.dataset.value;



	switch (categoryFilter) {
		case 'from':
			itemsFilter = filterByFrom(itemsFilter, elementFilter, categoryFilter);
			renderNew(itemsFilter, elementFilter, categoryFilter, filterByFrom);
			//if (itemsFilter.length === 0) {

			//itemsFilter = filterByFrom(items, elementFilter, categoryFilter);
			//}

			//viewTable(itemsFilter)
			break;
		case 'to':
			itemsFilter = filterByFrom(itemsFilter, elementFilter, categoryFilter);
			renderNew(itemsFilter, elementFilter, categoryFilter, filterByFrom);
			//if (itemsFilter.length === 0) itemsFilter = filterByFrom(items, elementFilter, categoryFilter);
			//viewTable(itemsFilter)
			break;
		case 'agent':
			itemsFilter = filterByAgent(itemsFilter, elementFilter, categoryFilter);
			renderNew(itemsFilter, elementFilter, categoryFilter, filterByAgent);
			//if (itemsFilter.length === 0) itemsFilter = filterByAgent(items, elementFilter, categoryFilter);
			//viewTable(itemsFilter)
			break;
		case 'container':
			itemsFilter = filterByContainer(itemsFilter, elementFilter, categoryFilter);
			//renderNew(itemsFilter, elementFilter, categoryFilter,filterByContainer);
			if (itemsFilter.length === 0) {
				renderSelect(categoryFilter);
				itemsFilter = filterByContainer(items, elementFilter, categoryFilter);
			}
			viewTable(itemsFilter)
			break;
		default:
			console.log('Нет элемента');
	}

}
//-------------------------------------------------
function filterByFrom(itemsFilter, element, field) {

	return itemsFilter.map(item => {
		if (item[field]) {
			const elementValue = Object.values(item[field]).find(value => value === element);
			if (elementValue) {
				const elementKey = Object.keys(item[field]).find(key => item[field][key] === element);
				return {
					...item,
					[field]: { [elementKey]: element }
				};
			}
		}
		return null;
	}).filter(item => item !== null);
}


function filterByAgent(itemsFilter, element, field) {
	return itemsFilter.map(item => {
		if (item[field] && typeof item[field] === 'object') {
			const keys = Object.keys(item[field]);
			if (keys.includes(element)) {
				const updatedField = {
					[field]: { [element]: item[field][element] }
				};
				return {
					...item,
					...updatedField
				};
			}
		}
		return null;
	}).filter(item => item !== null);
}

function filterByContainer(itemsFilter, containerType) {
	return itemsFilter.filter(item => item["container"] === containerType);
}

//=======view==table============================
function createText(element) {
	return element.map(el => transl[el]).join('<br>');
}

function createTableElement(item, isHeader = false) {
	const tableElement = document.createElement('div');
	tableElement.className = 'table-element';

	// Добавляем значения из объекта
	if (!isHeader) {
		const fromCell = document.createElement('div');
		fromCell.innerHTML = createText(Object.values(item.from));
		tableElement.appendChild(fromCell);

		tableElement.appendChild(fromCell);

		const toCell = document.createElement('div');
		toCell.innerHTML = createText(Object.values(item.to));
		tableElement.appendChild(toCell);

		const agentCell = document.createElement('div');

		agentCell.innerHTML = createText(Object.keys(item.agent));
		tableElement.appendChild(agentCell);

		const containerCell = document.createElement('div');
		containerCell.textContent = item.container;  //контейнер и цена без перевода
		tableElement.appendChild(containerCell);

		const priceCell = document.createElement('div');
		priceCell.innerHTML = Object.values(item.agent).join('<br>');
		tableElement.appendChild(priceCell);
	} else {
		// Добавляем заголовки
		const headers = [transl['From'], transl['To'], 'Line', transl['Container'], transl['Price']];
		headers.forEach(headerText => {
			const headerCell = document.createElement('div');
			headerCell.className = 'table-header';
			headerCell.textContent = headerText;
			tableElement.appendChild(headerCell);
		});
	}

	return tableElement;
}
const container = document.querySelector('.info__text');

// Создаем заголовок таблицы
const tableHeader = createTableElement({}, true);

container.appendChild(tableHeader);

function viewTable(element) {
	container.innerHTML = '';
	container.appendChild(tableHeader);

	element.forEach(item => {
		const tableElement = createTableElement(item);
		container.appendChild(tableElement);
	});
	//=
}
// Добавляем элементы таблицы
items.forEach(item => {
	const tableElement = createTableElement(item);
	container.appendChild(tableElement);
});
//==========select===================
openSelect()
function openSelect() {


	const blocksSelect = document.querySelectorAll('.sort-select');

	if (!blocksSelect) return;

	blocksSelect.forEach(function (dropDownWrapper) {

		const dropDownBtn = dropDownWrapper.querySelector('.sort-button');
		const dropDownList = dropDownWrapper.querySelector('.sort-list');
		const dropDownListItems = dropDownList.querySelectorAll('.sort-list > li');
		const dropDownInput = dropDownWrapper.querySelector('.input-hidden');

		const outputContact = document.querySelector('#contact'); // выбор куда вставить



		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function (e) {
			dropDownList.classList.toggle('list--visible');
			this.classList.add('button--active');

		});


		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function (listItem) {
			listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				dropDownBtn.innerText = this.innerText;
				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('list--visible');
				dropDownBtn.classList.remove('button--active');
				//==============================================
				mainCalc(this);

				renderOutput(this.innerText)
				function renderOutput(text) {
					outputContact.querySelectorAll('option').forEach(element => {
						if (text == element.value) {
							element.closest('select').querySelectorAll('option').forEach(item => {
								if (item.attributes.selected) item.removeAttribute('selected');
							});
							element.setAttribute('selected', 'selected');
						}
					});
				}
				//===============================================
			});
		});


		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('button--active');
				dropDownList.classList.remove('list--visible');
			}
		});


		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('button--active');
				dropDownList.classList.remove('list--visible');
			}
		});
	});

}


//=========end select=================