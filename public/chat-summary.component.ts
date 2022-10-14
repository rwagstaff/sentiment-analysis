import {customElement, FASTElement, html, observable} from "@microsoft/fast-element";
import {IChatMessage} from "./text-handler";

const template = html<ChatSummaryComponent>`
    <section>
        <h4>Messages sent: ${x => 'hello'}</h4>
    </section>
`;


@customElement({
  name: 'app-chat-summary',
  template,
})
export class ChatSummaryComponent extends FASTElement {

  chats: Array<IChatMessage>

  connectedCallback() {
    super.connectedCallback();
    console.log(this.chats);
  }


}
