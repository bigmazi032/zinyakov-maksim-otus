import React, {FC} from 'react';
import {ToDoItemType} from "../../MyInterface";
import '../styles/ToDoItem.css';

const onClickHandler = (event: any, item: ToDoItemType) => {
    event.target.classList.toggle("completed");
    item.isCompleted = !item.isCompleted;
}

const ToDoItem: FC<{ item: ToDoItemType }> = ({item}) =>
    <li className={item.isCompleted ? "text completed" : "text"}
        onClick={(event) => onClickHandler(event, item)}>{item.text}
    </li>

export default ToDoItem;