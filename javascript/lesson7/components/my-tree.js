import {css, html, LitElement} from "lit-element";
import "./my-leaf.js";
import "./my-toggle-btn.js";


export class MyTree extends LitElement {

    static get styles() {
        return css`
        .branch {
            margin-left: 20px;
        } 
        .decorated {
            cursor: pointer;
            margin-top: 3px;
            border: 1px solid lightblue;;
            border-radius: 5px;
            width: fit-content;
            padding: 3px;  
        }
        .hide {
            display: none;
        }
        `;
    }

    static get properties() {
        return {
            data: {type: Array},
            lastId: {type: Number}
        }
    }

    constructor() {
        super();
        this.data = [];
        this.lastId = 0;
    }

    createTree(data, index = 0) {
        if (data.length === 0) return;
        let el = data[index];
        let branch;
        if (this.isLeaf(el)) {
            branch = html`<my-leaf data  = ${JSON.stringify(el)} ></my-leaf>`;
        } else {
            branch = html`<div class="branch decorated"> 
                            ветка - ${el.id}
                            <my-toggle-btn class = "menu ${this.hideToggleButton(el)}" 
                                @click="${(e) => {this.clickToggleBtn(e)}}"
                                captions='["v","^"]'
                                state = '1'
                            ></my-toggle-btn>
                            <button 
                                @click="${(e) => {this.addLeaf(e, el.items)}}"
                            >+l</button> 
                            <button 
                                @click="${(e) => {this.addBranch(e, el.items)}}"
                            >+b</button> 
                            ${this.createTree(el.items)}
                        </div>`

        }
        if (data[++index]) {
            return html`${branch}${this.createTree(data, index)}`;
        } else {
            return branch;
        }
    }

    hideToggleButton(element) {
        return (element.items.length > 0) ? "" : "hide";
    }

    clickToggleBtn(e) {
        e.stopPropagation();
        const children = e.target.parentElement.children;
        for (let i = 0; i < children.length; i++) {
            if (!children[i].classList.contains("menu")) {
                children[i].classList.toggle("hide");
            }
        }
    }

    isLeaf(el) {
        return !el.hasOwnProperty("items");
    }

    addLeaf(e, array) {
        array.push({"id": ++this.lastId})
    }

    addBranch(e, array) {
        array.push(
            {
                "id": ++this.lastId,
                "items": []
            })
    }

    render() {
        return html`
            <div class="tree decorated">
                <div>Tree
                    <button class="menu"
                        @click="${(e) => {this.addLeaf(e, this.data)}}"
                    >l</button> 
                    <button class ="menu"
                        @click="${(e) => {this.addBranch(e, this.data)}}"
                    >b</button> 
                </div>
                ${this.createTree(this.data)}
            </div>`;
    }
}

window.customElements.define('my-tree', MyTree);