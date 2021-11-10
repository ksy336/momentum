import "./playAudio";
import "./localStorage";
import "./weather";
import "./assets/myData.json";
import "./background";
import {
    author,
    body,
    changeQuote,
    city,
    greeting, humidity,
    myDate, quote,
    randomNum, slideNext, slidePrev, temperature,
    time,
    translateToEn,
    translateToRus, weatherDescription,
    weatherIcon, wind, name
} from "./variables";
import {getWeather, getWeatherRus} from "./weather";


export const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    return time.textContent = currentTime;
}
export function showDate() {
    const newDate = new Date();
    const options = {year: "numeric", month: "long", weekday: "long", day: "numeric"}
        const currentDate = newDate.toLocaleString("en-Us", options);
        return myDate.textContent = currentDate;
}
showDate();
export function showDateRus() {
    const newDate = new Date();
    const options = {year: "numeric", month: "long", weekday: "long", day: "numeric"}
    const currentDate = newDate.toLocaleDateString("ru-Ru", options);
    return myDate.textContent = currentDate;
}

export const greetingTranslation = {
    ru: ["Добрый вечер, ", "Доброй ночи, ", "Доброе утро, ", "Доброго дня, "],
    en: ["Good evening, ", "Good Night, ", "Good Morning, ", "Good Afternoon, "],
}

 export function langRu() {
    changeQuote.addEventListener("click", getQuotesRus);
    showDateRus();
    name.placeholder = "[Введите имя]";
    getGreetingRus();
    getWeatherRus();
}

export function langEn() {
    changeQuote.addEventListener("click", getQuotes);
    getQuotes();
    showDate();
    name.placeholder = "[Enter name]";
    getGreeting();
    getWeather();
}

export function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if(hours < 6) {
        return greeting.textContent = `${greetingTranslation.en[1]}`;
    } else if(hours < 12) {
        return greeting.textContent = `${greetingTranslation.en[2]}`;
    } else if(hours < 18) {
            return greeting.textContent = `${greetingTranslation.en[3]}`;
    } else if(hours < 24) {
            return greeting.textContent = `${greetingTranslation.en[0]}`
    }
}
export function getGreetingRus() {
    const date = new Date();
    const hours = date.getHours();
    if(hours < 6) {
        return greeting.textContent = `${greetingTranslation.ru[1]}`;
    } else if(hours < 12) {
       return greeting.textContent = `${greetingTranslation.ru[2]}`;
    } else if(hours < 18) {
         return greeting.textContent = `${greetingTranslation.ru[3]}`;
    } else if(hours < 24) {
        return greeting.textContent = `${greetingTranslation.ru[0]}`;
    }
}

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if(hours < 6) {
        return "night";
    } else if(hours < 12) {
        return "morning";
    } else if(hours < 18) {
        return "day";
    } else if(hours < 24) {
        return "evening";
    }
}

async function getQuotes() {
    try {
        const quotes = "./assets/myData.json";
        const res = await fetch(quotes);
        const myData = await res.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quote.textContent = `${myData.quote[randomIndex].text}`;
        author.textContent = `${myData.quote[randomIndex].author}`;
    } catch(e) {
        if(e) {
           console.log(e);
        }
    }
}
getQuotes();

async function getQuotesRus() {
    try {
        const quotes = "./assets/myRussianQuotes.json";
        const res = await fetch(quotes);
        const myData = await res.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quote.textContent = `${myData.quote[randomIndex].text}`;
        author.textContent = `${myData.quote[randomIndex].author}`;
    } catch(e) {
        if(e) {
            console.log(e);
        }
    }
}

translateToEn.addEventListener("click", langEn);
translateToRus.addEventListener("click", langRu);
translateToRus.addEventListener("click", getQuotesRus);
translateToEn.addEventListener("click", getQuotes);
document.addEventListener('DOMContentLoaded', showTime);
document.addEventListener('DOMContentLoaded', getGreeting);
document.addEventListener('DOMContentLoaded', getQuotes);









