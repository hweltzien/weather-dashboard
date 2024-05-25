
const searchFormEl = document.querySelector('#search-form');
const cityNameEl = document.getElementById("cityName")
const windSpeedEl = document.getElementById("wind-speed")
const humidityEl = document.getElementById("humidity")
const temperatureEl = document.getElementById("temp")
const iconCodeEl = document.getElementById("weather-icon")
const dateEl = document.getElementById("date")
const timeEl = document.getElementById("time")
const btn = document.getElementById("searchBtn")
const currentWeatherItemsEl = document.getElementById("currentWeatherItems")
const addCityEl = document.getElementById("addCity")
const currentTempEl = document.getElementById("temp")
const pastCitiesEl = document.getElementById("pastCities")
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weatherForecastEl = document.getElementById("weatherForecast")
const savedCities = JSON.parse(localStorage.getItem('cities')) || [];



const renderDaysOfTheWeek = () => {

    for (let i = 0; i<5; i++) {
        const currentDayDiv = document.getElementById(`day-${i}`)
        const a = dayjs()
        const b = a.add(i, 'day')
        console.log(b)
        let day = String(b.$d).split(" ")
        day = day.slice(0, 3).join(", ")
        
        currentDayDiv.innerText = day
        
    }
}


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

   
    dateEl.innerHTML = days[day] + ', ' + months[month] + ' ' + date
    timeEl.innerHTML = new Date().toLocaleTimeString();
}, 1000);


function handleSearchFormSubmit(event) {
    event.preventDefault();
   
    const searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
        console.error('Please enter a city name.');
        return;
    }
    savedCities.push(searchInputVal)
    localStorage.setItem('cities', JSON.stringify(savedCities))
    renderSavedCities()
    
    
}
function renderSavedCities() {
    const historyData = localStorage.getItem('cities')
    const cities =  JSON.parse(historyData)
    pastCitiesEl.innerHTML= " ";
    console.log("savedCities", typeof cities)
    for (let i = 0; i < cities.length; i++) {
        //create button
        const pastCityBtn = document.createElement("button")
        
        //add text
        pastCityBtn.textContent = cities[i]
        
        //add event listener
        pastCityBtn.addEventListener('click', handleCityBtnSubmit);
        
        
        //append to div
        
        pastCitiesEl.appendChild(pastCityBtn)
    
        
    }
}





//attach the latitude and longitude to the text content of the search history button 
function handleCityBtnSubmit(event) {
    event.preventDefault();
    console.log(this.textContent)
    const savedCityBtn = this.textContent
    
   
    GetLatLon(savedCityBtn)
    
    
}

btn.addEventListener('click', handleSearchFormSubmit);

function displayWeather(fetchWeatherData) {

    console.log(fetchWeatherData)
    const cityName = fetchWeatherData.city.name;
    console.log(cityName)

    const currentWeather = fetchWeatherData.list[0]
    console.log(currentWeather)
    const iconCode = currentWeather.weather[0].icon;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    cityNameEl.textContent = cityName;
    windSpeedEl.textContent = windSpeed;
    humidityEl.textContent = humidity;
    temperatureEl.innerHTML = `${temperature} &#176; F`;
    
    iconCodeEl.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`);

    
    let row = document.querySelectorAll('.weatherForecastItem');
    for (let i = 0; i < row.length; i++) {
        row[i].innerHTML = 
       
        
       `<img src="https://openweathermap.org/img/wn/${fetchWeatherData.list[1].weather[0].icon}@2x.png" alt="weather icon" class="weather-icon"> 
        <p>Temperature</p>
        <p class="temp">${fetchWeatherData.list[i].main.temp}&#176; F</p> <p>Humidity</p>
        <p id="humidity">${fetchWeatherData.list[i].main.humidity}</p>
        <p>Wind Speed</p>
        <p id="wind-speed">${fetchWeatherData.list[i].wind.speed}</p>`;

    }
    renderDaysOfTheWeek()


}
function GetLatLon(cityName) {
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c3e368d857c35c5a4b82b3d376f7b5f0`;
    console.log(cityName)
    fetch(geoUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        fetchWeatherData(data[0].lat, data[0].lon)
    })
    
}
document.getElementById("searchBtn").addEventListener("click", function (event) {
    event.preventDefault()
    let cityName = document.getElementById("search-input").value
        
    
    
        GetLatLon(cityName)
})




function fetchWeatherData(lat, lon) {

    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=c3e368d857c35c5a4b82b3d376f7b5f0`;

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Bad network response');
            }

            console.log(response)
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
            console.log(data)

        })
        .catch(function (error) {

        })
}



renderDaysOfTheWeek()
renderSavedCities()

