//fetch('https://v1.nocodeapi.com/asdfcoors17/ow/XdOlCfLWwFqrPMCv/byCityName?q=San%20Jose&unit=imperial').then(res => res.json())
//.then(data => console.log(data))
window.onload = newLoad();


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function newLoad()
{
	randomCity = 'london'
	fetch("https://v1.nocodeapi.com/asdfcoors17/ow/XdOlCfLWwFqrPMCv/byCityName?q="+randomCity+'%26units%3Dimperial').then(data =>{
		return data.json();
	}).then(displayCityData);
	
}
function setQuery(event)
{	//If they make a search, display the city's data
	if(event.keyCode == 13)
	{	
		getCityData(searchbox.value);
	}
}
//Makes a call to the API, and then calls displayCityData which will put
//the API info onto the page

function getCityData(value)
{
	var city = searchbox.value
	fetch("https://v1.nocodeapi.com/asdfcoors17/ow/XdOlCfLWwFqrPMCv/byCityName?q="+city+'%26units%3Dimperial').then(data =>{
		return data.json();
	}).then(displayCityData);

	
}

function displayCityData(data)
{	console.log(data);
	console.log(data.name);
	let theCity = document.querySelector('.location .city');
	theCity.innerText = data.name + ", " + data.sys.country;

	let now = new Date()
	let theDate = document.querySelector('.location .date');
	theDate.innerText = dateBuilder(now);

	let currentTemp = document.querySelector('.current .temp');
	currentTemp.innerText = data.main.temp;

	let maxTemp = document.querySelector('.current .high');
	maxTemp.innerText = data.main.temp_max;

	let lowTemp = document.querySelector('.current .low');
	lowTemp.innerText = data.main.temp_min;

	let mainWeather = data.weather[0].main;

	if(mainWeather == "Clear")
	{
		
		document.getElementById("vector-image").src = "sun.png";
		console.log("was Clear");
	}
	if(mainWeather == "Clouds")
	{
		document.getElementById("vector-image").src = "cloudVector.png";
	}
	if(mainWeather == "Smoke" || mainWeather == "Haze")
	{
		document.getElementById("vector-image").src = "smoke.png";
	}
	if(mainWeather == "Rain")
	{
		document.getElementById("vector-image").src = "rain.png";
	}
}

function dateBuilder(d)
{
	let months = ["January","February","March",
	"April","May","June","July","August","September","October","November","December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	//`` different from ''
	return `${day} ${month} ${date}, ${year}`;
}


