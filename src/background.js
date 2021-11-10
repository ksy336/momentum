
import {body, randomNum, slideNext, slidePrev} from "./variables";
import {getTimeOfDay} from "./index";

export function getRandomNumber (max) {
    return Math.floor(Math.random() * max)
}

// function setBg() {
//     const timeOfDay = getTimeOfDay();
//     const img = new Image();
//     let bgNum = getRandomNumber(21).toString().padStart(2, "0");
//     img.src = `https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
//     img.onload = () => {
//         body[0].style.backgroundImage = `url('https://github.com/ksy336/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true')`;
//     }
// }
// setBg();
// https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=yVFEf9oJozzlaVEU3GW8wCuIcneRf-Ii4JBVV7oJZdw
// async function getLinkToImage() {
//     try {
//         const timeOfDay = getTimeOfDay();
//         const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=yVFEf9oJozzlaVEU3GW8wCuIcneRf-Ii4JBVV7oJZdw`;
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log(data);
//         body[0].style.backgroundImage = `url(${data.urls.regular})`;
//     }
//     catch(e) {
//         if(e) {
//             console.log(e)
//         }
//     }
// }
// getLinkToImage();

async function getLinkToImageFromFlickr() {
    try {
        const timeOfDay = getTimeOfDay();
        const url =
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f6576fc40025532e19efbe8772c6ba34&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        console.log(res);
        const data = await res.json();
        console.log(data);
        console.log(data.photos.photo[0].url_l);
        let photo = data.photos.photo;
        console.log(photo);
        for (let i = 0; i < photo.length; i++) {
            body[0].style.backgroundImage = `url(${data.photos.photo[i].url_l})`;
        }

    } catch(e) {
        if(e) {
            console.log(e);
        }
    }
}
window.addEventListener("load",getLinkToImageFromFlickr);

function getSlideNext() {
    randomNum = Number(getRandomNumber(21).toString().padStart(2, "0"));
    if(randomNum < 20) {
        randomNum += 1;
    } else if(randomNum > 20) {
        randomNum = 1;
    }
    // setBg();
    // getLinkToImage()
    getLinkToImageFromFlickr();
}

function getSlidePrev() {
    randomNum = Number(getRandomNumber(21).toString().padStart(2, "0"));
    if(randomNum > 1) {
        randomNum -= 1;
    } else if(randomNum < 1) {
        randomNum = 20;
    }
    // setBg();
    // getLinkToImage();
    getLinkToImageFromFlickr();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

