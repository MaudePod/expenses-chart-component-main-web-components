const template = document.createElement("template");
template.innerHTML = `
                <section class="spending-bar-chart">
                <section class="spending-bar-component">
                    <section class="spending-amount">
            $52.36
                    </section>
                    <label for="spending-bar">
                    <input type="checkbox" name="show-amount-spent" id="spending-bar">
                    </label>
                    <section class="spending-day">
            Wed
                    </section>
                </section>
                </section>
            <style>
                    section[class="spending-bar-component"]{
                        display: grid;
                        place-items: center;
                        border-radius: 5px;
                        width: 120px;
                        text-align: center;
                        gap: 20px;
                    }
                    section[class="spending-amount"]{
                        display: grid;
                        place-items: center;
                        font-size: x-large;
                        width: 100%;
                        color: var(--very-pale-orange);
                        background-color: var(--dark-brown);
                        padding: 2px;
                        border-radius:5px;
                        
                    }

                    label[for="spending-bar"]{
                        background-color:var(--soft-red);
                        height: 200px;
                        width: 20px;
                    }

                    input[id="spending-bar"]{
                        display: none;
                    }
                    section[class="spending-day"]{
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
            this.shadowRoot.querySelector('section[class="spending-amount"]').innerHTML=this.getAttribute('spending-amount');
        }
        if (this.hasAttribute('height')) {
            this.shadowRoot.querySelector('section[class="spending-bar"]').height=this.getAttribute('height');
            
        }
    }
        static get observedAttributes() {
            return [
                'spending-amount',
                'height',
            ];
        }

    }
    
    if (!customElements.get("spending-bar-component")) {
        customElements.define("spending-bar-component", SpendingBarComponent);
    } 