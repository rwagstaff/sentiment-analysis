import {css, customElement, FASTElement, html} from "@microsoft/fast-element";
import {parseFileText, uploadFileId} from "./text-handler";
import {removeStyleTag} from "./chat";


const template = html<UploadFileComponent>`
    <fast-button appearance="neutral" @click=${x => x.openDialog()}/>
        Upload
    </fast-button>
    <input id="${uploadFileId}" type='file' accept="text/plain" hidden/>
`;

const styles = removeStyleTag(`
<style>

  </style>
`)

@customElement({
  name: 'app-upload-file',
  template,
  styles: css`${styles}`
})
export class UploadFileComponent extends FASTElement {

  connectedCallback() {
    super.connectedCallback();
    const input = this.shadowRoot.getElementById(uploadFileId);
    input.addEventListener("change", handleFiles, false);
  }


  openDialog() {
    this.shadowRoot.getElementById(uploadFileId).click();
  }

}

function handleFiles() {
  this.dispatchEvent(new CustomEvent('uploading', {bubbles: true, composed: true}));
  const file = this.files[0] as File;
  // User could have pressed cancel
  if (file) {
    file.text().then(value => {
      const items = parseFileText(value);
      this.dispatchEvent(new CustomEvent('upload-file', {detail: items, bubbles: true, composed: true}));
    })
  }
}




