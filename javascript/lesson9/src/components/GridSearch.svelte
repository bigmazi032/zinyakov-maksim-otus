<style>
    .search-query {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 15px 0 30px;
        border: 1px solid #e3e3e3;
        color: #273849;
        outline: none;
        border-radius: 15px;
        margin-right: 10px;
        transition: border-color 0.2s ease;
        background: #fff url(../images/search.png) 8px 5px no-repeat;
        background-size: 20px;
        vertical-align: middle !important;
    }
    .search-query:focus {
        border-color: #42b983;
    }
</style>
<script>
    import { inputData, data, columns } from './GridStore.js';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let searchKey = '';

   $: updateData(searchKey, $inputData);

    function updateData(searchKey) {
        let newData = applySearch(searchKey);
        data.set(newData);
        dataUpdated(newData, searchKey);
    }

    function dataUpdated(newData, searchKey) {
        dispatch('dataUpdated', {
            data: newData,
            searchKey: searchKey
        });
    }

    function applySearch(searchKey) {
        let tempData = $inputData.slice();
        if (searchKey) {
            tempData = search(tempData, searchKey);
        }
        return tempData;
    }

    function search(array, searchKey) {
        array = array.filter(el => {
            let r = $columns.some(c => {
                let testValue = el[c.key].toString();
                let result = testValue.includes(searchKey);
                return (result);
            })
            return r;
        });
        return array;
    }
</script>



<input type="text" class="search-query" bind:value = {searchKey} >

