/**
 * @callback TableCallback
 * @param {Author[]} authorList
 * @returns {void}
 * 
 * @callback AddElementResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 */

class AuthorManager {
    /**
     * @type {Author[]}
     */
    #authorList; // definiáljuk az AuthorManager osztályt

    /**
     * @type {TableCallback}
     */
    #tableCallback; // privát callback tulajdonság

    /**
     * @type {AddElementResultCallback}
     */
    #addElementResultCallback; // definiáljuk a addElementResultCallback-ot

    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback; // definiáljuk a importResultCallback-ot

    /**
     * @param {TableCallback} value
     */
    set TableCallback(value) { // setter a tableCallback-hez
        this.#tableCallback = value; // beállítja a tableCallbacknek a bemeneti értékét
    }

    /**
     * @param {AddElementResultCallback} value
     */
    set addElementResultCallback(value) { // setter a addElementResultCallback-hez
        this.#addElementResultCallback = value; // beállítja a addElementResultCallbacknek a bemeneti értékét
    }

    /**
     * @param {ImportResultCallback} value
     */
    set importResultCallback(value) { // setter a importResultCallback-hez
        this.#importResultCallback = value; // beállítja a importResultCallbacknek a bemeneti értékét
    }

    constructor() {
        this.#authorList = [];
    }

    /**
     * 
     * @param {import(".").AuthorType} element
     */
    addElement(element) { // definiáljuk az addElement függvényt, ami egy AuthorType-ot vár
        const author = new Author(); // példányosítunk egy Author-t
        author.id = this.#authorList.length; // beállítjuk az id-t a jelenlegi authorList hosszára
        author.name = element.author; // beállítjuk a name-t az AuthorType author mezőjére
        author.work = element.work; // beállítjuk a work-ot az AuthorType work mezőjére
        author.concept = element.concept; // beállítjuk a concept-et
        if (author.validate()) { // validáljuk az author-t, ha minden rendben van, akkor hozzáadjuk a listához
            this.#authorList.push(author);
            this.#addElementResultCallback("Sikeres elemfelvétel");
        }
        else {
            this.#addElementResultCallback("Nem volt sikeres az elemfelvétel");
        }
    }

    /**
     * 
     * @param {import(".").AuthorType[]} elementList 
     */
    addElementList(elementList) { // beállítjuk az addElementList függvényt
        for (const elem of elementList) { // végigiterálunk az elementList listán
            const author = new Author(); // példányosítunk egy Author-t
            author.id = this.#authorList.length; // beállítjuk az id-t a jelenlegi authorList hosszára
            author.name = elem.author; // beállítjuk a name-t az AuthorType author mezőjére
            author.work = elem.work; // beállítjuk a work-ot az AuthorType work mezőjére
            author.concept = elem.concept; // beállítjuk a concept-et
            if (author.validate()) { // validáljuk az author-t, ha minden rendben van, akkor hozzáadjuk a listához
                this.#authorList.push(author);
                this.#importResultCallback("Sikeres volt");
            }
            else {
                this.#importResultCallback("Sikertelen művelet");
                break;
            }
        }
    }

    /**
     * @returns {void}
     */
    getAllElement() { // definiáljuk a getallelement függvényt
        this.#tableCallback(this.#authorList); // meghívjuk a tableCallback-et a jelenlegi authorList-tel
    }

    /**
     * @returns {string}
     */
    getExportString() {
        const result = [];
        for (const author of this.#authorList) {
            result.push(`${author.name};${author.work};${author.concept}`);
        }
        return result.join("\n");
    }
}

class Author { // definiálunk egy Author entitást osztályt

    /**
     * @type {string}
     */
    #id; // definiálunk egy id privát tulajdonságot

    /**
     * @type {string}
     */
    #name; // definiálunk egy name privát tulajdonságot

    /**
     * @type {string}
     */
    #work; // definiálunk egy work privát tulajdonságot

    /**
     * @type {string}
     */
    #concept; // definiálunk egy concept privát tulajdonságot

    get id() { // definiálunk gettert az id tulajdonságnak
        return this.#id;
    }

    get name() { // definiálunk gettert az name tulajdonságnak
        return this.#name;
    }

    get work() { // definiálunk gettert az work tulajdonságnak
        return this.#work;
    }

    get concept() { // definiálunk gettert az concept tulajdonságnak
        return this.#concept;
    }


    set id(value) { // setter
        this.#id = value; // visszatérünk a privát id tulajdonsággal
    }

    set name(value) { // setter
        this.#name = value; // visszatérünk a privát name tulajdonsággal
    }

    set work(value) { // setter
        this.#work = value; // visszatérünk a privát work tulajdonsággal
    }

    set concept(value) { // setter
        this.#concept = value; // visszatérünk a privát concept tulajdonsággal
    }

    /**
     * @returns {boolean}
     */
    validate() {
        return this.#name && this.#concept && this.#work; // ha minden jó akkor true ha nem akkor false
    }
}

export { AuthorManager }
