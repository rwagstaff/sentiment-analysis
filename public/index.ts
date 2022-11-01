import * as tf from '@tensorflow/tfjs-core'
import {HelloWorld} from "./hello-world.component";
import {UploadFileComponent} from "./upload-file.component";
import {fastButton, fastCard, fastDivider, fastToolbar, provideFASTDesignSystem} from "@microsoft/fast-components";
import {HeaderComponent} from "./header.component";
import {AnalysisComponent} from "./analysis.component";
import {ChatSummaryComponent} from "./chat-summary.component";
import {SpinnerComponent} from "./spinner.component";
import {ChatSentimentComponent} from "./chat-sentiment.component";


provideFASTDesignSystem()
  .register(
    fastButton(),
    fastDivider(),
    fastToolbar(),
    fastCard(),
    AnalysisComponent,
    ChatSummaryComponent,
    ChatSentimentComponent,
    HeaderComponent,
    SpinnerComponent,
    UploadFileComponent,
  );

console.log(tf);

console.log("Hello World!");

// make sure that the <hello-world></hello-world>
// or simply <hello-world /> is recognised as this element

window.customElements.define("hello-world", HelloWorld);

