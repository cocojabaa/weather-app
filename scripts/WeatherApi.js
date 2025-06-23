export default class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async fetchWeather(locationName) {
    const url = new URL("https://api.weatherapi.com/v1/forecast.json");
    const params = {
      key: this.apiKey,
      q: locationName,
      days: 3,
      aqi: "no",
      alerts: "no",
    };
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    })

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}