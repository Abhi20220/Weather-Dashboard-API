var key = '64f2ee2a8261daa4d9f780f5b365f275';
var city = "Sydney"

//Grabs the current date and time
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

var cityHistory = [];
//Function saves city into history
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {
		return;
	};
	cityHistory.push(city);

	localStorage.setItem('city', JSON.stringify(cityHistory));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday();
});

//Creates buttons based on search history 
var contHistEl = $('.cityHistory');
function getHistory() {
	contHistEl.empty();

	for (let i = 0; i < cityHistory.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${cityHistory[i]}`)

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
	//Allows the buttons to start a search as well
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		fiveForecastEl.empty();
		getWeatherToday();
	});
};

//The weather for sydney is loaded for the example
function initLoad() {

	var cityHistoryStore = JSON.parse(localStorage.getItem('city'));

	if (cityHistoryStore !== null) {
		cityHistory = cityHistoryStore
	}
	getHistory();
	getWeatherToday();
};

initLoad();