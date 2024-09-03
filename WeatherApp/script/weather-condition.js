export class WeatherCondition {
    #location;
    #currentWeatherCondition;
    #forecastWeatherCondition;

    constructor (apiData) {
        const {location, current, forecast} = apiData;
        this.#extractLocation(location);
        this.#extractCurrentWeatherCondition(current);
        this.#extractForecastWeatherCondition(forecast);
    }

    #extractLocation (location) {
        const {name, region, country, localtime} = location;
        this.#location = {
            name,
            region,
            country,
            localtime
        };
    }

    #extractCurrentWeatherCondition (current) {
        const {last_updated, temp_c, feelslike_c, wind_kph, wind_dir, humidity} = current;
        const {text, icon} = current.condition;
        const {co, no2, o3, so2} = current.air_quality;
        const us_epa_index = current.air_quality['us-epa-index'];

        this.#currentWeatherCondition = {
            lastUpdatedAt: last_updated,
            tempC: temp_c,
            feelslikeC: feelslike_c,
            text: text,
            icon: icon,
            windKph: wind_kph,
            windDir: wind_dir,
            humidity: humidity,
            co: co,
            no2: no2,
            o3: o3,
            so2: so2,
            usEpaIndex: us_epa_index
        };
    }

    #extractForecastWeatherCondition (forecast) {
        const dailyForecastArr = [];
        const hourlyForecastArr = [];
        forecast.forecastday.forEach(dailyForecastData => {
            const dailyForecast = {
                date: dailyForecastData.date,
                temperature: dailyForecastData.day.avgtemp_c,
                text: dailyForecastData.day.condition.text,
                icon: dailyForecastData.day.condition.icon,
                humidity: dailyForecastData.day.avghumidity,
                maxWindKph: dailyForecastData.day.maxwind_kph
            };
            dailyForecastArr.push(dailyForecast);

            dailyForecastData.hour.forEach(hourlyForecastData => {
                const hourlyForecast = {
                    time: hourlyForecastData.time,
                    temperature: hourlyForecastData.temp_c,
                    text: hourlyForecastData.condition.text,
                    icon: hourlyForecastData.condition.icon,
                    windKph: hourlyForecastData.wind_kph,
                    windDirection: hourlyForecastData.wind_dir,
                    humidity: hourlyForecastData.humidity
                };
                hourlyForecastArr.push(hourlyForecast);
            });
        });

        this.#forecastWeatherCondition = {
            hourly: hourlyForecastArr,
            daily: dailyForecastArr
        };
    }

    getLocation () {
        return this.#location;
    }

    getCurrentWeatherCondition () {
        return this.#currentWeatherCondition;
    }

    getForecastWeatherCondition () {
        return this.#forecastWeatherCondition;
    }
}