import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement{

    /**
     * @type {AuthorManager}
     */
    #manager;

    /**
     * @type {HTMLTableElement}
     */
    #tbody;

    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray
     * @param {AuthorManager} manager
     */
    constructor(id, headerArray, manager){
        super(id);
        this.#manager = manager;
        const table = document.createElement("table");
        this.div.appendChild(table);
        const thead = createTableHeader(headerArray);
        table.appendChild(thead);
        this.#tbody = document.createElement("tbody");
        table.appendChild(this.#tbody);
        this.#manager.TableCallback = (authorList) => {
            if (authorList.length == 0) {
                const tr = document.createElement("tr");
                this.#tbody.appendChild(tr);
                const td = createTableCell(tr, "Nincs megjelenítendő sor");
                td.colSpan = 3;
            }
            for(const author of authorList){
                const tr = document.createElement("tr");
                this.#tbody.appendChild(tr);

                createTableCell(tr, author.name);
                createTableCell(tr, author.work);
                createTableCell(tr, author.concept);
            }
        }
        this.activateCallback = () => {
            this.#tbody.innerHTML = "";
            this.#manager.getAllElement();
        }
    }
}

export {TableView}