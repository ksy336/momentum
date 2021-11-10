import {city, humidity, temperature, weatherDescription, weatherIcon, wind} from "./variables";

export async function getWeather(lng) {
    try {
        lng = ["en", "ru"];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lng[0]}&appid=f0fe5f73fec8281be587daed94f39480&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = `${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${Math.floor(data.wind.speed)}m/s`;
    }
    catch(e) {
        if(e) {
        }

    }
}
getWeather();

export async function getWeatherRus(lng) {
    try {
        lng = ["en", "ru"];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lng[1]}&appid=f0fe5f73fec8281be587daed94f39480&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = `${data.weather[0].description}`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
        wind.textContent = `Ветер: ${Math.floor(data.wind.speed)}m/s`;
    }
    catch(e) {
        if(e) {
        }

    }
}
getWeatherRus();

city.addEventListener("change", getWeather);