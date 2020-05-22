<style>
    select {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0 0 0 0;
        box-sizing: border-box;
        border: 1px  #ccc;
        border-radius: 2px;
    }

    input {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0  5px 0 5px;
        box-sizing: border-box;
        border: 1px #f9f9f9;
        border-radius: 2px;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
    }

    .btn-show {
        z-index: 5;
        background-color: #f5f5f5;
        width: 120px;
        font-size: 16px;
        padding: 15px;
        cursor: pointer;
        border-radius: 0 15px 15px 0;
        margin-right: -15px;
    }
    .btn-show:hover{
        color: rgba(255, 255, 255, 0.66);
        background-color: #42b983;
    }

    .field {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 15px 0 30px;
        background-color: #f9f9f9;
        border: 1px solid  #f9f9f9;
        color: #273849;
        outline: none;
        border-radius: 15px;
        margin-right: 10px;
        transition: border-color 0.2s ease;
    }

    .field.error {
        border: 1px solid orangered;
    }

    .form {
        border: 1px solid #ddd;
        border-radius: 5px 15px 15px 5px;
        padding: 6px 20px 7px 20px;
    }

    .btn-add {
        background-color: #f9f9f9;
        border: 1px #f9f9f9;
        font-weight: bold;
        align: center;
        margin-left: 10px;
        border-radius: 10px;
        padding: 4px 10px 7px 10px;
        cursor: pointer;
    }

    .btn-add:hover {
        color: rgba(255, 255, 255, 0.66);
        background-color: #42b983;
    }
    .btn-add:active{
        color: rgba(255, 255, 255, 0.66);
        background-color: #42b9837a;
    }
</style>

<script>
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const allCategory = ['Категория','home', 'health', 'food', 'entertainment', 'auto', 'other'];
    const states = ['Внести расходы', 'Отменить'];
    const dispatch = createEventDispatcher();
    let visible = false;
    let date;
    let category;
    let value;

    function onClickBtnShowInput() {
        visible = !visible;
        clearInput();
        onChangeFieldDate();
        onChangeFieldCategory();
        onChangeFieldValue();
    }

    function onClickBtnAddCost() {
        if (checkInput()) {
            dispatch('clickBtnAddCost', {
                row: {
                    date: date,
                    category: category,
                    value: value
                }
            });
            clearInput();
        }
    }

    function clearInput() {
        date = '';
        category=allCategory[0];
        value = '';
    }

    let isDateCorrect = true;
    let isCategoryCorrect = true;
    let isValueCorrect = true;

    function checkInput() {
        isDateCorrect = checkDate();
        isCategoryCorrect = checkCategory();
        isValueCorrect = checkValue();
        return isDateCorrect && isCategoryCorrect &&  isValueCorrect;
    }
    const dateRestrict = {
        year: [1900,2100],
        days:[31,29,31,30,31,30,31,31,30,31,30,31]
    }

    function checkDate() {
        if (!date) return false;
        let d = date.split('.');
        if (d.length !== 3) return false;
        let year = Number(d[2]);
        if (!year || year < dateRestrict.year[0] || year > dateRestrict.year[1] )  return false;
        let month = Number(d[1]);
        if (!month || month < 1 || month > 12) return false;
        let day = Number(d[0]);
        if (!day || day < 1 || day > dateRestrict.days[month-1]) return false;
        return true;
    }

    function checkCategory() {
        return allCategory.indexOf(category)>0;
    }

    function checkValue() {
        return Number(value);
    }

    $: onChangeFieldValue(value);
    function onChangeFieldValue() {
        isValueCorrect = true;
    }

    $: onChangeFieldDate(date);
    function onChangeFieldDate() {
        isDateCorrect = true;
    }

    function onChangeFieldCategory() {
        isCategoryCorrect = true;
    }
</script>

<div class="container">
    <p class="btn-show" on:click={onClickBtnShowInput}>{states[+visible]}</p>
    {#if visible}
        <div class="container form" transition:fly="{{ x: -800, duration: 1000 }}">
            <input class="field {isDateCorrect ? '' : 'error'}" type="text"  bind:value={date} placeholder="Дата">
            <select class="field {isCategoryCorrect ? '' : 'error'}" bind:value={category} on:change={onChangeFieldCategory}>
                {#each allCategory as c}
                        <option  value={c}>
                            {c}
                        </option>
                {/each}
            </select>
            <input  class="field {isValueCorrect ? '' : 'error'}"
                    type="text" bind:value={value}
                    placeholder="Сумма">
            <div class="btn-add" on:click={onClickBtnAddCost}>+</div>
        </div>
    {/if}
</div>