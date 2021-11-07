import "./assets/myData.json";
import playList from "./playList";
console.log(playList)
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
const weather = document.querySelector(".description-container");
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
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const audioPlayer = document.querySelector(".audio-player");
const timeLine = document.querySelector(".timeline");
const volumeSlider = document.querySelector(".controls .volume-slider");
const playBtn = document.querySelector(".controls .toggle-play");
console.log(playBtn)

const musicName = document.querySelector(".musicName");
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
        if(e) {
            //weather.textContent = "Enter a valid city"
        }

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
        if(e) {
           console.log(e);
        }
    }
}
getQuotes();

const audio = new Audio();
audio.src = playList[playNum].src;

audio.addEventListener("loadeddata", () => {
    document.querySelector(".length")
        .textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
},false
);
timeLine.addEventListener("click", e => {
    const timeLineWidth = window.getComputedStyle(timeLine).width;
    console.log(timeLineWidth);
    const timeToSeek = e.offsetX / parseInt(timeLineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
})

volumeSlider.addEventListener("click", e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100  + "%";
}, false);

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress").style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".playerTime .current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);


playBtn.addEventListener("click", () => {
    if(audio.paused) {
        playBtn.classList.add("paused");
        playBtn.classList.remove("player");
        audio.play();
        changeClass();
    } else {
        playBtn.classList.add("player");
        playBtn.classList.remove("paused");
        audio.pause();
    }
    changeClass();
}, false);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if(audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
    } else {
        volumeEl.classList.remove("icono-volumeMute");
        volumeEl.classList.add("icono-volumeMedium");
    }
})
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

function playAudio() {
    if(isPlay === false) {
        isPlay = true;
        audio.src = playList[playNum].src;
        console.log(audio.src);
        audio.currentTime = 0;
        audio.play();
    } else {
        isPlay = false
        audio.pause();
    }
    }

function toggleBtn() {
    if(isPlay === true) {
        isPlay = true;
        button.classList.add("pause");
        button.classList.remove("play");
    }
     if(isPlay === false) {
         console.log(isPlay)
         button.classList.remove("pause");
         button.classList.add("play");
    }
}

function getPlayPrev() {
    if(playNum > 0) {
        liList[playNum].classList.remove("active");
        playNum --;
        playAudio();
        // playList[playNum].src.classList.add("active");
        // liList[playNum].classList.add("active");
    } else {
        playNum = 3;
        playAudio();
        liList[playNum].classList.remove("active");
    }
    playAudio();
}

function getPlayNext() {
    // liList[playNum].classList.add("active");
    if(playNum < 3) {
        liList[playNum].classList.remove("active");
        playNum ++;
        playAudio();
        liList[playNum].classList.remove("active");
    } else  {
        playNum = 0;
         playAudio();
    }
    playAudio();
}

for (let i = 0; i < playList.length; i++) {
        playAudio();
        let li = document.createElement("li");
        const classesToAdd = ['play-item','player'];
        classesToAdd.forEach((ele) => {
        li.classList.add(...classesToAdd);
    })
        // li.classList.add("play-item");
        li.textContent = `${playList[i].title}`;
        playListContainer.append(li);
    }
let liList = Array.from(document.querySelectorAll("li"));
console.log(liList);

function changeClass() {
    liList[playNum].classList.add("active");
}



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
button.addEventListener("click", toggleBtn);
playPrev.addEventListener("click", getPlayPrev);
playPrev.addEventListener("click", changeClass);
playNext.addEventListener("click", getPlayNext);
playNext.addEventListener("click", changeClass);
button.addEventListener("click", changeClass);







