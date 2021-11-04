import "./assets/myData.json";
const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.getElementsByTagName("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const button = document.querySelector("button");
const playerControls = document.querySelector(".player-controls");
let isPlay = false;
let randomNum;
let playNum = 0;

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    setTimeout(showDate, 1000);
    // showDate();
    getGreeting();
    return time.textContent = currentTime;
}
function showDate() {
    const newDate = new Date();
    const options = {month: "long", weekday: "long", day: "numeric"}
    const currentDate = newDate.toLocaleDateString("en-US", options);
    return myDate.textContent = currentDate;
}
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if(hours < 6) {
        return greeting.textContent = "Good Night, ";
    } else if(hours < 12) {
        return greeting.textContent = "Good Morning, ";
    } else if(hours < 18) {
        return greeting.textContent = "Good Afternoon, ";
    } else if(hours < 24) {
        return greeting.textContent = "Good Evening, ";
    }
}

function getTimeOfDay() {
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
const setLocalStorage = () => {
    return localStorage.setItem("name", name.value);
}
const getLocalStorage = () => {
    if(localStorage.getItem("name")) {
        return name.value = localStorage.getItem("name");
    }
}
const setCityLocalStorage = () => {
    return localStorage.setItem("city",city.value);
}
const getCityLocalStorage = () => {
    if(localStorage.getItem("city")) {
         city.value = localStorage.getItem("city");
         getWeather();
    }
    if(!localStorage.getItem("city")) {
        city.value = "Minsk";
    }
}
function getRandomNumber (max) {
    return Math.floor(Math.random() * max)
}


function setBg() {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    let bgNum = getRandomNumber(21).toString().padStart(2, "0");
    img.src = `https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
    img.onload = () => {
        body[0].style.backgroundImage = `url('https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true')`;
    }
}
setBg();

function getSlideNext() {
    // bgNum =
    randomNum = Number(getRandomNumber(21).toString().padStart(2, "0"));
    if(randomNum < 20) {
        randomNum += 1;
    } else if(randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

function getSlidePrev() {
    randomNum = Number(getRandomNumber(21).toString().padStart(2, "0"));
    if(randomNum > 1) {
        randomNum -= 1;
    } else if(randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}
async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=f0fe5f73fec8281be587daed94f39480&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = `${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)}m/s`;
            }
    catch(e) {
        console.log(e);
    }
}
getWeather();

async function getQuotes() {
    try {
        const quotes = "./assets/myData.json";
        const res = await fetch(quotes);
        const myData = await res.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quote.textContent = `${myData.quote[randomIndex].text}`;
        author.textContent = `${myData.quote[randomIndex].author}`;
    } catch(e) {
        console.log(e);
    }
}
getQuotes();

const audio = new Audio('https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3');
console.log(audio);


function playAudio() {
    if(isPlay === false) {
        isPlay = true;
        audio.currentTime = 0;
        audio.play();
    } else {
        isPlay = false
        audio.pause();
    }
    }

function toggleBtn(e) {
    if(isPlay === true) {
        isPlay = true;
        e.target.classList.add("pause");
        e.target.classList.remove("play");
    }
     if(isPlay === false) {
         console.log(isPlay)
         e.target.classList.remove("pause");
         e.target.classList.add("play");
    }
}
// console.log(toggleBtn());
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setCityLocalStorage);
window.addEventListener('load', getCityLocalStorage);
document.addEventListener('DOMContentLoaded', showTime);
document.addEventListener('DOMContentLoaded', showDate);
document.addEventListener('DOMContentLoaded', getQuotes);
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
city.addEventListener("change", getWeather);
changeQuote.addEventListener("click", getQuotes);
button.addEventListener("click", playAudio);
// pause.addEventListener("click", pauseAudio);
playerControls.addEventListener("click", toggleBtn);




