const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.getElementsByTagName("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
let randomNum;

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
function getRandomNumber (max) {
    return Math.floor(Math.random() * max)
}

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomNumber(21).toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
    img.onload = () => {
        body[0].style.backgroundImage = `url('https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true')`;
    }
    console.log(img)
}
setBg();

function getSlideNext() {
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

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
document.addEventListener('DOMContentLoaded', showTime);
document.addEventListener('DOMContentLoaded', showDate);
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);



