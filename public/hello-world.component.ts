const template = document.createElement('template');
template.innerHTML = `
<style>
p {
color: red;
}

)
</style>
<p>Hello World</p>`;

export class HelloWorld extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

}


