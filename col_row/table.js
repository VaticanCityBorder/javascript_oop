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
import { Manager } from "./manager.js";

/**
 * @callback tableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType|RowspanType} type
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

        for (const item of headerArray) {
            const th = document.createElement("th");
            th.innerText = item.name;
            headerRow.appendChild(th);
            if (item.colspan) th.colSpan = 2;
        }

        this.#tbody = document.createElement("tbody");
        table.appendChild(this.#tbody);
    }

    setAppendRow(callback) {
        this.#manager.addCallback = (elem) => {
            callback(this.#tbody, elem);
        };
    }
}

export { Table };