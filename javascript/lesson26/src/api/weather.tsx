import {Response} from "../MyInterface/MyInterface";

const API_URL = "http://api.openweathermap.org/data/2.5/find";
const API_KEY = "c94f5811f67344cddad1731179218fcb";
const units = "metric"; // получаем данные в метрической системе
const lang = "ru"; // включаем русский язык

async function loadWeather(city: String): Promise<Response> {
    const url = `${API_URL}?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`
    let response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Ошибка получения данных с сервера >" + response.status + " : " + response.statusText);
    }
}

export default loadWeather;

