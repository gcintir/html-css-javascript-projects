
import { getWeatherCondition } from './weather-condition-api.js';

init();

function init () {
    document.querySelector('.search-button').addEventListener('click', () => {
        displayWeatherConditionResultDivision();
    });

}

function displayWeatherConditionResultDivision () {
    document.querySelector('.wc-data-container').classList.toggle('hidden');
    document.querySelector('.wc-forecast-container').classList.toggle('hidden');
}

async function displayWeatherCondition () {
    const city = document.querySelector('.city-input').value;
    const weatherCondition = await getWeatherCondition(city);
    //console.log(JSON.stringify(weatherCondition.getLocation()));
    renderWeatherCondition(weatherCondition);
}

function renderWeatherCondition (weatherCondition) {
    document.querySelector('.weather-condition-text').innerText = weatherCondition.getCurrent()['condition']['text'];
    document.querySelector('.weather-condition-image').src = weatherCondition.getCurrent()['condition']['icon'];
    document.querySelector('.weather-condition-temperature').innerText = weatherCondition.getCurrent()['temp_c'] + '°C';
}