import {
    popupContent,
    settings,
    popup,
    translateToEn,
    translateToRus,
    myDate,
    checkbox,
    checkboxWeather,
    weather,
    checkboxPlayer,
    playerAll,
    checkboxQuotes,
    quotesAll,
    main,
    textSettings,
    textPhoto,
    textTags,
    textHide,
    switchText, switchWeather, switchPlayer, switchQuotes
} from "./variables";
import {langEn, langRu, settingsText, switchingText} from "./index";
import "./index";

export function textToRus() {
    textSettings.textContent = `${settingsText.ru[0]}`;
    textPhoto.textContent = `${settingsText.ru[1]}`;
    textTags.textContent = `${settingsText.ru[2]}`;
    textHide.textContent = `${settingsText.ru[3]}`;
    switchText.textContent = `${switchingText.ru[0]}`;
    switchWeather.textContent = `${switchingText.ru[1]}`;
    switchPlayer.textContent = `${switchingText.ru[2]}`;
    switchQuotes.textContent = `${switchingText.ru[3]}`;
}

export function textToEn() {
    textSettings.textContent = `${settingsText.en[0]}`;
    textPhoto.textContent = `${settingsText.en[1]}`;
    textTags.textContent = `${settingsText.en[2]}`;
    textHide.textContent = `${settingsText.en[3]}`;
    switchText.textContent = `${switchingText.en[0]}`;
    switchWeather.textContent = `${switchingText.en[1]}`;
    switchPlayer.textContent = `${switchingText.en[2]}`;
    switchQuotes.textContent = `${switchingText.en[3]}`;
}

function showPopup() {
    popup.style.display = "flex";
    popupContent.style.display = "flex";
    translateToEn.addEventListener("click", langEn);
    translateToRus.addEventListener("click", langRu);
}

function closePopup() {
    popup.style.display = "none";
    popupContent.style.display = "none";
}

function hideDate() {
    if(checkbox.checked) {
        myDate.style.display = "none";
    } else {
        myDate.style.display = "flex";
    }
}
function hideWeather() {
   if(checkboxWeather.checked) {
       weather.style.display = "none";
   } else {
       weather.style.display = "flex";
   }
}

function hidePlayer() {
    if(checkboxPlayer.checked) {
        playerAll.style.display = "none";
    } else {
        playerAll.style.display = "flex";
    }
}

function hideQuotes() {
    if(checkboxQuotes.checked) {
        quotesAll.style.display = "none";
    } else {
        quotesAll.style.display = "block";
    }
}

settings.addEventListener("click", showPopup);
popupContent.addEventListener("click", e => {
    e.stopPropagation();
});
popup.addEventListener("click",(e) => {
    closePopup();
});
checkbox.addEventListener("change", hideDate);
checkboxWeather.addEventListener("change", hideWeather);
checkboxPlayer.addEventListener("change", hidePlayer);
checkboxQuotes.addEventListener("change", hideQuotes);
