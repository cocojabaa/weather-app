export default class WeatherUI {
  constructor() {
    this.currentFullWeekDayName = document.querySelector('#current-full-week-day-name');
    this.currentFullDate = document.querySelector('#current-full-date');
    this.currentLocation = document.querySelector('#current-location');
    this.currentWeatherInfoContainer = document.querySelector('#weather-info');
    this.currentTemperature = document.querySelector('#current-temperature');
    this.currentWeatherDescription = document.querySelector('#current-weather-description');
    this.currentPrecipitation = document.querySelector('#current-precipitation');
    this.currentHumidity = document.querySelector('#current-humidity');
    this.currentWind = document.querySelector('#current-wind');

    this.forecastContainer = document.querySelector('#forecast-container');
    this.changeLocationButton = document.querySelector('#change-location-button');

    this.primaryCard = document.querySelector('#primary-card');

  }

  bindForecasts(handler) {
    const forecastContainerChildren = this.forecastContainer.children;
    for (let i = 0; i < forecastContainerChildren.length; i++) {
      forecastContainerChildren[i].addEventListener('click', () => {
        handler(i);
      })
    }
  }

  render(weatherState) {
    const forecastDays = weatherState.forecastDays;
    const indexOfSelectedDay = weatherState.indexOfSelectedDay;

    this.currentLocation.textContent = weatherState.currentWeather.locationName;
    if (weatherState.indexOfSelectedDay === 0) {
      this.currentFullWeekDayName.textContent = weatherState.currentWeather.fullWeekDayName;
      this.currentFullDate.textContent = weatherState.currentWeather.fullDate;
      this.currentTemperature.textContent = weatherState.currentWeather.temperature;
      this.currentWeatherDescription.textContent = weatherState.currentWeather.weatherDescription;
      this.currentPrecipitation.textContent = weatherState.currentWeather.precipitation;
      this.currentHumidity.textContent = weatherState.currentWeather.humidity;
      this.currentWind.textContent = weatherState.currentWeather.wind;

      this.primaryCard.style.backgroundImage = `url('/assets/images/${weatherState.currentWeather.iconTitle}.jpg')`;

      const currentWeatherIcon = document.createElement("img");
      currentWeatherIcon.src = `./assets/icons/${weatherState.currentWeather.iconTitle}.svg`;
      currentWeatherIcon.classList.add('weather-info__weather-svg');
      currentWeatherIcon.classList.add('svg-inject');
      this.currentWeatherInfoContainer.firstElementChild.remove();
      this.currentWeatherInfoContainer.prepend(currentWeatherIcon);
    }
    else {
      this.currentFullWeekDayName.textContent = forecastDays[indexOfSelectedDay].fullWeekDayName;
      this.currentFullDate.textContent = forecastDays[indexOfSelectedDay].fullDate;
      this.currentTemperature.textContent = forecastDays[indexOfSelectedDay].temperature;
      this.currentWeatherDescription.textContent = forecastDays[indexOfSelectedDay].weatherDescription;
      this.currentPrecipitation.textContent = forecastDays[indexOfSelectedDay].precipitation;
      this.currentHumidity.textContent = forecastDays[indexOfSelectedDay].humidity;
      this.currentWind.textContent = forecastDays[indexOfSelectedDay].wind;

      this.primaryCard.style.backgroundImage = `url('/assets/images/${forecastDays[indexOfSelectedDay].iconTitle}.jpg')`;

      const currentWeatherIcon = document.createElement("img");
      currentWeatherIcon.src = `./assets/icons/${forecastDays[indexOfSelectedDay].iconTitle}.svg`;
      currentWeatherIcon.classList.add('weather-info__weather-svg');
      currentWeatherIcon.classList.add('svg-inject');
      this.currentWeatherInfoContainer.firstElementChild.remove();
      this.currentWeatherInfoContainer.prepend(currentWeatherIcon);
    }

    const forecastContainerChildren = this.forecastContainer.children;
    for (let i = 0; i < forecastContainerChildren.length; i++) {
      const weekDayNameElement = forecastContainerChildren[i].querySelector('.forecast-card__week-day');
      const temperatureElement = forecastContainerChildren[i].querySelector('.forecast-card__temperature');
      forecastContainerChildren[i].classList.toggle('forecast-card--selected', false);
      if (i === indexOfSelectedDay) {
        forecastContainerChildren[i].classList.toggle('forecast-card--selected', true);
      }

      const iconObject = document.createElement("img");
      iconObject.classList.add('forecast-card__svg');
      iconObject.classList.add('svg-inject');
      if (i === 0) {
        weekDayNameElement.textContent = weatherState.currentWeather.shortWeekDayName;
        temperatureElement.textContent = weatherState.currentWeather.temperature;
        iconObject.src = `./assets/icons/${weatherState.currentWeather.iconTitle}.svg`;
      }
      else {
        weekDayNameElement.textContent = forecastDays[i].shortWeekDayName;
        temperatureElement.textContent = forecastDays[i].temperature;
        iconObject.src = `./assets/icons/${forecastDays[i].iconTitle}.svg`;
      }
      forecastContainerChildren[i].children[0].remove();
      forecastContainerChildren[i].prepend(iconObject);
    }

    SVGInjector(document.querySelectorAll('.svg-inject'));
  }
}