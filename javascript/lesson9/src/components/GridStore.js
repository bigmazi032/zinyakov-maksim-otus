import {readable, writable} from 'svelte/store';

export const rowPerPage = writable(0); // количество рядов на странице
export const inputData = writable([]); // начальные данные
export const columns = writable([]);
export const data = writable([]); // данные после поиска учетом поиска
export const currentPage = writable(0); // текущая страница
