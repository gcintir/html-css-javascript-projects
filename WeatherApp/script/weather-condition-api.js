import { WeatherCondition } from './weather-condition.js';
import { weatherForecastData } from '../data/weather-forecast-data.js';

const API_KEY = 'dummy-api-key';

const DATA_SOURCE_TYPE = 'API';

export async function getWeatherCondition (city) {
    let apiData;
    if (DATA_SOURCE_TYPE === 'FILE') {
        apiData = weatherForecastData;
    } else {
        apiData = await callWeatherCurrentApi(city);
    }
    const weatherCondition = new WeatherCondition(apiData);
    return weatherCondition;
}

async function callWeatherCurrentApi (city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function callWeatherForecastApi (city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=yes&alerts=yes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}