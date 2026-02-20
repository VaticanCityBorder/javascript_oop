import { Manager } from "./manager.js";

class FormController {
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormField[]}
     */
    #formFieldList;

    /**
     * @param {FormFieldType[]} formFieldList
     * @param {Manager} manager
     */
    constructor(formFieldList, manager) {
        this.#manager = manager;

        const form = document.createElement("form");
        document.body.appendChild(form);

        this.#formFieldList = [];

        for (const field of formFieldList) {
            const formField = new FormField(
                field.id,
                field.name,
                field.label,
                field.required,
                form
            );
            this.#formFieldList.push(formField);
        }

        const button = document.createElement("button");
        button.innerText = "Küldés";
        form.appendChild(button);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const elem = this.#createElement();
            if (elem) {
                this.#manager.addElement(elem);
                e.target.reset();
            }
        });
    }

    #createElement() {
        let result = [];
        let valid = true;

        for (const input of this.#formFieldList) {
            if (input.validate()) {
                result[input.name] = input.value;
            } else {
                valid = false;
            }
        }

        return valid ? result : null;
    }
}

class FormField {
    #input;
    #name;
    #required;
    #errorDiv;

    get value() {
        return this.#input.value ? this.#input.value : undefined;
    }

    get name() {
        return this.#name;
    }

    constructor(id, name, labelContent, required, parent) {
        const div = document.createElement("div");
        parent.appendChild(div);

        const label = document.createElement("label");
        label.innerText = labelContent;
        label.htmlFor = id;
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = id;
        input.name = name;
        div.appendChild(input);

        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error");
        div.appendChild(errorDiv);

        this.#input = input;
        this.#name = name;
        this.#required = required;
        this.#errorDiv = errorDiv;
    }

    validate() {
        let valid = true;

        if (this.#required && !this.value) {
            this.#errorDiv.innerText = "Kötelező";
            valid = false;
        } else {
            this.#errorDiv.innerText = "";
        }

        return valid;
    }
}

export { FormController };