import {attr, observable, css, customElement, FASTElement, html} from '@microsoft/fast-element';
import {removeStyleTag} from "./chat";

const template = html<HeaderComponent>`

    <header>
        <div>
            <h3>Sentiment Analysis</h3>
            <h4>Please upload a ${x => x.appName} export file then press the analyse button</h4>
        </div>
        <div class="upload-toolbar">
            <app-upload-file></app-upload-file>
            <fast-button appearance="accent" @click=${x => x.clearEvent()}>Clear Results</fast-button>
        </div>
    </header>
    <fast-divider></fast-divider>

`;

const styles = removeStyleTag(`
<style>
  
  header {
  display: flex;
  justify-content: space-between;
  }
  </style>
`)

@customElement({
  name: 'app-header',
  template,
  styles: css`${styles}`
})
export class HeaderComponent extends FASTElement {
  @attr appName: string = 'WhatsApp';

  clearEvent() {
    this.dispatchEvent(new CustomEvent('clear-results', {bubbles: true, composed: true}));
  }
}
