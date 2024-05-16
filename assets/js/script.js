
const searchFormEl = document.querySelector('#search-form');
const cityNameEl = document.getElementById("cityName")
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchInputVal = document.querySelector('#search-input').value;
        if(!searchInputVal) {
            console.error('Please enter a city name.');
            return;
        }
    const queryString = `./search-results.html?q=${searchInputVal}`;
    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
function displayWeather(fetchWeatherData) {
    console.log(fetchWeatherData)
    const cityName = fetchWeatherData.name;
    console.log(cityName)
    // const Date = new Date(fetchWeatherData.dt * 1000);
    // const iconCode = fetchWeatherData.weather[0].icon;
    const temperature = fetchWeatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
console.log(windSpeed)
   cityNameEl.textContent = cityName;
   console.log(cityNameEl)
    // document.getElementById("date").textContent = date.toDateString();
    // document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    // document.getElementById("temperature").textContent = temperature;
    // document.getElementById("humidity").textContent = humidity;
    // document.getElementById("wind-speed").textContent = windSpeed;
}
function weather () {
    let cityName = document.getElementById("search-input").value
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c3e368d857c35c5a4b82b3d376f7b5f0`;
    console.log(cityName)
    fetch(geoUrl)
.then(function(response){
    console.log(response)
    return response.json();
})
.then(function (data){
    console.log(data)
    fetchWeatherData(data[0].lat, data[0].lon)
})
//make another API call, 1. grab lat and lon data out of response from first API call, 2. feed it into the second API call in the same way we did the first call
}
document.getElementById("searchBtn").addEventListener("click", function(event){
event.preventDefault()

weather()
})






// function displayForecat(forecastData) {
//     forecastData.forEach(function(dayData){

// })
// }




function fetchWeatherData (lat,lon) {
   
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3e368d857c35c5a4b82b3d376f7b5f0`;
    
    fetch(weatherUrl)
.then(function(response){
   if (!response.ok) {
    throw new Error('Bad network response');
   }

   console.log(response)
   return response.json();
})
.then(function (data){
    displayWeather(data.city);
    // displayForecast(data.list.slice[1,6]);
    console.log(data)
})
.catch(function(error){

})
}
//create autocomplete form

//access html and dynamically create html elements

// icon code https://openweathermap.org/img/wn/10n@2x.png