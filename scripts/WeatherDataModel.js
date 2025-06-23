export default class WeatherDataModel {
  constructor(apiResponseObject) {
    this.apiResponseObject = apiResponseObject;
  }

  get currentFullDate() {
    const dateObj = new Date(this.apiResponseObject.forecast.forecastday[0].date)
    return `${dateObj.getDate()} ${this.#getWeekDay(dateObj.getDay())} ${dateObj.getFullYear()}`;
  }
  get currentFullWeekDayName() {
    const dateObj = new Date(this.apiResponseObject.forecast.forecastday[0].date)
    return this.#getWeekDay(dateObj.getDay(), true);
  }
  get currentLocationName() {
    return this.apiResponseObject.location.name;
  }
  get currentTemperature() {
    return `${this.apiResponseObject.current.temp_c} °C`;
  }
  get currentWeatherDescription() {
    return this.#getIconTitleFromWeatherCode(this.apiResponseObject.current.condition.code, true);
  }
  get currentHumidity() {
    return `${this.apiResponseObject.current.humidity} %`;
  }
  get currentWind() {
    return `${this.apiResponseObject.current.wind_kph} km/h`
  }
  get currentPrecipitation() {
    return `${this.apiResponseObject.current.precip_mm} mm`
  }
  get currentIconTitle() {
    const code = this.apiResponseObject.current.condition.code;
    return this.#getIconTitleFromWeatherCode(code);
  }

  getForecastArray() {
    return this.apiResponseObject.forecast.forecastday.map((forecast, index) => {
      const dateObj = new Date(forecast.date);

      const shortWeekDayName = this.#getWeekDay(dateObj.getDay());
      const fullWeekDayName = this.#getWeekDay(dateObj.getDay(), true);
      const fullDate = `${dateObj.getDate()} ${shortWeekDayName} ${dateObj.getFullYear()}`;
      const iconTitle = this.#getIconTitleFromWeatherCode(forecast.day.condition.code);
      const temperature = `${forecast.day.maxtemp_c} °C`;
      const wind = `${forecast.day.maxwind_kph} km/h`;
      const precipitation = `${forecast.day.totalprecip_mm} mm`
      const humidity = `${forecast.day.avghumidity} %`
      return {
        shortWeekDayName: shortWeekDayName,
        fullWeekDayName: fullWeekDayName,
        fullDate: fullDate,
        iconTitle: iconTitle,
        temperature: temperature,
        wind: wind,
        precipitation: precipitation,
        humidity: humidity,
      }
    });

  }

  #getWeekDay(day, fullName = false) {
    if (fullName) {
      return [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ][day];
    }
    return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пн", "Сб"][day]
  }
  #getIconTitleFromWeatherCode(weatherCode, onRussian = false) {
    if (weatherCode === 1000) return onRussian ? "Солнечно" : "sunny";
    else if (weatherCode === 1003) return onRussian ? "Переменная облачность" : "partly cloudy";
    else if (weatherCode in [1006, 1009, 1030, 1135, 1147]) return onRussian ? "Облачно" : "cloudy";
    else return onRussian ? "С осадками" : "rainy";
  }

}