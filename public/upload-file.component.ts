export class UploadFileComponent extends HTMLElement {
    constructor() {
        super();

        // const template = document.getElementById('upload-file') as any;
        // const templateContent = template.content;
        //
        // this.attachShadow({mode: 'open'}).appendChild(
        //     templateContent.cloneNode(true)
        // );

        // const input = document.getElementById('upload-file-input');
        // input.onchange = (e) => {
        //     console.log(e);
        //     console.log('File Change');
        // }
    }

    connectedCallback() {
        this.innerHTML = `<div class="d-flex">
        <input type="file" id="upload-file-input" name="upload-file-input" accept="text/plain">
        <fast-button>Upload3</fast-button>
    </div>`
        const input = document.getElementById('upload-file-input');
        input.addEventListener("change", handleFiles, false);
        // input.onchange = (e) => {
        //     console.log(e);
        //     console.log('File Change');
        // }
    }

}

function handleFiles() {
    const file = this.files[0] as File;
    file.text().then(value => {
        console.log(value)
    })
}
