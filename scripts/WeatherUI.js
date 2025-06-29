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
      forecastContainerChildren[i].addEventListener('click', (e) => {
        handler(i);
      })
    }
  }

  // render(weatherModel) {
  //   this.currentFullWeekDayName.textContent = weatherModel.currentFullWeekDayName;
  //   this.currentFullDate.textContent = weatherModel.currentFullDate;
  //   this.currentLocation.textContent = weatherModel.currentLocationName;
  //   this.currentTemperature.textContent = weatherModel.currentTemperature;
  //   this.currentWeatherDescription.textContent = weatherModel.currentWeatherDescription;
  //   this.currentPrecipitation.textContent = weatherModel.currentPrecipitation;
  //   this.currentHumidity.textContent = weatherModel.currentHumidity;
  //   this.currentWind.textContent = weatherModel.currentWind;
  //
  //   this.primaryCard.style.backgroundImage = `url("../../assets/images/${weatherModel.currentIconTitle}.jpg")`
  //
  //   const currentWeatherIcon = document.createElement("img");
  //   currentWeatherIcon.src = `./assets/icons/${weatherModel.currentIconTitle}.svg`;
  //   currentWeatherIcon.classList.add('weather-info__weather-svg');
  //   currentWeatherIcon.classList.add('svg-inject');
  //   this.currentWeatherInfoContainer.firstElementChild.remove();
  //   this.currentWeatherInfoContainer.prepend(currentWeatherIcon);
  //
  //   const forecastDays = weatherModel.getForecastArray();
  //   const forecastContainerChildren = this.forecastContainer.children;
  //   for (let i = 0; i < forecastContainerChildren.length; i++) {
  //     forecastContainerChildren[i].querySelector('.forecast-card__week-day').textContent = forecastDays[i].shortWeekDayName;
  //     forecastContainerChildren[i].querySelector('.forecast-card__temperature').textContent = forecastDays[i].temperature;
  //
  //     const iconObject = document.createElement("img");
  //     iconObject.classList.add('forecast-card__svg');
  //     iconObject.classList.add('svg-inject');
  //     iconObject.src = `./assets/icons/${forecastDays[i].iconTitle}.svg`;
  //     forecastContainerChildren[i].children[0].remove();
  //     forecastContainerChildren[i].prepend(iconObject);
  //   }
  //
  //   SVGInjector(document.querySelectorAll('.svg-inject'));
  // }

  render(weatherState) {
    this.currentFullWeekDayName.textContent = weatherState.currentWeather.fullWeekDayName;
    this.currentFullDate.textContent = weatherState.currentWeather.fullDate;
    this.currentLocation.textContent = weatherState.currentWeather.locationName;
    this.currentTemperature.textContent = weatherState.currentWeather.temperature;
    this.currentWeatherDescription.textContent = weatherState.currentWeather.weatherDescription;
    this.currentPrecipitation.textContent = weatherState.currentWeather.precipitation;
    this.currentHumidity.textContent = weatherState.currentWeather.humidity;
    this.currentWind.textContent = weatherState.currentWeather.wind;

    this.primaryCard.style.backgroundImage = `url("../../assets/images/${weatherState.currentWeather.iconTitle}.jpg")`;

    const currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.src = `./assets/icons/${weatherState.currentWeather.iconTitle}.svg`;
    currentWeatherIcon.classList.add('weather-info__weather-svg');
    currentWeatherIcon.classList.add('svg-inject');
    this.currentWeatherInfoContainer.firstElementChild.remove();
    this.currentWeatherInfoContainer.prepend(currentWeatherIcon);

    const forecastDays = weatherState.forecastDays;
    const forecastContainerChildren = this.forecastContainer.children;
    for (let i = 0; i < forecastContainerChildren.length; i++) {
      forecastContainerChildren[i].querySelector('.forecast-card__week-day').textContent = forecastDays[i].shortWeekDayName;
      forecastContainerChildren[i].querySelector('.forecast-card__temperature').textContent = forecastDays[i].temperature;

      const iconObject = document.createElement("img");
      iconObject.classList.add('forecast-card__svg');
      iconObject.classList.add('svg-inject');
      iconObject.src = `./assets/icons/${forecastDays[i].iconTitle}.svg`;
      forecastContainerChildren[i].children[0].remove();
      forecastContainerChildren[i].prepend(iconObject);
    }

    SVGInjector(document.querySelectorAll('.svg-inject'));
  }
}