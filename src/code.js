const api = `https://jsonplaceholder.typicode.com/users`;

// Массив, в который будут загружены данные о пользователях
const stations = [];

// Поиск элементов на странице: поле ввода и список для отображения результатов
const inputSearch = document.querySelector(".search");
const optionsSearch = document.querySelector(".options");

// Запрос к API для получения данных о пользователях
fetch(api)
	.then(response => response.json()) // Преобразуем ответ в формат JSON
	.then(data => stations.push(...data)); // Добавляем все данные в массив stations

// Функция фильтрации пользователей по введённому слову
function getOptions(word, stations) {
	return stations.filter(s => {
		const regex = new RegExp(word, "gi"); // Регулярное выражение для поиска
		return s.name.match(regex); // Проверяем, совпадает ли имя пользователя с введённым словом match
	});
}

// Функция отображения подходящих вариантов на странице
function displayOptions() {
	const options = getOptions(this.value, stations); // Получаем подходящие результаты на основе введённого значения

	// Формируем HTML-код для отображения каждого пользователя в списке
	const render = options
		.map((el, id) => {
			const regex = new RegExp(this.value, "gi"); // Регулярное выражение для подсветки совпадений

			const stationName = el.name.replace(
				regex,
				`<span class="h1">${this.value}</span>`
			); // Подсвечиваем совпадение в имени

			// Формируем элемент списка для каждого подходящего пользователя
			return `
        <li key={${id}}>
            <span class="name">${stationName}</span>
            </br>
            <span>Phone: ${el.phone}</span>
        </li>
        `;
		})
		.join(""); // Объединяем все элементы в строку

	// Вставляем сформированный HTML-код в контейнер optionsSearch
	optionsSearch.innerHTML = render;
}

// Добавляем обработчики событий на изменения в поле ввода
inputSearch.addEventListener("change", displayOptions); // Срабатывает, когда изменяется значение в поле ввода

inputSearch.addEventListener("keyup", displayOptions); // Срабатывает при каждом нажатии клавиши в поле ввода