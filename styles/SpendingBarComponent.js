const template = document.createElement("template");
template.innerHTML = `
                <section class="spending-bar-chart">
                <section class="spending-bar-component">
                    <section class="spending-amount">
                    </section>
                    <label for="spending-bar">
                    <input type="checkbox" name="show-amount-spent" id="spending-bar">
                    </label>
                     <section class="spending-day">
                    </section>
                </section>
                </section>
            <style>

            section[class="spending-bar-component"] {
                display: grid;
                place-items: center;
                border-radius: 5px;
                text-align: center;
                gap: 10px;
                height: 250px;
                align-content: end;
            }
            
            section[class="spending-amount"] {
                display: none;
                place-items: center;
                font-size: x-large;
                width: 100%;
                color: var(--very-pale-orange);
                background-color: var(--dark-brown);
                padding: 2px;
                border-radius: 5px;
            
            }
            
            label[for="spending-bar"] {
                display: grid;
                background-color: var(--soft-red);
                width: 80%;
                cursor: pointer;
            }
            
            section[class="spending-bar-component"]:hover,
            section[class="spending-bar-component"]:has(input:checked) {
                section[class="spending-amount"] {
                    display: grid;
                }
            }
            
            input[id="spending-bar"] {
                display: none;
            }
            
            section[class="spending-day"] {
                color: var(--medium-brown);
            }
            </style>

`
export default class SpendingBarComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(
    ) {
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.appendChild(template.content.cloneNode(true))
        if (this.hasAttribute('spending-amount')) {
            this.shadowRoot.querySelector('section[class="spending-amount"]').innerHTML = this.getAttribute('spending-amount');
        }
        if (this.hasAttribute('height')) {
            this.shadowRoot.querySelector('label[for="spending-bar"]').style.height = this.getAttribute('height');
        }
        if (this.hasAttribute('bar-color')) {
            this.shadowRoot.querySelector('label[for="spending-bar"]').style.backgroundColor = this.getAttribute('bar-color');
        }
        if (this.hasAttribute('day')) {
            this.shadowRoot.querySelector('section[class="spending-day"]').innerHTML = this.getAttribute('day');
        }
    }
    static get observedAttributes() {
        return [
            'spending-amount',
            'height',
            'bar-color',
            'day'
        ];
    }

}

if (!customElements.get("spending-bar-component")) {
    customElements.define("spending-bar-component", SpendingBarComponent);
} 