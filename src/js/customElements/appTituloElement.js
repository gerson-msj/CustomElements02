export default class AppTitulo extends HTMLElement {
    static observedAttributes = ["titulo", "botao"];
    _titulo = null;
    _botao = null;
    get titulo() { return this.getAttribute(AppTitulo.observedAttributes[0]) ?? ""; }
    set titulo(v) { this.setAttribute(AppTitulo.observedAttributes[0], v); }
    get botao() { return this.getAttribute(AppTitulo.observedAttributes[1]) ?? ""; }
    set botao(v) { this.setAttribute(AppTitulo.observedAttributes[1], v); }
    onacao = () => { };
    shadow = this.attachShadow({ mode: "closed" });
    tituloElement = null;
    botaoElement = null;
    constructor() {
        super();
    }
    async connectedCallback() {
        await this.initializeElement();
        if (this.botaoElement)
            this.botaoElement.onclick = () => {
                this.dispatchEvent(new Event("acao"));
                this.onacao();
            };
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === AppTitulo.observedAttributes[0]) {
            this._titulo = newValue;
            if (this.tituloElement)
                this.tituloElement.innerText = this._titulo;
        }
        if (name === AppTitulo.observedAttributes[1]) {
            this._botao = newValue;
            if (this.botaoElement)
                this.botaoElement.innerText = this._botao;
        }
    }
    async initializeElement() {
        const requestStyle = await fetch('./customElements/appTituloElementStyle.css');
        const style = await requestStyle.text();
        const sheet = new CSSStyleSheet();
        await sheet.replace(style);
        this.shadow.adoptedStyleSheets = [sheet];
        const requestModel = await fetch('./customElements/appTituloElementModel.html');
        const model = await requestModel.text();
        const modelTemplate = document.createElement("div");
        modelTemplate.innerHTML = model;
        const template = modelTemplate.querySelector("template");
        this.shadow.appendChild(template.content.cloneNode(true));
        this.tituloElement = this.shadow.querySelector("h1");
        this.botaoElement = this.shadow.querySelector("button");
        if (this._titulo && this.tituloElement)
            this.tituloElement.innerText = this._titulo;
        if (this._botao && this.botaoElement)
            this.botaoElement.innerText = this._botao;
    }
}
//# sourceMappingURL=appTituloElement.js.map