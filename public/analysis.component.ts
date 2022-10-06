import {customElement, FASTElement, html, observable, when} from "@microsoft/fast-element";
import {IChatMessage} from "./text-handler";

const template = html<AnalysisComponent>`
    <main>
        Analysis
        <app-upload-file chatMessages="${x => x.chatMessages}"></app-upload-file>
        ${when(x => x.chatMessages.length > 0, html<AnalysisComponent>`
            <app-chat-summary></app-chat-summary>`)}
    </main>
`;


@customElement({
  name: 'app-analysis',
  template,
})
export class AnalysisComponent extends FASTElement {

  @observable
  chatMessages: Array<IChatMessage> = [];

  connectedCallback() {
    super.connectedCallback();
  }

  chatLinesChanged() {
    console.log('hello')
  }

}
