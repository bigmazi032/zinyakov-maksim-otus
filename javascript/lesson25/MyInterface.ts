export interface ToDoItemType {
    id: number,
    text: string,
    isCompleted: boolean
}

export interface AppState {
    items: Array<ToDoItemType>,
    task: string,
    isOnlyActive: boolean
}