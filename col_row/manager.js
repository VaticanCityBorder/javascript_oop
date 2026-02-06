/**
 * @import {functions.js}
 */

/**
 * @callback addCallback
 * @param {ColspanType|RowspanType} type
 */

class Manager {
    /**
     * @type {ColspanType[]|RowspanType[]}
     */
    #dataArray;

    /**
     * @type {addCallback}
     */
    #addCallback;


    constructor() {
        this.#dataArray = [];
    }

    /**
     * @param {RowspanType|ColspanType} element
     * @returns {void}
     */
    addElement(element) {
        this.#dataArray.push(element);
        if (this.#addCallback) {
            this.#addCallback(element);
        }
    }

    /**
     * @param {addCallback} callback
     */
    set addCallback(callback) {
        this.#addCallback = callback;
    }
}

export {Manager}
