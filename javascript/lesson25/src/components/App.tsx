import React from "react";
import '../styles/App.css';
import ToDoList from "./ToDoList";
import {items} from "../../InitialData"
import {AppState} from "../../MyInterface";

class App extends React.Component <{}, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            items: items,
            task: "",
            isOnlyActive: false
        };
        this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
        this.onClickAddItemButtonHandle = this.onClickAddItemButtonHandle.bind(this);
        this.onChangeActiveHandler = this.onChangeActiveHandler.bind(this);
    }

    onChangeInputHandler(event: any) {
        this.setState({task: event.target.value});
    }

    onClickAddItemButtonHandle() {
        const newItem = {
            id: items[items.length - 1].id + 1,
            text: this.state.task,
            isCompleted: false
        };
        items.push(newItem);
        console.log(items);
        this.setState({task: ""});
    }

    onChangeActiveHandler(event: any) {
        const checked = event.target.checked;
        this.setState({isOnlyActive: event.target.checked});
        this.setState({items: checked ? items.filter(i => !i.isCompleted) : items});
    }

    render() {
        return (
            <div>
                <h1>My React App!</h1>
                <input type="checkbox" checked={this.state.isOnlyActive} onChange={this.onChangeActiveHandler}/> <span>Показать только активные </span>
                <ToDoList items={this.state.items}/>
                <input value={this.state.task} onChange={this.onChangeInputHandler}/>
                <button onClick={this.onClickAddItemButtonHandle}>Добавить задачу</button>
            </div>
        )
    }
}

export default App;