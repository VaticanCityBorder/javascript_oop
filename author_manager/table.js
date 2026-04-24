import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement { // táblázatot tartalmazó viewElemet definiálása ViewWlementből származtatva

    /**
     * @type {AuthorManager}
     */
    #manager; // privát tulajdonság a managernek

    /**
     * @type {HTMLTableElement}
     */
    #tbody; // a tbody-t tároló privát tulajdonság

    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray
     * @param {AuthorManager} manager
     */
    constructor(id, headerArray, manager) {
        super(id); // szülőosztály konstruktorának meghívása
        this.#manager = manager; // a manager értékének beállítása a bemeneti paraméterrel
        const table = document.createElement("table"); // létrehozunk egy táblázatot
        this.div.appendChild(table); // hozzáscsatoljuk a div-hez
        const thead = createTableHeader(headerArray); // létrehozzuk a táblázat fejléceit a bemeneti tömb alapján
        table.appendChild(thead); // hozzácsatoljuk a táblázathoz a thead-et
        this.#tbody = document.createElement("tbody"); // létrehozzuk a tbody-t
        table.appendChild(this.#tbody); // hozzácsatoljuk a táblázathoz a tbody-t
        this.#manager.TableCallback = (authorList) => { // definiáljuk a manager tablecallback-jét (a setter megívásával lásd AuthorManager.tableCallback)
            if (authorList.length == 0) { // ha a lista üres
                const tr = document.createElement("tr"); // létrehozunk egy új sort
                this.#tbody.appendChild(tr); // hozzácsatoljuk a tbody-hoz
                const td = createTableCell(tr, "Nincs megjelenítendő sor"); // létrehozunk egy új cellát a sorban, és beállítjuk a szövegét
                td.colSpan = 3; // kiterjesztjük a cellát három oszlopra
            } // ezt bele lehetne tenni else ágba
            for (const author of authorList) { // végigiterálunk az author listán
                const tr = document.createElement("tr"); // létrehozunk egy sort
                this.#tbody.appendChild(tr); // hozzácsatoljuk a tbody-hoz

                createTableCell(tr, author.name); // létrehozunk egy cellát a sorhoz az author nevével
                createTableCell(tr, author.work); // létrehozunk egy cellát a sorhoz az author workjével
                createTableCell(tr, author.concept); // létrehozunk egy cellát a sorhoz az author conceptjével
            }
        }
        this.activateCallback = () => { // definiáljuk az activate callbacket
            this.#tbody.innerHTML = ""; // töröljük a tbody tartalmát
            this.#manager.getAllElement(); // meghívjuk a manager getAllElementjét (ami meghívja a tablecallback-et) lásd AuthorManager.getAllElement
        }
    }
}

export { TableView } // exportáljuk a TableView osztályt
