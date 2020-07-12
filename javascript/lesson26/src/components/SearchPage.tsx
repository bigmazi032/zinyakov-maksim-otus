import React, {FC} from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import {WeatherCard} from "../MyInterface/MyInterface";

interface SearchPageProps {
    searchResults: Array<WeatherCard>
    clickOnSearch: (cityToSearch: string) => void
    addToFavorites: (card: WeatherCard) => void
}

const SearchPage: FC<SearchPageProps> = ({searchResults, clickOnSearch, addToFavorites}) =>
    <div>
        <h2>Выберите город</h2>
        <SearchBar clickOnSearch={clickOnSearch}/>
        <hr/>
        <SearchResult cards={searchResults} addToFavorites={addToFavorites}/>
    </div>

export default SearchPage;