// We will use the Open Weather Map API.
// Documentation: https://openweathermap.org/forecast5

var apiKey = "11313c3687393e3de0575eed3e2d8890";

var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast";

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";

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
  cityHeadingElement.textContent = cityName;

  var tempElement = document.querySelector("#city .temp");
  var humidityElement = document.querySelector("#city .humidity");
  var windElement = document.querySelector("#city .wind");


  getCurrentWeatherPromise(cityName)
    .then(function (response) {
      // This method returns a Promise as well! So we will "chain" it by returning it 
      return response.json(); 
    }).then( data => {
      console.log(data);

      tempElement.textContent = data.main.temp + " °C";
      humidityElement.textContent = data.main.humidity + " %";
      windElement.textContent = data.wind.speed + " km/h";
    });
}

getWeatherForCity("Toronto");

