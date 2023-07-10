// We will use the Open Weather Map API.
// Documentation: https://openweathermap.org/forecast5

var apiKey = "11313c3687393e3de0575eed3e2d8890";

var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast";

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";

var myDateFormat = "ddd M/D/YYYY";

var storageKey = "city-search-history";

var searchBtn = document.querySelector("#search-button");
var searchError = document.querySelector("#search-error");
var inputEl = document.querySelector("#city-name");
var cityButtons = document.querySelectorAll(".city-button");
var formEl = document.querySelector("form");

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
          });
        } else {
          searchError.textContent = `${cityName} was not found`;
        }
      });

    getFiveDayWeatherPromise(cityName)
      .then(response => {
        if (response.ok) {
          return response.json().then( data => {
            // the forecast data is 40 items, which are eight readings per day (every 3 hours)
            // my plan is to take the first forecast then move 24 hours forward each day
            // until data for all five days has been put into the DOM.

            var today = dayjs().format(myDateFormat);

            // The forecast will have some entries for today.
            // Skip past them so that the first day will be tomorrow.

            var index;
            for (index = 0; index < 40; index++) {
              var date = dayjs(data.list[index].dt_txt);
              var forecastDate = date.format(myDateFormat);
              if (forecastDate != today) {
                break;
              }
            }

            console.log(index)

            for (var forecastIndex = index; forecastIndex < 40; forecastIndex++) {
              var day = Math.floor((forecastIndex - index) / 8);
              var dateHeading = document.querySelector(`#day-${day} h4`);
              var tempElement = document.querySelector(`#day-${day} .temp`);
              var humidityElement = document.querySelector(`#day-${day} .humidity`);
              var windElement = document.querySelector(`#day-${day} .wind`);

              var forecast = data.list[forecastIndex];
              tempElement.textContent = forecast.main.temp + " °C";
              humidityElement.textContent = forecast.main.humidity + " %";
              windElement.textContent = forecast.wind.speed + " km/h";

              var date = dayjs(forecast.dt_txt);
              dateHeading.textContent = date.format(myDateFormat);
            }
          });
        }
      });
}

function getMyStorage() {
  var citiesJson = localStorage.getItem(storageKey);
  if (citiesJson) {
    return JSON.parse(citiesJson);
  } else {
    return [];
  }
}

function makeCityButtonElement(cityName) {
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "city-button");
  buttonEl.textContent = cityName;
  return buttonEl;
}

function citySearch(event) {
  event.preventDefault();

  var cityName = inputEl.value;
  getWeatherForCity(cityName);

  // Add a button to the search history sidebar

  var buttonEl = makeCityButtonElement(cityName);
  formEl.appendChild(buttonEl);

  // Remember this searched city in local storage

  cities = getMyStorage();
  cities.push(cityName);

  var updatedJson = JSON.stringify(cities);
  localStorage.setItem(storageKey, updatedJson);
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

