import { createInputAndErrorDiv } from "./gomszab.min.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement{
    
    #formInputList;
    #manager;
    #form;
    
    /**
     * 
     * @param {string} id 
     * @param {} formFieldList
     * @param {AutorManager} manager
     */
    constructor(id, formFieldList, manager){
        super(id);
        this.#manager = manager;
        this.#formInputList = [];
        const form = document.createElement("form");
        for (const field of formFieldList) {
            const formField = new FormField(field.id, field.label, field.name, form);
            this.#formInputList.push(formField);
        }
        const button = document.createElement("button");
        button.innerText = "Küldés";
        form.appendChild(button);
        const resultDiv = document.createElement("div");
        this.div.appendChild(resultDiv);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const elem = this.#createElement();
            this.#manager.addElement();
        })
        this.div.appendChild(form);
        this.#manager.addElementResultCallback = (result) => {
            resultDiv.innerText = result;
            setTimeout(() => {
                resultDiv.innerText = "";
            }, 1500)
        }
    }

    #createElement() {
        let result = {};
        for (const field of this.#formInputList) {
            if (field.validate()) {
                result[field.name] = field.value;
            }
        }
        return result;
    }
}

export {FormView}

class FormField {
    #inputElement;
    #errorDiv;
    #name;

    get name() {
        return this.#name;
    }

    get value() {
        return this.#inputElement.value ? this.#inputElement.value : undefined;
    }

    constructor(id, label, name, parent) {
        const {input, errorDiv} = createInputAndErrorDiv({id, label, name, parent});
    }

    validate() {
        let result = true;
        if (!this.value) {
            this.#errorDiv.innerText = "Mező kitöltése kötelező";
            result = false
        }
        else {
            this.#errorDiv
        }
    }

}