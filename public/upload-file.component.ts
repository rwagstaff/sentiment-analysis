import {css, customElement, FASTElement, html} from "@microsoft/fast-element";
import {parseFileText, uploadFileId} from "./text-handler";


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

  connectedCallback() {
    super.connectedCallback();
    const input = this.shadowRoot.getElementById(uploadFileId);
    input.addEventListener("change", handleFiles, false);
  }

}

function handleFiles() {
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




