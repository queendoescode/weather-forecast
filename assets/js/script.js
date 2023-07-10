// We will use the Open Weather Map API.
// Documentation: https://openweathermap.org/forecast5

var apiKey = "11313c3687393e3de0575eed3e2d8890";

var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast";

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";

var searchBtn = document.querySelector("#search-button");
var searchError = document.querySelector("#search-error");
var inputEl = document.querySelector("#city-name");
var cityButtons = document.querySelectorAll(".city-button");

function getFiveDayWeatherPromise(cityName) {
  return fetch(`${apiUrlFiveDay}?appid=${apiKey}&q=${cityName}&units=metric`, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  });
}

function getCurrentWeatherPromise(cityName) {
  return fetch(`${apiUrlCurrent}?appid=${apiKey}&q=${cityName}&units=metric`, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  });
}

function getWeatherForCity(cityName) {
  var cityHeadingElement = document.querySelector("#city h2");

  var tempElement = document.querySelector("#city .temp");
  var humidityElement = document.querySelector("#city .humidity");
  var windElement = document.querySelector("#city .wind");


  getCurrentWeatherPromise(cityName)
    .then(function (response) {
        if (response.ok) {
          return response.json().then( data => {
            cityHeadingElement.textContent = cityName;
            
            tempElement.textContent = data.main.temp + " °C";
            humidityElement.textContent = data.main.humidity + " %";
            windElement.textContent = data.wind.speed + " km/h";
            searchError.textContent = "";
            inputEl.value = "";
          })
        } else {
          searchError.textContent = `${cityName} was not found`;
        }
      });

    getFiveDayWeatherPromise(cityName)
      .then(response => response.json())
      .then(data => console.log(data));
}

function citySearch(event) {
  event.preventDefault();

  var cityName = inputEl.value;
  getWeatherForCity(cityName);
}

searchBtn.addEventListener("click", citySearch);

function cityButtonHandler(event) {
  event.preventDefault();
  getWeatherForCity(event.target.textContent);
}

cityButtons.forEach(element => {
  element.addEventListener("click", cityButtonHandler);
});

getWeatherForCity("Toronto");

