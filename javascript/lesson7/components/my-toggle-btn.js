import {css, html, LitElement} from "lit-element";


export class MyToggleBtn extends LitElement {
    static get styles() {
        return css`
        `;

    }

    static get properties() {
        return {
            captions: {type: Array},
            state: {type: Number},
        }
    }
    constructor() {
        super();
        this.captions = [];
        this.state = 0;
    }

    handleClick(e) {
        e.stopPropagation();
        this.state = Number(!Boolean(this.state));
        let click = new Event('click');
        this.dispatchEvent(click);
    }

    render() {
        return html`
        <button class = "menu" @click="${this.handleClick}" >${this.captions[this.state]}</button>
        `;
    }
}
window.customElements.define('my-toggle-btn', MyToggleBtn);