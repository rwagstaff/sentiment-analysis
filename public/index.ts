import * as tf from '@tensorflow/tfjs'
import {HelloWorld} from "./hello-world.component";
import {UploadFileComponent} from "./upload-file.component";
import {fastButton, fastDivider, provideFASTDesignSystem} from "@microsoft/fast-components";
import {HeaderComponent} from "./header.component";

provideFASTDesignSystem()
    .register(
        fastButton(),
        fastDivider(),
    );

console.log(tf);

console.log("Hello World!");

// make sure that the <hello-world></hello-world>
// or simply <hello-world /> is recognised as this element

window.customElements.define("hello-world", HelloWorld);
window.customElements.define("upload-file", UploadFileComponent);
window.customElements.define("app-header", HeaderComponent);

