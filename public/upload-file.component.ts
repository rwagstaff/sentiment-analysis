import {css, customElement, FASTElement, html} from "@microsoft/fast-element";
import {IChatMessage, parseFileText, uploadFileId} from "./text-handler";


const template = html<UploadFileComponent>`
    <div class="d-flex">
        <span>Upload File</span>
        <input type="file" id="${uploadFileId}" accept="text/plain">
    </div>
`;

const styles = css`
<style>
  :host {
  contain: content;
  margin: 1rem;
  }

  </style>
`

@customElement({
  name: 'app-upload-file',
  template,
  styles
})
export class UploadFileComponent extends FASTElement {

  chats: IChatMessage[]

  connectedCallback() {
    console.log(this.chats)
    super.connectedCallback();
    const input = this.shadowRoot.getElementById(uploadFileId);
    input.addEventListener("change", handleFilesWrapper(this.chats), false);
  }

}

function handleFilesWrapper(chatMessages: IChatMessage[]) {

  return function handleFiles() {
    const file = this.files[0] as File;
    // User could have pressed cancel
    if (file) {
      file.text().then(value => {
        const items = parseFileText(value);
        console.log('Finished parsing ' + items.length + ' messages');
        this.dispatchEvent(new CustomEvent('upload-file', {detail: items, bubbles: true, composed: true}));
      })
    }


  }

}




