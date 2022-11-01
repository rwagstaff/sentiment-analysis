import {attr, css, customElement, FASTElement, html, observable, when} from "@microsoft/fast-element";
import {IChat, IChatMessage, removeStyleTag} from "./chat";
import {IChartData} from "./chart-utils";
import {calcMessageSummary} from "./chat-summary";
import {groupByPerson} from "./text-handler";
import {classifyByPerson, IPersonTotal} from "./chat-analysis";

const template = html<AnalysisComponent>`
    ${when(x => x.loading, html<AnalysisComponent>`
        <app-spinner></app-spinner>`)}
    <app-header></app-header>

    <main>
        ${when(x => x.ready, html<AnalysisComponent>`
                    <app-chat-summary noOfMessages="${x => x.noOfMessages}" groupName="${x => x.groupName}"
                                      groupDate="${x => x.groupDate}"
                                      :chartData="${x => x.chartData}"></app-chat-summary>
                    <app-chat-sentiment :chartData="${x => x.sentimentData}"></app-chat-sentiment>
                `
        )}

    </main>
`;

const styles = removeStyleTag(`
<style>

.upload-toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}


</style>
`)


@customElement({
  name: 'app-analysis',
  template,
  styles: css`${styles}`
})
export class AnalysisComponent extends FASTElement {

  @observable chats: Array<IChatMessage> = [];
  @attr ready: boolean = false;
  @attr groupName: string;
  @attr groupDate: string;
  @attr loading: boolean;

  noOfMessages: number;
  chartData: Array<IChartData>;
  groupedData: Map<string, Array<IChatMessage>>;
  personData: IPersonTotal[]

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('upload-file', async (e: CustomEvent) => {

      const chat = e.detail as IChat;
      this.chats = chat.messages;
      this.groupName = chat.groupMessage.personName;
      this.groupDate = chat.groupMessage.date;
      this.groupedData = groupByPerson(this.chats);
      this.personData = await classifyByPerson(this.groupedData);
      this.noOfMessages = this.chats.length;
      this.chartData = calcMessageSummary(this.groupedData, this.noOfMessages);
      this.ready = true;
      this.loading = false;
    }, false);

    this.addEventListener('uploading', () => {
      this.loading = true;
    });

    this.addEventListener('clear-results', () => {
      this.clearResults();
    })
  }

  clearResults() {
    this.chats = null;
    this.groupDate = null;
    this.groupName = null;
    this.noOfMessages = null;
    this.chartData = null;
    this.loading = false;
    this.ready = false;
    this.groupedData = null;
  }


}
