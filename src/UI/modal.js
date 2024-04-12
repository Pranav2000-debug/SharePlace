export class Modal {
    constructor(contentId, fallbackText) {
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
        this.fallbackText = this.fallbackText
    }

    show() {
        if('content' in document.createElement('template')) {
            const modalElements = document.importNode(this.modalTemplateEl.content, true);
            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');
            const contentElemenet = document.importNode(this.contentTemplateEl.content, true);

            this.modalElement.appendChild(contentElemenet);
            document.body.insertAdjacentElement('afterbegin', this.modalElement);
            document.body.insertAdjacentElement('afterbegin', this.backdropElement);

        } else {
            // fallback code
            alert(this.fallbackText);
        }
    }

    hide() {
        if(this.modalElement){
            document.body.removeChild(this.modalElement);
            document.body.removeChild(this.backdropElement);
            this.modalElement = null;
            this.backdropElement = null;
        }   
    }
 }