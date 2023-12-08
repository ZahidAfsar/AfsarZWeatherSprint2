import { apiKey } from "./environment.js";
import { cityName } from "./environment.js";

async function CurrentWeatherApi(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();

        document.getElementById('cityName').innerText = city;

        console.log('------Current Weather------', data);

        const currentTemperature = data.main.temp;
        const maxTemperature = data.main.temp_max;
        const minTemperature = data.main.temp_min;

        console.log('Current Temperature:', currentTemperature);
        console.log('Max Temperature:', maxTemperature);
        console.log('Min Temperature:', minTemperature);

        document.getElementById('currentTemperature').textContent = `${currentTemperature} °F`;
        document.getElementById('maxTemperature').innerText = `H: ${maxTemperature}°F`;
        document.getElementById('minTemperature').innerText = `L: ${minTemperature}°F`;

        getLatLonForCity(city);
    } catch (error) {
        console.error('Error fetching current weather data:', error);
    }
}


async function fiveDayApi(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        const forecastData = await response.json();

        console.log('------5 day forecast------');
        console.log('Data:', forecastData);

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const currentDate = new Date();

        for (let i = 0; i < 5; i++) {
            const index = Math.floor((i * 8) + (currentDate.getHours() / 3));

            if (index < forecastData.list.length) {
                let TemperatureMin = forecastData.list[index].main.temp_min;
                let TemperatureMax = forecastData.list[index].main.temp_max;

                const dayElement = document.getElementById(`day${i}`);
                if (dayElement) {
                    dayElement.innerHTML = `${dayNames[(currentDate.getDay() + i) % 7]}<br>H: ${TemperatureMax}°F<br>L: ${TemperatureMin}°F`;
                }
            } else {
                console.error(`Invalid index ${index} for the list array`);
            }
        }

        console.log('------5 day forecast------');
        console.log(forecastData);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

window.onload = function () {
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    const SearchBar = document.getElementById("SearchBar");
    const SubmitBtn = document.getElementById("SubmitBtn");

    SearchBar.addEventListener('click', function (e) {
        console.log(SearchBar.value);
    });

    SubmitBtn.addEventListener('click', function (e) {
        SearchCall();
    });

    addToFavoritesBtn.addEventListener('click', function (e) {
        const searchInput = document.getElementById('cityName').innerText; 
        if (searchInput.trim() !== '') {
            addToFavorites(searchInput);
            alert('added to favorites');
            updateFavoritesPageNew(JSON.parse(localStorage.getItem('favorites')) || []);
        }
    });

    CurrentWeatherApi('Los Angeles');
    fiveDayApi(34.0522, -118.2437); 
    updateDateTime();
    setInterval(updateDateTime, 60000);
};

async function SearchCall() {
    const searchInput = document.getElementById('SearchBar').value;
    if (searchInput.trim() !== '') {
        await CurrentWeatherApi(searchInput);
        getLatLonForCity(searchInput);
    }
}

async function getLatLonForCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        if (latitude && longitude) {
            fiveDayApi(latitude, longitude);
        } else {
            console.error('Invalid latitude or longitude values:', data.coord);
        }
    } catch (error) {
        console.error('Error fetching latitude and longitude data:', error);
    }
}



function addToFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesPage(favorites);
        console.log(`Added ${city} to favorites.`);
    } else {
        console.log(`${city} is already in favorites.`);
    }
}

function updateFavoritesPage(favorites) {
    console.log('Updated favorites:', favorites);
}

function updateDateTime() {
    const currentDate = new Date();

    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const formattedDate = currentDate.toLocaleDateString([], options);

    document.getElementById('textTime').textContent = formattedTime;
    document.getElementById('dateTime').textContent = formattedDate;
}



// THIS CODE WOULDNT WORK IN JS BUT WORKS IN HTML FOR SOME REASON????
// JOHN HELPED ME AND SAID I COULD USE THE HTML ONE

// const darkModeCheckbox = document.getElementById('darkModeCheckbox');
// const lightModeCheckbox = document.getElementById('lightModeCheckBox');

// darkModeCheckbox.addEventListener('click', function (e) {
//     let isDarkMode = darkModeCheckbox.checked;
//     if (isDarkMode) {
//         console.log(isDarkMode);
//         window.location.href = '../pages/pageDark.html';
//     }
// });

// lightModeCheckbox.addEventListener('click', function (e) {
//     let isDarkMode = lightModeCheckbox.checked;
//     if (isDarkMode) {
//         console.log(isDarkMode);
//         window.location.href = '../index.html';
//     }
// });