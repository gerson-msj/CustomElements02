export default class AppTitulo extends HTMLElement {

    static observedAttributes = ["titulo", "botao"];

    private _titulo: string | null = null;
    private _botao: string | null = null;

    get titulo() { return this.getAttribute(AppTitulo.observedAttributes[0]) ?? ""; }
    set titulo(v: string) { this.setAttribute(AppTitulo.observedAttributes[0], v); }

    get botao() { return this.getAttribute(AppTitulo.observedAttributes[1]) ?? ""; }
    set botao(v: string) { this.setAttribute(AppTitulo.observedAttributes[1], v); }

    onacao = () => {};

    private shadow = this.attachShadow({ mode: "closed" });

    private tituloElement: HTMLHeadingElement | null = null;
    private botaoElement: HTMLButtonElement | null = null;

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.initializeElement();
        if (this.botaoElement) this.botaoElement.onclick = () => {
            this.dispatchEvent(new Event("acao"));
            this.onacao();
        };
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        if (name === AppTitulo.observedAttributes[0]) {
            this._titulo = newValue as string;
            if (this.tituloElement) this.tituloElement.innerText = this._titulo;
        }

        if (name === AppTitulo.observedAttributes[1]) {
            this._botao = newValue as string;
            if (this.botaoElement) this.botaoElement.innerText = this._botao;
        }
    }

    private async initializeElement() {
        const requestStyle = await fetch('./customElements/appTituloElementStyle.css');
        const style = await requestStyle.text();
        const sheet = new CSSStyleSheet();
        await sheet.replace(style);
        this.shadow.adoptedStyleSheets = [sheet];

        const requestModel = await fetch('./customElements/appTituloElementModel.html');
        const model = await requestModel.text();
        const modelTemplate = document.createElement("div");
        modelTemplate.innerHTML = model;
        const template = modelTemplate.querySelector("template") as HTMLTemplateElement;
        this.shadow.appendChild(template.content.cloneNode(true));

        this.tituloElement = this.shadow.querySelector("h1");
        this.botaoElement = this.shadow.querySelector("button");

        if (this._titulo && this.tituloElement) this.tituloElement.innerText = this._titulo;
        if (this._botao && this.botaoElement) this.botaoElement.innerText = this._botao;
    }



}