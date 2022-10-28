import {customElement, FASTElement, html, observable, when} from "@microsoft/fast-element";
import {IChatMessage} from "./chat";
import {IChartData} from "./chart-utils";
import {calcMessageSummary} from "./chat-summary";
import {groupByPerson} from "./text-handler";

const template = html<AnalysisComponent>`
    <main>
        <div class="d-flex" style="justify-content: space-between">
            <div style="width: 50%">
                <app-upload-file></app-upload-file>
            </div>
            <fast-button>Clear Results</fast-button>
        </div>

        ${when(x => x.ready, html<AnalysisComponent>`
            <app-chat-summary noOfMessages="${x => x.noOfMessages}"
                              :chartData="${x => x.chartData}"></app-chat-summary>`)}

        ${when(x => !x.ready, html<AnalysisComponent>`
            Loading...
        `)}
    </main>
`;


@customElement({
  name: 'app-analysis',
  template,
})
export class AnalysisComponent extends FASTElement {

  @observable chats: IChatMessage[] = [];
  @observable ready: boolean = false;

  noOfMessages: number;
  chartData: Array<IChartData>;
  groupedData: Map<string, IChatMessage[]>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('upload-file', (e: CustomEvent) => {
      console.log('hello' + e.detail.length);
      this.chats = e.detail
      this.groupedData = groupByPerson(this.chats);
      this.noOfMessages = this.chats.length;
      this.chartData = calcMessageSummary(this.groupedData, this.noOfMessages);
      this.ready = true;
    }, false);

  }

}
