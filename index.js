function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[current.getMonth()];

  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Today is ${day}, ${month} ${current.getDate()}, ${current.getFullYear()}, ${hours}:${minutes}
  `;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#example-city");
  let location = document.querySelector("#city");
  location.innerHTML = `${searchInput.value}`;

  searchWeather(searchInput.value);
}

function searchWeather(city) {
  let apiKey = "1b9675d56ed735268cf9edd8bf77521f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

//function convertCelsius(event) {
//event.preventDefault();
//let temperature = document.querySelector("#temperature");
//temperature.innerHTML = 11;}

//function convertFahrenheit(event) {
// event.preventDefault();
// let temperature = document.querySelector("#temperature");
// temperature.innerHTML = 52;}

function showWeather(response) {
  let currentCity = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  currentCity.innerHTML = `${response.data.name}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
}

function retrievePosition(position) {
  let apiKey = "1b9675d56ed735268cf9edd8bf77521f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", showWeather);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

let currentDate = document.querySelector("#current-date");
let current = new Date();
currentDate.innerHTML = formatDate(current);

//let celsiusConvertion = document.querySelector("#celsius-link");
//celsiusConvertion.addEventListener("click", convertCelsius);

//let fahrenheitConvertion = document.querySelector("#fahrenheit-link");
//fahrenheitConvertion.addEventListener("click", convertFahrenheit);
