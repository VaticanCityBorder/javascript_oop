import { createRadioButton } from "./gomszab.min.js";
import { ViewElement } from "./viewElement.js";

class NavigationBar extends ViewElement {
    /**
     * @type {ViewElement[]}
     */
    #viewElementList; // privát tulajdonság ami tartalmazza a navigációs sávhoz tartozó ViewElement leszármazottjait

    constructor() { // konstruktor definíció
        super("navbar"); // meghívjuk a szülőosztály konstruktorát, és átadjuk neki a "navbar" stringet, ami az id lesz
        this.#viewElementList = [];
        this.div.addEventListener("change", (e) => { // feliratkozunk a div change eseményére (mivel a div rádiógombokat tartalmaz, így amikor egy rádiógomb értéke megváltozik, ez az esemény bekövetkezik)
            const radioButtonValue = e.target.value;
            this.activate(radioButtonValue); // meghívjuk az activate függvényt a rádiógomb értékével, így megjelenik a megfelelő ViewElement
        })
    }
    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement) { // függvény definíció, ami hozzáad egy ViewElement-et a navigációs sávhoz
        this.#viewElementList.push(viewElement);
        const div = createRadioButton({ id: viewElement.id, name: this.id, label });
        this.div.appendChild(div);
    }

    /**
     * @override
     * @param {string} value 
     */
    activate(value) { // felülírjuk a szülőosztály activate függvényét, hogy a navigációs sávhoz tartozó ViewElement-eket kezelje
        for (const viewElement of this.#viewElementList) { // veégigiterálunk a ViewElement-ek listáján (table, form, importexport)
            viewElement.activate(value); // meghívjuk mindegyik ViewElement activate függvényét a bemeneti értékkel, így csak az a ViewElement jelenik meg, aminek az id-je megegyezik a bemeneti értékkel
        }
        this.div.querySelector(`#${value}`).checked = true; // a dive nbelül lekérjük a bemeneti paraméterrel megegyező id-jű elemet, és beállítjuk a checked tulajdonságát true-ra, így a rádiógomb megjelenik kiválasztottnak
    }
}

export { NavigationBar };
