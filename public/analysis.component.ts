import {customElement, FASTElement, html, observable, when, Observable} from "@microsoft/fast-element";
import {IChatMessage, uploadFileId} from "./text-handler";

const template = html<AnalysisComponent>`
    <main>
        <div class="d-flex" style="justify-content: space-between">
            <div style="width: 50%">
                <app-upload-file :chats="${x => x.chats}"></app-upload-file>
            </div>
            <fast-button>Clear Results</fast-button>
        </div>

        ${when(x => x.ready, html<AnalysisComponent>`
            <app-chat-summary :chats="${x => x.chats}"></app-chat-summary>`)}

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

  @observable chats: Array<IChatMessage> = [];
  @observable ready: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('upload-file', (e: CustomEvent) => {
      console.log('hello' + e.detail.length);
      this.chats = e.detail
    }, false);

    setTimeout(() => {
      console.log('pushed');
      this.chats.push({
        date: '2017-11-19T21:10:34',
        personName: 'Mr Smith',
        sentence: `Im going to use a special character
    [ in my message.`
      })
      this.ready = true;
    }, 5000)


  }

}
