class Card extends HTMLElement {
    textCard = "";
    myClass = "";
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.myClass = this.getAttribute('myClasse');

    }
    connectedCallback(){
        this.render();
    }

    static get observedAttributes(){
        return ['myClasse'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log('attributeChangedCallback', name, oldValue, newValue);
        this.myClass = newValue;
        this.render();
    }

    render(){
        const{shadowRoot} = this;
        shadowRoot.innerHTML="";
        shadowRoot.appendChild(this.htmlToElement().content); 
    }

    htmlToElement(){
        const classCard = this.myClass ? `myClass = "${this.myClass}"` : "a"; 
        console.log('hola',this.myClass)
        const html = `
            <div class=${classCard}>
                <slot name="text-card">${this.textCard}</slot>
            </div>
        
        `
        const template = document.createElement('template');
        template.innerHTML = html;
        return template



    }
}
window.customElements.define('card-component', Card)