export class WeatherCondition {
    #location;
    #current;
    #forecast;

    constructor (apiData) {
        const {location, current, forecast} = apiData;
        this.#location = location;
        this.#current = current;
        this.#forecast = forecast;

    }

    getLocation () {
        return this.#location;
    }

    getCurrent () {
        return this.#current;
    }

    getForecast () {
        return this.#forecast;
    }
}