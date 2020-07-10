import React, {FC} from 'react';
import ToDoItem from "./ToDoItem";
import {ToDoItemType} from '../../MyInterface';

const ToDoList: FC<{ items: Array<ToDoItemType> }> = ({items}) =>
    <ul>
        {items.map(i => <ToDoItem item={i}/>)}
    </ul>;

export default ToDoList;