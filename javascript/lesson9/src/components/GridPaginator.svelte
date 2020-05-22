<style>
    *,
    *:after,
    *:before {
        box-sizing: border-box;
    }

    .container {
        margin: 20px;
        max-width: 60px;
    }

    .custom-select-wrapper {
        position: relative;
        user-select: none;
        width: 100%;
    }

    .custom-select {
        display: flex;
        flex-direction: column;
        border-width: 0 2px 0 2px;
        border-style: solid;
        border-color: #42b983;
        border-radius: 3px;
    }


    .custom-select__trigger {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        font-size: 16px;
        font-weight: 300;
        color: #333;
        height: 32px;
        line-height: 32px;
        background: #ffffff;
        cursor: pointer;
        border-width: 2px 0 2px 0;
        border-style: solid;
        border-color: #42b983;
    }

    .custom-options {
        position: absolute;
        display: block;
        top: 100%;
        left: 0;
        right: 0;
        border: 1px solid #42b983;
        border-top: 0;
        border-radius: 3px;
        background: #fff;
        transition: all 0.5s;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        z-index: 2;
    }

    .custom-select.open .custom-options {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }

    .custom-option {
        position: relative;
        display: block;
        padding: 0 22px 0 22px;
        font-size: 16px;
        font-weight: 300;
        color: #333;
        line-height: 32px;
        cursor: pointer;
        transition: all 0.5s;
    }

    .custom-option:hover {
        cursor: pointer;
        background-color: #e3e3e3;
    }

    .custom-option.selected {
        color: #ffffff;
        background-color: #42b983;
    }

    /*.arrow {*/
    /*    position: relative;*/
    /*    height: 10px;*/
    /*    width: 10px;*/
    /*}*/

    /*.arrow::before,*/
    /*.arrow::after {*/
    /*    content: "";*/
    /*    position: absolute;*/
    /*    bottom: 0px;*/
    /*    width: 0.15rem;*/
    /*    height: 100%;*/
    /*    transition: all 0.5s;*/
    /*}*/

    /*.arrow::before {*/
    /*    left: -3px;*/
    /*    transform: rotate(45deg);*/
    /*    background-color: #42b983;*/
    /*}*/

    /*.arrow::after {*/
    /*    left: 3px;*/
    /*    transform: rotate(-45deg);*/
    /*    background-color: #42b983;*/
    /*}*/

    /*.open .arrow::before {*/
    /*    left: -3px;*/
    /*    transform: rotate(-45deg);*/
    /*}*/

    /*.open .arrow::after {*/
    /*    left: 3px;*/
    /*    transform: rotate(45deg);*/
    /*}*/

    .arrow {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .open .arrow {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px  #333;
        border-bottom: 4px solid #333;
    }

    .arrow {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #333;
    }

</style>

<script>
    import { rowPerPage } from './GridStore.js';

    export let listPage;
    let isMenuOpen = false;
    let selectedItems={};

    makeChoice($rowPerPage);


    function toggleListBox() {
        isMenuOpen=!isMenuOpen;
    }

    function makeChoice(item) {
        listPage.forEach(el=>selectedItems[el] = false);
        selectedItems[item] = true;
        rowPerPage.set(item);
    }
</script>


<div class="custom-select-wrapper container" on:click={toggleListBox}>
    <div class="custom-select" class:open="{isMenuOpen}">
        <div class="custom-select__trigger"><span>{$rowPerPage}</span>
            <span class="arrow"></span>
        </div>
        <div class="custom-options">
            {#each listPage as item}
                <span class="custom-option" class:selected={selectedItems[item]} on:click={()=>makeChoice(item)}>{item}</span>
            {/each}
        </div>
    </div>
</div>
