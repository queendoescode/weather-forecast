// We will use the Open Weather Map API.
// Documentation: https://openweathermap.org/forecast5

var apiKey = "11313c3687393e3de0575eed3e2d8890";

var apiUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast";

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";

function getFiveDayWeatherPromise(lat, lon) {
  return fetch(`${apiUrlFiveDay}?appid=${apiKey}&lat=${lat}&lon=${lon}`, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  });
}

function getCurrentWeatherPromise(lat, lon) {
  return fetch(`${apiUrlCurrent}?appid=${apiKey}&lat=${lat}&lon=${lon}`, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  });
}

getCurrentWeatherPromise("43.741667", "-79.373333")
  .then(function (response) {
    // This method returns a Promise as well! So we will "chain" it by returning it 
    return response.json(); 
  }).then( data => {
    console.log(data);
  });