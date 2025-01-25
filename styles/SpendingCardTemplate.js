export default class SpendingCardComponent extends HTMLElement {
  #internals;
  constructor() {
    super();
    this.#internals = this.attachInternals()
  }
  connectedCallback(
  ) {

    let html = ""
    fetch('data.json').then((response) => {
      response.text().then((response) => {
        return JSON.parse(response);
      }).then(data => {
        let dailyAmounts = []
        data.forEach(element => dailyAmounts.push(element.amount));
        let max = Math.max(...dailyAmounts);
        let barChartConainerHeight = this.getHeightOfBarChartContainer();
        data.forEach(element => {
          const barColor = element.amount == max ? "var(--cyan)" : "var(--soft-red)";
          html += `
            <spending-bar-component
                spending-amount = "$${element.amount}"
                height = "${(element.amount / (max * 2)) * barChartConainerHeight}px"
                bar-color="${barColor}",
                day="${element.day}"
            >
            </spending-bar-component>
      `
        });
        this.shadowRoot.querySelector('slot[name="spending-bars"]').innerHTML = html;
      }
      )

    });
  }
  getHeightOfBarChartContainer = () => {
    return this.#internals.shadowRoot.querySelector('section[class="spending-bars"]').clientHeight;
  }
  static get observedAttributes() {
    return [
    ];
  }

}

if (!customElements.get("spending-card-component")) {
  customElements.define("spending-card-component", SpendingCardComponent);
}