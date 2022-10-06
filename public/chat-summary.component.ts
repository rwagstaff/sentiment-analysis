import {attr, css, customElement, FASTElement, html, observable} from "@microsoft/fast-element";
import {IChatMessage, parseFileText} from "./text-handler";

const template = html<ChatSummaryComponent>`
    <section>
        <h4>Messages sent: ${x => x.noOfMessages}</h4>
    </section>
`;


@customElement({
  name: 'app-chat-summary',
  template,
})
export class ChatSummaryComponent extends FASTElement {

  @attr noOfMessages: number;


  connectedCallback() {
    super.connectedCallback();
  }

}
