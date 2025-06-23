export default class WeatherUI {
  constructor() {
    this.currentFullWeekDayName = document.querySelector('#current-full-week-day-name');
    this.currentFullDate = document.querySelector('#current-full-date');
    this.currentLocation = document.querySelector('#current-location');
    this.currentWeatherSvg = document.querySelector('#current-weather-svg');
    this.currentTemperature = document.querySelector('#current-temperature');
    this.currentWeatherDescription = document.querySelector('#current-weather-description');
    this.currentPrecipitation = document.querySelector('#current-precipitation');
    this.currentHumidity = document.querySelector('#current-humidity');
    this.currentWind = document.querySelector('#current-wind');

    this.forecastContainer = document.querySelector('#forecast-container');
    this.changeLocationButton = document.querySelector('#change-location-button');

  }
  render(weatherModel) {
    this.currentFullWeekDayName.textContent = weatherModel.currentFullWeekDayName;
    this.currentFullDate.textContent = weatherModel.currentFullDate;
    this.currentLocation.textContent = weatherModel.currentLocationName;
    // TODO this.currentWeatherSvg
    this.currentTemperature.textContent = weatherModel.currentTemperature;
    this.currentWeatherDescription.textContent = weatherModel.currentWeatherDescription;
    this.currentPrecipitation.textContent = weatherModel.currentPrecipitation;
    this.currentHumidity.textContent = weatherModel.currentHumidity;
    this.currentWind.textContent = weatherModel.currentWind;
  }
}