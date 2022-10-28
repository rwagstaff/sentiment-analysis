import {attr, customElement, FASTElement, html, observable} from "@microsoft/fast-element";
import {IChartData, initPieChart} from "./chart-utils";


const template = html<ChatSummaryComponent>`
    <section>
        <h4>Messages sent: ${x => x.noOfMessages}</h4>
        <div id="container"></div>
    </section>
`;


@customElement({
  name: 'app-chat-summary',
  template,
})
export class ChatSummaryComponent extends FASTElement {

  @observable chartData: Array<IChartData>

  @attr noOfMessages: number;

  connectedCallback() {
    super.connectedCallback();
    console.log(this.chartData);
    const elem = this.shadowRoot.getElementById('container')
    initPieChart(this.chartData, elem)
  }


}
