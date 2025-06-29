import WeatherApi from "./WeatherApi.js";
import WeatherDataModel from "./WeatherDataModel.js";
import WeatherUI from "./WeatherUI.js";

export default class WeatherApp {
  constructor(apiKey) {
    this.api = new WeatherApi(apiKey);
    this.ui = new WeatherUI();
    this.weatherState = {
      currentWeather: {}, // определяется в init
      forecastDays: [], // определяется в init
      selectDayIndex: 0,
    }; // TODO
  }

  forecastSelectHandler(index) {
    this.weatherState.selectDayIndex = index;

  }

  async init(locationName) {
    const apiResponse = await this.api.fetchWeather(locationName);
    const weatherModel = new WeatherDataModel(apiResponse);
    this.weatherState.currentWeather = weatherModel.getCurrentWeather();
    this.weatherState.forecastDays = weatherModel.getForecastArray();
    this.ui.bindForecasts(this.forecastSelectHandler.bind(this));
    this.ui.render(this.weatherState);
    console.log(this.weatherState);
  }
}