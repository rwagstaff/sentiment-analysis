import {css, customElement, FASTElement, html, observable} from "@microsoft/fast-element";
import {IChartData, initBarChart} from "./chart-utils";
import {removeStyleTag} from "./chat";


const template = html<ChatSentimentComponent>`

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
  name: 'app-chat-sentiment',
  template,
  styles: css`${styles}`
})
export class ChatSentimentComponent extends FASTElement {

  @observable chartData: Array<IChartData>

  connectedCallback() {
    super.connectedCallback();
    const elem = this.shadowRoot.getElementById('container')
    initBarChart(this.chartData, elem);
  }


}
