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