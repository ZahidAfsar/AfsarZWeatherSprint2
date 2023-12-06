import {apiKey} from "./environment.js";
import { cityName } from "./environment.js";

async function ApiCall(city) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await promise.json();

    document.getElementById('cityName').innerText = city;


    console.log('------Current Weather------');
    const currentTemperature = data.main.temp;
    const maxTemperature = data.main.temp_max;
    const minTemperature = data.main.temp_min;

    console.log('Current Temperature:', currentTemperature);
    console.log('Max Temperature:', maxTemperature);
    console.log('Min Temperature:', minTemperature);

    document.getElementById('currentTemperature').textContent = `${currentTemperature} °F`;
    document.getElementById('maxTemperature').innerText = `H: ${maxTemperature}°F`;
    document.getElementById('minTemperature').innerText = `L: ${minTemperature}°F`;
}

window.onload = function () {
    ApiCall('Los Angeles')

}

async function ApiCall2(){

    const promise = await  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=-121.275604&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log('------5 day forecast------')

    let currentTemperatureMin = data.list[0].main.temp_min;
    let currentTemperatureMax = data.list[0].main.temp_max;
    console.log('Min tommorow', currentTemperatureMin);
    console.log('Max tommorrow', currentTemperatureMax);

    document.getElementById('currentTemperatureMax').innerText = `H: ${currentTemperatureMax}°F`;
    document.getElementById('currentTemperatureMin').innerText = `L: ${currentTemperatureMin}°F`;

    console.log('------5 day forecast------')

    let TemperatureMin = data.list[8].main.temp_min;
    let TemperatureMax = data.list[8].main.temp_max;
    console.log('Min next day', TemperatureMin);
    console.log('Max next day', TemperatureMax);

    document.getElementById('TemperatureMax').innerText = `H: ${TemperatureMax}°F`;
    document.getElementById('TemperatureMin').innerText = `L: ${TemperatureMin}°F`;

    console.log('------5 day forecast------')

    let TemperatureMin2 = data.list[16].main.temp_min;
    let TemperatureMax2 = data.list[16].main.temp_max;
    console.log('Min next day 2', TemperatureMin2);
    console.log('Max next day 2', TemperatureMax2);

    document.getElementById('TemperatureMax2').innerText = `H: ${TemperatureMax2}°F`;
    document.getElementById('TemperatureMin2').innerText = `L: ${TemperatureMin2}°F`;

    console.log('------5 day forecast------')

    let TemperatureMin3 = data.list[32].main.temp_min;
    let TemperatureMax3 = data.list[32].main.temp_max;
    console.log('Min next day 3', TemperatureMin3);
    console.log('Max next day 3', TemperatureMax3);

    document.getElementById('TemperatureMax3').innerText = `H: ${TemperatureMax3}°F`;
    document.getElementById('TemperatureMin3').innerText = `L: ${TemperatureMin3}°F`;

    console.log(data)

}

async function SearchCall(){
    const searchInput = document.getElementById('SearchBar').value;
    await ApiCall(searchInput);
}

async function timeDate(){

    const promise = await  fetch();

    const data = await promise.json();

    console.log(data)
}



ApiCall(cityName);
ApiCall2();
SearchCall();
timeDate();


let SearchBar = document.getElementById("SearchBar");
let SubmitBtn = document.getElementById("SubmitBtn");

SearchBar.addEventListener('click', function(e){
    console.log(SearchBar.value);
});


SubmitBtn.addEventListener('click', function(e){
    SearchCall();
});


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