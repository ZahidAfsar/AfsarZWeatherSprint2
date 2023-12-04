import {apiKey} from "./environment.js";


async function ApiCall(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    const currentTemperature = data.main.temp;
    const maxTemperature = data.main.temp_max;
    const minTemperature = data.main.temp_min;

    console.log('Current Temperature:', currentTemperature);
    console.log('Max Temperature:', maxTemperature);
    console.log('Min Temperature:', minTemperature);
}

async function ApiCall2(){

    const promise = await  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=-121.275604&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(data)
}



ApiCall();
ApiCall2();