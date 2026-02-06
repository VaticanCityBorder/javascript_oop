import { Manager } from "./manager.js";
import("functions.js").HeaderArrayType;

/**
 * @callback tableCallback
 * @param {HTMLTableSectionElement}
 * @param {ColspanType|RowspanType}
 * @returns {void}
 */

class Table {
    #tbody;
    #manager;

    /**
     * @param {HeaderArrayType} headerArray
     * @param {Manager} manager
     */
    constructor(headerArray, manager) {
        this.#manager = manager;
        
        const table = document.createElement("table");
        document.body.appendChild(table);

        const thead = document.createElement("thead");
        table.appendChild(thead);
        
        const headerRow = document.createElement("tr");
        thead.appendChild(headerRow);

        this.#tbody = document.createElement("tbody");
        table.appendChild(this.#tbody);


        
    }

    /**
     * @param {tableCallback} callback
     */
    setAppendRow(callback) {
        this.#manager.addCallback = (elem) => {
            callback(this.#tbody, elem)
        }
    }
}
