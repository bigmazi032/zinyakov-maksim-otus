<style>
    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }
    th {
        background-color: #42b983;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    td {
        background-color: #f9f9f9;
    }
    th,
    td {
        min-width: 100px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }
    .container {
        width: fit-content;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
    .pn-select-wrapper {
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .c-field-select .c-field-selectbox .c-field-selectbox-input, .c-field-select .c-field-selectbox .label {
        border: 1px solid #e1e1e1;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        border-radius: 5px;
        color: #000;
        display: block;
        font-size: 16px;
        line-height: 18px;
        margin-right: 20px;
        overflow: hidden;
        padding: 16px 36px 16px 19px;
        text-overflow: ellipsis;
        width: 100%;
        height: 100%;
    }
    .c-field-select .c-field-selectbox .c-field-arrow {
        background: transparent;
        border: none;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 14px;
        right: 13px;
    }
    .pag-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>

<script>
    import { rowPerPage, data, inputData, columns, currentPage } from './GridStore.js';
    import GridSearch from "./GridSearch.svelte"
    import GridPaginator from "./GridPaginator.svelte"
    import GridPagButton from "./GridPagButton.svelte";

    const listPage = [5,10,20,50];
    const initPosInList = 2;

    //props
    export let pData = [];
    export let pColumns = [];

    // инициализируем storage
    rowPerPage.set(listPage[initPosInList]);
    $:inputData.set(pData);
    $:data.set(pData);
    columns.set(pColumns);

    // начальные параметры сортировки
    let sortKey = 'id';
    let sortOrders = {};
    pColumns.forEach(e => {
        sortOrders[e.key] = 1
    });

    $: dataToView = formDataToView($data, sortKey, sortOrders[sortKey], $currentPage, $rowPerPage);

    function formDataToView(dataAfterSearch, sortKey, order, pageNum, numRowsPerPage) {
        let tempData = dataAfterSearch.slice();
        if (sortKey) {
            tempData = sort(tempData, sortKey, order);
        }
        tempData = getPage(tempData, pageNum, numRowsPerPage);
        return tempData;
    }

    function sort(array, sortKey, order) {
        let column = pColumns.filter((e) => e.key ===sortKey);
        let type;
        if (column.length) {
            type = column[0].type;
        }
        return array.sort((a, b) => {
            a = cast(a[sortKey], type);
            b = cast(b[sortKey], type);
            return (a === b ? 0 : a > b ? 1 : -1) * order;
        })
    }

    function getPage(tempData, pageNum, numRowsPerPage) {
        return tempData.splice((pageNum - 1) * numRowsPerPage, numRowsPerPage);
    }

    function cast(value, type) {
        if (type) type = type.toLowerCase();
        switch(type) {
            case 'number':
                value = Number(value);
                break;
            case 'string':
                // оставляем как есть
                break;
            case 'date':
                value =  Number(value.split('.').reverse().join(''));
                break;
            case 'currency':
                //преобразуем в число
                value = Number(value);
                break;
            default:
                value = String(value);
                break;
        }
        return value;
    }

    function sortBy(key) {
        sortKey = key;
        sortOrders[key] = sortOrders[key] * -1;
    }
</script>



<div class="container">
<div style="display:flex">
<GridSearch on:dataUpdated></GridSearch>
</div>
<table>
    <thead>
    <tr>
        {#each pColumns as column}
            <th
                    on:click="{()=>{sortBy(column.key)}}"
            > {column.name}
                <span class="arrow {sortOrders[column.key] > 0 ? 'asc' : 'dsc'}"></span>
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each dataToView as row}
        <tr>
            {#each pColumns as column}
                <td>
                    {row[column.key]}
                </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="pag-container">
    <span>Всего: {$data.length}</span>
    <GridPagButton></GridPagButton>
    <GridPaginator {listPage}></GridPaginator>
</div>

</div>