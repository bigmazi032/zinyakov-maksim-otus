// https://openweathermap.org/current - описание параметров ответа

export interface Response {
    message: "accurate",
    cod: string,
    count: number,
    list: Array<WeatherCard>
}

export interface WeatherCard {
    id: number, // city id
    name: string, // city
    coord: Coord,
    main: MainData,
    dt: number,
    wind: Wind,
    sys: Sys,
    rain: string,
    snow: string,
    clouds: Clouds,
    weather: Array<Weather>
}

interface Coord {
    lat: number,
    lon: number
}

interface MainData {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

interface Wind {
    speed: number,
    deg: number
}

interface Sys {
    country: string
}

interface Clouds {
    all: number
}

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}