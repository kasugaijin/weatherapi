// DOM Elements
const fetchUrl = 'https://api.openweathermap.org/data/2.5/weather?'
let fetchQuery = ''
const fetchApiKey = '&appid=c9e15910f01662c7dc0ff0169b4f4e0d'
let dataUnits = ''
let requestUrl = ''

const inputValue = document.getElementById('input')
const submitButton = document.getElementById('submit') 
const metricSelect = document.getElementById('metric')
const imperialSelect = document.getElementById('imperial')

const errorOutput = document.getElementById('erroroutput')
const city = document.getElementById('city')
const temperature = document.getElementById('tempvalue')
const cloudCover = document.getElementById('cloudcovervalue')
const windSpeed = document.getElementById('windspeedvalue')
const windDirection = document.getElementById('winddirectionvalue')

// Event Listener
submitButton.addEventListener('click', getAndDisplayWeather)

// API Call
async function getWeather(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      addDataToDom(response);
    })
    .catch(err => {
      fetchError();
    }
    )
}
// Practice using async await
// async function getWeather(url) {
//   const response = await fetch(url)
//   const dataObject = await response.json()
//   addDataToDom(dataObject)
// }

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

function clearError() {
  return errorOutput.innerText = ''
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
  clearError()
}
