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

class AuthorManager{
    /**
     * @type {Author[]}
     */
    #authorList;
    
    /**
     * @type {TableCallback}
     */
    #tableCallback;

    #addElementResultCallback

    /**
     * @param {TableCallback} value
     */
    set TableCallback(value){
        this.#tableCallback = value;
    }

    set AddElementResultCallback(value) {
        this.#addElementResultCallback = value;
    }

    set TableCallback(value) {
        this.#tableCallback = value;
    }

    constructor(){
        this.#authorList = [];
    }

    /**
     * 
     * @param {import(".").AuthorType} element 
     */
    addElement(element){
        const author = new Author();
        author.id = this.#authorList.length;
        author.name = element.author;
        author.work = element.work;
        author.concept = element.concept;
        if (author.validate()) {
            this.#authorList.push(author);
            this.#addElementResultCallback("Sikeres elemfelvétel");
        }
        else {
            this.#addElementResultCallback("Sikertelen elemfelvétel");
        }
    }

    /**
     * @param {import(".").AuthorType[]} elementList
     */
    addElementList(elementList) {
        for (const elem of elementList) {
            const author = new Author();
            author.id = this.#authorList.length;
            author.name = element.author;
            author.work = element.work;
            author.concept = element.concept;

            if (author.validate()) {
                this.#authorList.push(author);
                this.#addElementResultCallback("Sikeres elemfelvétel");
            }
            else {
                this.#addElementResultCallback("Sikertelen elemfelvétel");
                break;
            }
        }
    }

    /**
     * @returns {void}
     */
    getAllElement(){
        this.#tableCallback(this.#authorList);
    }

    getExportString() {
        const result = [];
        for (const author of this.#authorList) {
            result.push(`$(author.name);$(author.work);$(author.concept)`);
        }
        return result.join("\n");
    }
}

class Author{

    /**
     * @type {string}
     */
    #id;

    /**
     * @type {string}
     */
    #name;

    /**
     * @type {string}
     */
    #work;

    /**
     * @type {string}
     */
    #concept;

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get work(){
        return this.#work;
    }

    get concept(){
        return this.#concept;
    }


    set id(value){
        this.#id = value;
    }

    set name(value){
        this.#name = value;
    }

    set work(value){
        this.#work = value;
    }

    set concept(value){
        this.#concept = value;
    }

    validate() {
        return this.#name && this.#concept && this.#work;
    }
}

export {AuthorManager}