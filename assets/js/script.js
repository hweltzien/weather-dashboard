
const searchFormEl = document.querySelector('#search-form');

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

function weather () {
    let cityName = document.getElementById("search-input").value
    let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c3e368d857c35c5a4b82b3d376f7b5f0`;
    console.log(cityName)
    fetch(geoUrl)
.then(function(response){
    console.log(response)
    return response.json();
})
.then(function (data){
    console.log(data)
})
//make another API call, 1. grab lat and lon data out of response from first API call, 2. feed it into the second API call in the same way we did the first call
}
document.getElementById("searchBtn").addEventListener("click", function(event){
event.preventDefault()

weather()
})
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


//create autocomplete form