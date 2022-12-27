// DOM Elements
let fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?'
let fetchQuery = ''
let fetchApiKey = '&appid=c9e15910f01662c7dc0ff0169b4f4e0d'
let dataUnits = ''
let requestUrl = ''

let inputValue = document.getElementById('input')
let submitButton = document.getElementById('submit') 
let metricSelect = document.getElementById('metric')
let imperialSelect = document.getElementById('imperial')

let errorOutput = document.getElementById('erroroutput')
let city = document.getElementById('city')
let temperature = document.getElementById('tempvalue')
let cloudCover = document.getElementById('cloudcovervalue')
let windSpeed = document.getElementById('windspeedvalue')
let windDirection = document.getElementById('winddirectionvalue')

// Event Listener
submitButton.addEventListener('click', getAndDisplayWeather)

// API Call
async function getWeather(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      addDataToDom(response);
    })
    .catch(err => {
      fetchError();
    }
    )
}

// API URL
function createQuery(param) {
  return fetchQuery = ('q=' + param.trim());
}

function createUrl(url, query, key, units) {
  return requestUrl = (url + query + key + units);
}

// DOM interaction
function selectTempUnit() {
  if (!metricSelect.checked && 
      !imperialSelect.checked) return dataUnits = '&units=metric'
  
  metricSelect.checked ? dataUnits = '&units=metric' : dataUnits = '&units=imperial'
  return dataUnits
}

function addDataToDom(response) {
  if (response.cod == '404' || response.cod == '400') return notFound();

  city.innerText = response.name
  temperature.innerText = response.main.temp;
  cloudCover.innerText = cloudCoverDescription(response.clouds.all)
  windSpeed.innerText = response.wind.speed
  windDirection.innerText = response.wind.deg
}

// Errors
function fetchError() {
  return errorOutput.innerText = 'Error. Please try again.'
}

function notFound() {
  return errorOutput.innerText = 'City not found.'
}

function blankParam() {
  return errorOutput.innerText = 'Enter a city.'
}

// Data manipulation
function cloudCoverDescription(percentage) {
  if (percentage < 10) {
    return 'Clear'
  } else if (percentage >10 && percentage <=50) {
    return 'Partly Cloudy'
  } else if (percentage >50 && percentage <=75) {
    return 'Mainly Cloudy'
  } else if (percentage >75) {
    return 'Overcast'
  }
}

// Controller
function getAndDisplayWeather() {
  if (inputValue.value == '') return blankParam()

  selectTempUnit()
  createQuery(inputValue.value);
  createUrl(fetchUrl, fetchQuery, fetchApiKey, dataUnits);
  getWeather(requestUrl);
}

// also write async await