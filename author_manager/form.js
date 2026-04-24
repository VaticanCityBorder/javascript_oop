import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement { // leszármaztatjuk a ViewElementből a FormView-t

    /**
     * @type {FormField[]}
     */
    #formInputList;

    /**
     * @type {AuthorManager}
     */
    #manager; // létrehozunk egy manager privát tulajdonságot

    /**
     * @type {HTMLFormElement}
     */
    #form; // létrehozunk egy form privát tulajdonságot

    /**
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} formFieldList
     * @param {AuthorManager} manager
     */
    constructor(id, formFieldList, manager) { // definiálunk egy konstruktort
        super(id); // meghívjuk a szülőosztály konstruktorát
        this.#manager = manager; // beállítjuk a manager értékét a konstruktorban kapott managerre
        this.#formInputList = []; // inicializáljuk a formInputList-et egy üres tömbbel
        const form = document.createElement("form"); // létrehozunk egy form elemet
        for (const field of formFieldList) { // végigmegyünk a formfieldlisten
            const formField = new FormField(field.id, field.label, field.name, form); // létrehozunk egy FormField példányt
            this.#formInputList.push(formField); // hozzáadjuk a formInputListhez
        }
        const button = document.createElement("button"); // létrehozunk egy buttont
        button.innerText = "Küldés"; // beállítjuk a button szövegét
        form.appendChild(button); // hozzáadjuk a formhoz a gombot
        const resultDiv = document.createElement("div"); // létrehozunk egy divet amiben megjelenítjük
        this.div.appendChild(resultDiv); // hozzáadjuk a viewElemet divhez a resultDivet

        form.addEventListener("submit", (e) => { // feliratkozunk a form submit eseményére
            e.preventDefault(); // megakadályozzuk a form alapértelmezett működését
            const elem = this.createElement(); // létrehozzuk az elemet a form adatai alapján
            this.#manager.addElement(elem); // hozzáadjuk az elemet a managerhez
        });
        this.div.appendChild(form);
        this.#manager.addElementResultCallback = (result) => { // definiáljuk az addElementResultCallbacket (Az AuthorManager.addElement hívja a callbacket)
            resultDiv.innerText = result; // beállítjuk a resultDiv szövegét a callback eredményére
            setTimeout(() => { // meghívjuk a setTimeoutot
                resultDiv.innerText = ""; // töröljük a resultDiv szövegét
            }, 1500); // másfél m másodperc múlva
        }
    }

    /**
     * @returns {import("./index.js").AuthorType}
     */
    createElement() { // definiálunk egy createElement függvényts
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result = {}; // létrehozunk egy üres objektumot
        for (const field of this.#formInputList) { // végigmegyünk a formInputList-en
            if (field.validate()) { // meghívjuk minden formInputra a validate függvényt
                result[field.name] = field.value; // amennyiben a validate true-t ad vissza akkor a result objektum field.name tulajdonságát beállítjuk field.value-ra
            }
        }
        return result; // visszatérünk a result objektummal
    }
}

class FormField {
    /**
     * @type {HTMLInputElement}
     */
    #inputElement; // definiálunk egy inputElement privát tulajdonságot

    /**
     * @type {HTMLDivElement}
     */
    #errorDiv; // definiálunk egy errorDiv privát tulajdonságot

    /**
     * @type {string}
     */
    #name; // definiálunk egy name privát tulajdonságot

    get name() { // definiálunk egy gettert a name-nek
        return this.#name; // visszatérünk a name értékével
    }

    get value() { // definiálunk egy gettert a value-nak
        return this.#inputElement.value ? this.#inputElement.value : undefined; // amannyiben az inputElement értéke nem üres akkor visszaadjuk azt egyébként undefined
    }

    /**
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent) { // definiálunk egy konstruktort
        const { input, errorDiv } = createInputAndErrorDiv({ id, label, name, parent }); // létrehozunk divet ami tartalmaz egy labelt egy inputot és egy errorDivet
        this.#name = name; // beállítjuk a name tulajdonság értékét
        this.#inputElement = input; // a viszatérési érték input tulajdonságát beállítjuk az inputElement értékére
        this.#errorDiv = errorDiv; // a viszatérési érték errorDiv tulajdonságát beállítjuk az errorDiv értékére
    }

    /**
     * @returns {boolean}
     */
    validate() { // definiálunk egy validate függvényt
        let result = true; // létrehozunk egy result változót aminek az értéke true
        if (!this.value) { // amennyiben a value értéke üres akkor
            this.#errorDiv.innerText = "Mező kitöltése kötelező"; // az errorDiv szövegét beállítjuk egy hibaüzenetre
            result = false; // és a result értékét false-ra állítjuk
        }
        else { // egyébként
            this.#errorDiv.innerText = ""; // az errorDiv szövegét üresre állítjuk
        }
        return result;
    }
}

export { FormView } // exportáljuk a FormView-t
