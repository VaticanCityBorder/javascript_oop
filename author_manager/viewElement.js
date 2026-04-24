/**
 * @callback ActivateCallback
 * @returns {void}
 */

import { show, hide } from "./gomszab.min.js";
class ViewElement { // Ősosztály a megjelenítendő elemeknek
    /**
     * @type {HTMLDivElement}
     */
    #div; // példányosításkor létrehozunk egy div elemet

    /**
     * @type {string}
     */
    #id; // privát tulajdonság az osztáy példányainak

    /**
     * @type {ActivateCallback}
     */
    #activateCallback; // akkor fut le, amikor megjelenik az elem a képernyőn

    get div() { // getter a div elemhez
        return this.#div; // visszatér a privát div elemmel
    }

    get id() { // getter az id-hez (navigációkor használatos)
        return this.#id;
    }

    /**
     * @param {ActivateCallback} value
     */
    set activateCallback(value) { // setter az activateCallback-hez
        this.#activateCallback = value; // beállítja az activateCallbacknek a bemeneti értékét
    }

    /**
     * @param {string} id 
     */
    constructor(id) { // kunstruktor, bemeteni azonosítóval
        this.#id = id; // azonosító beállítása
        this.#div = document.createElement("div");
        this.#div.id = id;
    }

    /**
     * @param {HTMLElement} parent 
     */
    appendTo(parent) { // definiálunk egy függvényt a példánynak a bemeneti paraméter egy html elem
        parent.appendChild(this.#div); // a html elemhez hozzácsatoljuk a div tulajdonságot, így megjelenik a képernyőn (lásd: konstruktor)
    }

    /**
     * @param {string} id 
     */
    activate(id) { // függvényt definiálunk a példányoknak
        if (this.#id === id) { // összehasonlítjuk a bemeneti id-t a példány id-jével, ha megegyezik, akkor megjelenítjük a div-et
            show(this.#div); // a divtől elveszi a hidden css osztályt, így megjelenik a képernyőn
            if (this.#activateCallback) { // ha van activateCallback, akkor meghívjuk
                this.#activateCallback();
            }
        }
        else {
            hide(this.#div); // ha nincs egyezés, akkor a div-hez hozzáadja a hidden css osztályt, így eltűnik a képernyőről
        }
    }
}

export { ViewElement }; // exportáljuk a ViewElement osztályt
