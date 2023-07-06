// We will use the Open Weather Map API.
// Documentation: https://openweathermap.org/forecast5

var apiKey = "11313c3687393e3de0575eed3e2d8890";

var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}`;

function getWeatherPromise(lat, lon) {
  return fetch(`${apiUrl}&lat=${lat}&lon=${lon}`, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  });
}

getWeatherPromise("43.741667", "-79.373333")
  .then(function (data) {
    console.log(data);
  })