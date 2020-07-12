import React, {FC} from "react";
import {WeatherCard} from "../MyInterface/MyInterface";

interface CardProps {
    card: WeatherCard
    textButton: string
    buttonAction: (card: WeatherCard) => void
}

const Card: FC<CardProps> = ({card, textButton, buttonAction}) => {
    const {name, coord, clouds, main: {temp, humidity, pressure}, wind, weather} = card;
    return (
        <div className="card">
            <p>Город {name}. Kоординаты С.Ш. = {coord.lat} В.Д. = {coord.lon} - {weather[0].description}</p>
            <p>Температура - {temp} °С</p>
            <p>Облачность - {clouds.all} %</p>
            <p>Давление - {pressure} мм.рт.ст.</p>
            <p>Относительная влажность - {humidity} %</p>
            <p>Ветер - {wind.speed} м/с</p>
            <button onClick={() => buttonAction(card)}>{textButton}</button>
            <hr/>
        </div>
    )
}

export default Card;