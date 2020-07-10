import React from "react";
import "../styles/App.css";
import SearchPage from "./SearchPage";
import FavoritesPage from "./FavoritesPage";
import loadWeather from "../api/weather";
import {WeatherCard} from "../MyInterface/MyInterface";

interface AppProps {
}

interface AppState {
    searchResults: Array<WeatherCard>
    favorites: Array<WeatherCard>
}

class App extends React.Component <AppProps, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            searchResults: [],
            favorites: [],
        };
        this.search = this.search.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    // искать погоду в заданном в строке поиска городе
    async search(cityToSearch: string) {
        try {
            const response = await loadWeather(cityToSearch);
            if (response && response.cod === "200" && response.count > 0) {
                const {list} = response;
                this.setState({searchResults: list});
            } else {
                this.setState({searchResults: []});
            }
        } catch (e) {
            console.log(e);
        }
    }

    // добавить в избранное
    addToFavorites(card: WeatherCard) {
        const {favorites} = this.state;
        favorites.push(card);
        this.setState({favorites: favorites})
    }

    // добавить в избранное
    removeFromFavorites(card: WeatherCard) {
        const {favorites} = this.state;
        const index = favorites.findIndex(f => f.id === card.id);
        favorites.splice(index, 1);
        this.setState({favorites: favorites})
    }

    render() {
        const {favorites, searchResults} = this.state;

        return (
            <div>
                <h1>Weather Monitor</h1>
                <div className="App">
                    <div className="page">
                        <SearchPage
                            searchResults={searchResults}
                            clickOnSearch={this.search}
                            addToFavorites={this.addToFavorites}/>
                    </div>
                    <div className="page">
                        <FavoritesPage
                            favorites={favorites}
                            removeFromFavorite={this.removeFromFavorites}/>
                    </div>
                </div>
            </div>

        )
    }

}

export default App;