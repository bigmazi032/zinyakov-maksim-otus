<style>
    .container{
        margin: 10px;
    }
    .p-button{
        padding: 10px 7px 5px 7px;
        cursor: pointer;
    }
    .current {
        border-bottom: 2px solid #42b983;
    }
    .no-clickable {
        cursor: default;
    }
</style>

<script>
    import { rowPerPage, data, currentPage } from './GridStore.js';
    import { onMount } from 'svelte';
    let p; // всего страниц
    let fp; // первая страниица
    let lp; // последняя страница
    let pp; // страницы в середине
    let s3t; // пропуск страниц в начале
    let e3t; // пропуск страниц в конце
    let vp; // финальное отображение


    $:init($data.length, $rowPerPage);
    $:updateVP(fp, s3t, pp, e3t, lp)

function updateVP(fp, s3t, pp, e3t, lp){
    vp = [];
    for (let i=0; i<arguments.length; i++){
        if (arguments[i]) {
            vp=vp.concat(arguments[i]);
        }
    }
}

function init(dataLength, rowsOnPage) {
    vp = [];
    p = 0;
    fp = 0;
    lp = 0;
    pp = [];
    s3t = null;
    e3t = null;
    if (dataLength) {
        p = Math.ceil(dataLength/rowsOnPage);
        fp = 1;
        currentPage.set(1);
        if (p > fp) {
            lp = p;
            putInStart();
        }
    }
}

function putInStart() {
    pp = [];
        for (let i = 0; i < 3; i++) {
            if (fp + i + 1 < p) {
                pp[i] = fp + i + 1;
            }
        }
        s3t = null;
    if (pp[pp.length - 1] < p - 1) {
        e3t = '...';
    }
}

function putInEnd() {
    if (e3t) {
        pp = [];
        for (let i = 0; i < 3; i++) {
            if (fp + i +1 < p) {
                pp[i] = lp - (3 - i);
            }
        }
        e3t = null;
    }
    if (pp[0] > fp + 1) {
        s3t = '...';
    }
}

function tryUpdatePP(direction) {
    if ('L' === direction) {
        // лево
        if (s3t) {
            for (let i=0; i<pp.length; i++) {
                pp[i] = --pp[i];
            }
            if (pp[0] === fp+1) {
                s3t = null;
            }
            if (pp[pp.length-1]<p-1) {
                e3t ='...';
            }
        }
    }
    if ('R' === direction) {
        // право
        if (e3t) {
            for (let i=0; i<pp.length; i++) {
                pp[i] = ++pp[i];
            }
            if (pp[pp.length-1] === lp-1) {
                e3t = null;
            }
            if (pp[0] > fp+1) {
                s3t = "...";
            }
        }
    }
}

function clickPageButton(page) {
    if (parseInt(page)) {
        currentPage.set(page);
        if ($currentPage === pp[0]) {
            tryUpdatePP('L');
        }
        if ($currentPage === pp[pp.length-1]) {
            tryUpdatePP('R');
        }
        if ($currentPage === fp) {
            putInStart();
        }
        if ($currentPage === lp) {
            putInEnd();
        }
    }
}
</script>
<div class="container">
    {#each vp as page}
        <span
            class="
                p-button
                {parseInt(page) ? '' : 'no-clickable'}
                {$currentPage === page ? 'current' : ''}"
            on:click="{() => clickPageButton(page)}"
        >
            {page}
        </span>
    {/each}

</div>
