import WeatherApi from "./WeatherApi.js";
import WeatherDataModel from "./WeatherDataModel.js";
import WeatherUI from "./WeatherUI.js";

export default class WeatherApp {
  constructor(apiKey) {
    this.api = new WeatherApi(apiKey);
    this.ui = new WeatherUI();
  }

  async init(locationName) {
    const apiResponse = await this.api.fetchWeather(locationName);
    const weatherModel = new WeatherDataModel(apiResponse);
    this.ui.render(weatherModel);
  }
}