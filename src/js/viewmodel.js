import AppTitulo from "./customElements/appTituloElement.js";
export default class ViewModel {
    appTituloElement = document.querySelector("app-titulo");
    alterarTitutlo = document.querySelector("button");
    constructor() {
        customElements.define("app-titulo", AppTitulo);
        // Opção 1
        this.appTituloElement.addEventListener("acao", () => alert("Opção 1"));
        //Opção 2
        this.appTituloElement.onacao = () => alert("Opção 2");
        this.alterarTitutlo.onclick = () => {
            if (this.appTituloElement.titulo == "Custom Element")
                this.appTituloElement.titulo = "Titulo Alternado";
            else
                this.appTituloElement.titulo = "Custom Element";
        };
    }
}
//# sourceMappingURL=viewmodel.js.map