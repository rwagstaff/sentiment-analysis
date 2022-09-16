import {attr, observable, css, customElement, FASTElement, html} from '@microsoft/fast-element';

const template = html<HeaderComponent>`
    <div class="header">
        <h3>Sentiment Analysis</h3>
        <h4>Please upload a ${x => x.appName} export file then press the analyse button</h4>
        <fast-divider></fast-divider>
    </div>
`;

const styles = `
<style>
  :host {
  background-color: yellow;
  }
  
  .header {
    margin: 1rem;
    position: relative;
   /*// background-color: blue;*/
  }
  </style>
`

@customElement({
    name: 'app-header',
    template,
    styles: css`${styles}`
})
export class HeaderComponent extends FASTElement {
    @attr appName: string = 'WhatsApp';
}

//FASTElement.define(HeaderComponent);
