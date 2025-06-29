import WeatherApp from "./WeatherApp.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new WeatherApp("5753fc09ba5847a595c155824242303");
  app.init("Rostov-on-don").catch(error => {
    console.error(error);
  });
})