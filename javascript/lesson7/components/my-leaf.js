import {css, html, LitElement} from "lit-element";

export class MyLeaf extends LitElement {
    static get styles() {
        return css`
        .leaf {
            cursor: pointer;
            margin-left: 20px;
            margin-top: 3px;
            border: 1px solid rgba(95, 245, 95, 0.2);
            border-radius: 5px;
            background: rgba(95, 245, 95, 0.2);
            width: fit-content;
            padding: 3px;  
        }
        `;

    }
    static get properties() {
        return {
            data: {type: Object},
        }
    }
    constructor() {
        super();
    }

    render() {
        return html`
        <div class="leaf">лист - ${this.data.id}
        </div>
        `;
    }
}
window.customElements.define('my-leaf', MyLeaf);