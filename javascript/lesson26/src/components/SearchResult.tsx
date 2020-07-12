import React, {FC} from "react";
import Card from "./Card";
import {WeatherCard} from "../MyInterface/MyInterface";

interface SearchResultProps {
    cards: Array<WeatherCard>
    addToFavorites: (card: WeatherCard) => void
}

const SearchResult: FC<SearchResultProps> = ({cards, addToFavorites}) => {
    const CardsElement = cards.map((c: any) => <Card
        card={c}
        textButton="Добавить в избранное"
        buttonAction={addToFavorites}/>);

    return (
        <div>
            {CardsElement.length > 0 ? CardsElement : <p className="note">Нет данных для отображения</p>}
        </div>
    )
}

export default SearchResult;