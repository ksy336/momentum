import {city, name} from "./variables";
import {getWeather} from "./weather";
import {langEn, langRu} from "./index";

export const setLocalStorage = () => {
    return localStorage.setItem("name", name.value);
}
export const getLocalStorage = () => {
    if(localStorage.getItem("name")) {
        return name.value = localStorage.getItem("name");
    }
}
export const setCityLocalStorage = () => {
    return localStorage.setItem("city",city.value);
}
export const getCityLocalStorage = () => {
    if(localStorage.getItem("city")) {
        city.value = localStorage.getItem("city");
        getWeather();
    }
    if(!localStorage.getItem("city")) {
        if(langEn) {
            city.value = "Minsk";
        } else if(langRu) {
            city.value = "Минск";
        }
    }
}
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setCityLocalStorage);
window.addEventListener('load', getCityLocalStorage);