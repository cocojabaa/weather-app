export default class WeatherDataModel {
  constructor(apiResponseObject) {
    this.apiResponseObject = apiResponseObject;
  }

  getCurrentWeather() {
    const dateObj = new Date(this.apiResponseObject.forecast.forecastday[0].date)
    const fullDate = `${dateObj.getDate()} ${this.#getWeekDay(dateObj.getDay())} ${dateObj.getFullYear()}`;
    const shortWeekDayName = this.#getWeekDay(dateObj.getDay());
    const fullWeekDayName = this.#getWeekDay(dateObj.getDay(), true);
    const locationName = this.apiResponseObject.location.name;
    const temperature = `${this.apiResponseObject.current.temp_c} °C`;
    const weatherDescription = this.#getIconTitleFromWeatherCode(this.apiResponseObject.current.condition.code, true);
    const humidity = `${this.apiResponseObject.current.humidity} %`;
    const wind = `${this.apiResponseObject.current.wind_kph} km/h`;
    const precipitation = `${this.apiResponseObject.current.precip_mm} mm`;
    const iconTitle = this.#getIconTitleFromWeatherCode(this.apiResponseObject.current.condition.code);

    return {
      fullDate: fullDate,
      fullWeekDayName: fullWeekDayName,
      shortWeekDayName: shortWeekDayName,
      locationName: locationName,
      temperature: temperature,
      weatherDescription: weatherDescription,
      humidity: humidity,
      wind: wind,
      iconTitle: iconTitle,
      precipitation: precipitation,
    }
  }

  getForecastArray() {
    return this.apiResponseObject.forecast.forecastday.map((forecast, index) => {
      const dateObj = new Date(forecast.date);

      const shortWeekDayName = this.#getWeekDay(dateObj.getDay());
      const fullWeekDayName = this.#getWeekDay(dateObj.getDay(), true);
      const fullDate = `${dateObj.getDate()} ${shortWeekDayName} ${dateObj.getFullYear()}`;
      const iconTitle = this.#getIconTitleFromWeatherCode(forecast.day.condition.code);
      const weatherDescription = this.#getIconTitleFromWeatherCode(forecast.day.condition.code, true)
      const temperature = `${forecast.day.maxtemp_c} °C`;
      const wind = `${forecast.day.maxwind_kph} km/h`;
      const precipitation = `${forecast.day.totalprecip_mm} mm`
      const humidity = `${forecast.day.avghumidity} %`
      return {
        shortWeekDayName: shortWeekDayName,
        fullWeekDayName: fullWeekDayName,
        fullDate: fullDate,
        iconTitle: iconTitle,
        weatherDescription: weatherDescription,
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
    if (weatherCode === 1000) return onRussian ? "Ясно" : "sunny";
    else if (weatherCode === 1003) return onRussian ? "Переменная облачность" : "partly cloudy";
    else if (weatherCode in [1006, 1009, 1030, 1135, 1147]) return onRussian ? "Облачно" : "cloudy";
    else return onRussian ? "С осадками" : "rainy";
  }

}