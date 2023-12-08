import { apiKey } from "./environment.js";
import { fiveDayApi } from "./app.js";

localStorage.getItem('favorites')


let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


import { CurrentWeatherApi } from './app.js';

export async function updateFavoritesPage() {
    const favoritesList = document.getElementById('favoritesList');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    if (!favoritesList || !noFavoritesMessage) {
        console.error('Favorites list or no favorites message elements not found.');
        return;
    }

    favoritesList.innerHTML = '';

    if (favorites.length > 0) {
        let row = document.createElement('div');
        row.className = 'row';

        for (let i = 0; i < favorites.length; i++) {
            const city = favorites[i];

            const card = createCityCard(city);

            row.appendChild(card);

            if ((i + 1) % 3 === 0 || i === favorites.length - 1) {
                favoritesList.appendChild(row);
                row = document.createElement('div');
                row.className = 'row';
            }
        }

        noFavoritesMessage.style.display = 'none';
    } else {
        noFavoritesMessage.style.display = 'block';
    }
}

function createCityCard(city) {
    const card = document.createElement('div');
    card.className = 'col';

    const cardBody = document.createElement('div');
    cardBody.className = 'card h-100';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = city;

    const temperature = document.createElement('p');
    temperature.className = 'card-text card-text3';
    temperature.id = 'currentTemperature';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'btn btn-sm btn-danger removeBtn';
    removeButton.onclick = function () {
        removeFromFavorites(city);
        updateFavoritesPage();
    };

    updateWeatherForCity(city, temperature);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(temperature);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex justify-content-center mt-2';
    buttonContainer.appendChild(removeButton);
    cardBody.appendChild(buttonContainer);

    card.appendChild(cardBody);

    return card;
}

async function updateWeatherForCity(city, temperatureElement) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();

        const currentTemperature = data.main.temp;
        temperatureElement.textContent = `${currentTemperature} °F`;
    } catch (error) {
        console.error(`Error fetching current weather data for ${city}:`, error);
    }
}


export function addToFavorites(city) {
    console.log('addToFavorites called with city:', city);

    favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesPage();
}

export function removeFromFavorites(city) {
    console.log('removeFromFavorites called with city:', city);

    favorites = favorites.filter((fav) => fav !== city);

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesPage();
}
