let weatherData = {}
let fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?'
let fetchQuery = ''
let fetchApiKey = '&appid=c9e15910f01662c7dc0ff0169b4f4e0d'
let requestUrl = ''

let inputValue = document.getElementById('input')
let submitButton = document.getElementById('submit') 
let celsiusSelect = document.getElementById('celsius')
let farenheitSelect = document.getElementById('farenheit')

let date = document.getElementById('dateTime')
let city = document.getElementById('city')
let temperature = document.getElementById('tempvalue')
let sky = document.getElementById('skycovervalue')
let windSpeed = document.getElementById('windspeedvalue')
let windDirection = document.getElementById('winddirectionvalue')

async function getWeather() {
  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      weatherData = response
    })
    .catch(err => {
      console.error(err);
    }

    )
}

function createQuery(param) {
  return fetchQuery = ('q=' + param.trim())
}

function createUrl() {
  return requestUrl = (fetchUrl + fetchQuery + fetchApiKey)
}



function getAndDisplayWeather() {

}