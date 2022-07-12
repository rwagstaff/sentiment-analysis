import {attr, css, customElement, FASTElement, html} from '@microsoft/fast-element';

const template = html<HeaderComponent>`
    <div class="header">
        <h3>Sentiment Analysis</h3>
        <h4>Please upload a WhatsApp export file then press the analyse button</h4>
    </div>
    <fast-divider></fast-divider>
`;

@customElement({
    name: 'app-header',
    template,
    styles: css`
 

  :host(.header) {
  background-color: yellow;
  }
  
  .header {
   background-color: pink;
  }
    
    
`
})
export class HeaderComponent extends FASTElement {
    @attr greeting: string = 'Hello';
}
