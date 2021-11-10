import playList from "./playList";
import {
    audioPlayer,
    button,
    isPlay,
    playBtn,
    playListContainer, playNext,
    playNum,
    playPrev,
    timeLine,
    volumeSlider
} from "./variables";

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
    } else {
        playNum = 3;
        playAudio();
        liList[playNum].classList.remove("active");
    }
    playAudio();
}

function getPlayNext() {
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
    // const classesToAdd = ['play-item', 'player'];
    // classesToAdd.forEach((ele) => {
        li.classList.add('play-item');
    //})
    li.textContent = `${playList[i].title}`;
    playListContainer.append(li);
}
let liList = Array.from(document.querySelectorAll("li"));
console.log(liList);

function changeClass() {
    liList[playNum].classList.add("active");
}

button.addEventListener("click", playAudio);
button.addEventListener("click", toggleBtn);
playPrev.addEventListener("click", getPlayPrev);
playPrev.addEventListener("click", changeClass);
playNext.addEventListener("click", getPlayNext);
playNext.addEventListener("click", changeClass);
button.addEventListener("click", changeClass);