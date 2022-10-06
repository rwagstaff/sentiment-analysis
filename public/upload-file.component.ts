import {css, customElement, FASTElement, html} from "@microsoft/fast-element";
import {IChatMessage, parseFileText} from "./text-handler";

const uploadFileId = "upload-file-input"


const template = html<UploadFileComponent>`
    <div class="d-flex">
        Upload File
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

  chatMessages: Array<IChatMessage>

  connectedCallback() {
    super.connectedCallback();
    const input = this.shadowRoot.getElementById(uploadFileId);
    input.addEventListener("change", handleFiles, false);
  }

}

function handleFiles() {
  const file = this.files[0] as File;
  file.text().then(value => {
    const lines = parseFileText(value);

  })
}


