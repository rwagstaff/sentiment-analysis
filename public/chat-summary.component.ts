import {attr, css, customElement, FASTElement, html, observable} from "@microsoft/fast-element";
import {IChartData, initPieChart} from "./chart-utils";
import {removeStyleTag} from "./chat";


const template = html<ChatSummaryComponent>`
    <section class="chat-summary">
        <div>
            <h1>${x => x.groupName}</h1>
            <h4>Messages sent: ${x => x.noOfMessages} from ${x => x.groupDate}</h4>
        </div>
    </section>
    <div id="container"></div>
`;

const styles = removeStyleTag(`
<style>

.chat-summary {
display: flex;
justify-content: center;
}

</style>
`)


@customElement({
  name: 'app-chat-summary',
  template,
  styles: css`${styles}`
})
export class ChatSummaryComponent extends FASTElement {

  @observable chartData: Array<IChartData>

  @attr noOfMessages: number;

  @attr groupName: number;
  @attr groupDate: string;

  connectedCallback() {
    super.connectedCallback();
    const elem = this.shadowRoot.getElementById('container')
    initPieChart(this.chartData, elem)
  }


}
