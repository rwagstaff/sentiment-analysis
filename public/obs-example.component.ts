import {attr, observable, css, customElement, FASTElement, html, repeat} from '@microsoft/fast-element';

const template = html<ObsExampleComponent>`
    <ul>
        ${repeat(x => x.exampleArr, html<string>`
            <li>${x => x}</li>
        `)}
    </ul>
`;


@customElement({
    name: 'app-obs-example',
    template,
})
export class ObsExampleComponent extends FASTElement {
    @observable exampleArr: number[] = [];

    connectedCallback() {
        super.connectedCallback();
        console.log('name-tag is now connected to the DOM');
        setInterval(() => {
            this.exampleArr.push(this.exampleArr.length)
        }, 5000)
    }
}

// FASTElement.define(HeaderComponent);
