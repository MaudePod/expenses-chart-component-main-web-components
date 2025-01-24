export default class SpendingCardComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals=this.attachInternals()
    }
    connectedCallback(
    ) {
        if (this.hasAttribute('spending-amount')) {
            this.shadowRoot.querySelector('section[class="spending-amount"]').innerHTML=this.getAttribute('spending-amount');
        }
        if (this.hasAttribute('height')) {
            this.shadowRoot.querySelector('section[class="spending-bar"]').height=this.getAttribute('height');
            
        }
        let html=""
      fetch('data.json').then((response) => {
        response.text().then((response) => {
          return JSON.parse(response);
        }).then(data => {
          data.forEach(element => {
            html += `
            <spending-bar-component
                spending-amount = "${element.amount}"
                height = "${element.day}"
            >
            </spending-bar-component>
      `
          }); 
          this.shadowRoot.querySelector('slot[name="spending-bars"]').innerHTML = html;
  
        }
        )
  
      });
    }
        static get observedAttributes() {
            return [
              ];
        }
    
    }
    
    if (!customElements.get("spending-card-component")) {
        customElements.define("spending-card-component", SpendingCardComponent);
    }