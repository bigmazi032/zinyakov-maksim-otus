import React, {FC} from "react";

interface SearchBarProps {
    clickOnSearch: (clickOnSearch: string) => void;
}

interface SearchBarState {
    searchString: string
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            searchString: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler(event: any) {
        const {currentTarget} = event;
        this.setState({searchString: currentTarget.value})
    }

    onClickHandler() {
        const {clickOnSearch} = this.props;
        const {searchString} = this.state;
        if (searchString !== "") {
            clickOnSearch(searchString);
            this.setState({searchString: ""})
        }
    }

    render() {
        const {searchString} = this.state;

        return (
            <div className="search-bar">
                <input type="text" value={searchString} onChange={this.onChangeHandler}/>
                <button onClick={this.onClickHandler}>Искать</button>
            </div>
        )
    }
}

export default SearchBar;