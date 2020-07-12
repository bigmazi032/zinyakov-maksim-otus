import React, {FC} from "react";
import {WeatherCard} from "../MyInterface/MyInterface";
import Card from "./Card";

interface FavoritesPageProps {
    favorites: Array<WeatherCard>
    removeFromFavorite: (card: WeatherCard) => void
}

const FavoritesPage: FC<FavoritesPageProps> = ({favorites, removeFromFavorite}) => {
    const favoritesCards = favorites.map(f =>
        <Card card={f} textButton={"Удалить из избранного"} buttonAction={removeFromFavorite}/>
    )
    return (
        <div>
            <h2>Избранное</h2>
            {favoritesCards.length > 0 ? favoritesCards : <p className="note">Вы пока не выбрали ни один город</p>}
        </div>
    )
}

export default FavoritesPage;