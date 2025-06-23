"use strict";

import WeatherApi from "./WeatherApi.js";
import WeatherDataModel from "./WeatherDataModel.js";

const api = new WeatherApi("5753fc09ba5847a595c155824242303");
const dataModel = new WeatherDataModel(await api.fetchWeather());
console.log(dataModel.getForecastArray());