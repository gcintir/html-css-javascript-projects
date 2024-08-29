import { getWeatherCondition } from "./weather-condition-api.js";

init();

function init() {
  document.querySelector(".js-search-button").addEventListener("click", () => {
    handleWeatherConditionQuery();
  });

  document.querySelector('.js-location-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleWeatherConditionQuery();
    }
  });
}

async function handleWeatherConditionQuery() {
  const location = getLocationInput();
  const weatherCondition = await getWeatherCondition(location);
  renderCurrentWeatherConditionView(
    weatherCondition.getLocation(),
    weatherCondition.getCurrentWeatherCondition()
  );
  displayWeatherConditionView();
}

function renderCurrentWeatherConditionView(location, currentWeatherCondition) {
  let currentWeatherConditionHTML = `
    <div>
                <span>Last updated at ${currentWeatherCondition.lastUpdatedAt}</span>
            </div>
            <div class="wc-temperature-container">
                <div>
                    <img class="wc-temperature-icon" src="icons/sunny.webp" alt="">
                </div>
                <div>
                    <p class="temperature-info">${currentWeatherCondition.tempC} &deg;C</p>
                    <p class="temperature-feel-info">Feels like ${currentWeatherCondition.feelslikeC} &deg;C</p>
                    <p class="wc-info">${currentWeatherCondition.text}</p>
                </div>
            </div>
            <div class="location-info">
                <p>${location.name}, ${location.region}, ${location.country}</p>
            </div>
            <div class="location-datetime-info">
                ${location.localtime}
            </div>
            <div class="wc-info-container">
                <div class="wc-humidity-container">
                    <div>
                        <img class="humidity-icon" src="icons/humidity.png" alt="">
                        <p>Humidity</p>
                    </div>
                    <div>
                        <p class="wc-humidity-info">${currentWeatherCondition.humidity}%</p>
                    </div>
                </div>
                <div class="wc-airq-container">
                    <div>
                        <img class="airq-icon" src="icons/air_quality.png" alt="">
                        <p>Air Quality</p>
                    </div>
                    <div>
                        <p class="airq-info">co: ${currentWeatherCondition.co}</p>
                        <p class="airq-info">no2: ${currentWeatherCondition.no2}</p>
                        <p class="airq-info">o3: ${currentWeatherCondition.o3}</p>
                        <p class="airq-info">so2: ${currentWeatherCondition.so2}</p>
                        <p class="airq-info">${currentWeatherCondition.usEpaIndex}</p>
                    </div>
                </div>
                <div class="wc-wind-container">
                    <div>
                        <img class="wind-icon" src="icons/wind_power.png" alt="">
                        <p>Wind Power</p>
                    </div>
                    <div>
                        <p class="wind-info">${currentWeatherCondition.windKph} km/h</p>
                        <p class="wind-info">${currentWeatherCondition.windDir}</p>
                    </div>
                </div>
            </div>
    `;
  document.querySelector(".js-wc-data-container").innerHTML =
    currentWeatherConditionHTML;
}

function getLocationInput() {
  const location = document.querySelector(".js-location-input").value;
  return location;
}

function displayWeatherConditionView() {
  if (
    document.querySelector(".js-wc-data-container").classList.contains("hidden")
  ) {
    document.querySelector(".js-wc-data-container").classList.remove("hidden");
  }

  if (
    document
      .querySelector(".js-wc-forecast-container")
      .classList.contains("hidden")
  ) {
    document
      .querySelector(".js-wc-forecast-container")
      .classList.remove("hidden");
  }
}
