/** 
 * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 * @callback
 * @param {HTMLTableSectionElement}
*/

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [{name: "Szerző"}, {name: "Mű"}, {name: "Fogalmak"}] 
/** @type {HeaderType[]}   */
const colspanHeaderArr = [{name: "Szerző"},{name: "Mű"} , {name: "Fogalmak" ,colSpan: 2}] 

/** @type {RowspanRowType[]}  */
const rowspanBodyArr = [
    {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    },
    {
        author: "Thomas Mann",
        title1: "Mario és a varázsló",
        concepts1: "kisregény" 
    },
    {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
]



/** @type {ColspanRowType[]} */
const colspanBodyArr = [ 
    {
        author: "Appolliniare", 
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",  
        concepts2: "Emlékezés", 
    },
    {
        author: "Appolliniare", 
        title: "Búcsú", 
        concepts: "Avantgárd" 
    },
    {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény" 
    },
    {
        author: "Franz Kafka",
        title: "A per", 
        concepts: "regény" 
    },
    {
        author: "Franz Kafka", 
        title: "Az átváltozás",
        concepts: "kisregény", 
        concepts2: "groteszk" 
    }
]

// renderColspanBody(makeTableBodyWithHeader(colspanHeaderArr), colspanBodyArr)
// renderRowspanBody(makeTableBodyWithHeader(rowspanHeaderArr), rowspanBodyArr)


class Table{

    #tbody;

    get tbody() {
        return this.#tbody;
    }

    /**
     * @param {HeaderType[]} tableHeaderArray 
     */
    constructor(tableHeaderArray) {
        this.#tbody = makeTableBodyWithHeader(tableHeaderArray);
    }

    /**
     * @param {}
     */
    method(param) {
        param(this.#tbody);
    }
}


class ColspanTable extends Table {
    /**
     * @param {HeaderType[]} tableHeaderArray 
     */
    constructor(tableHeaderArray) {
        super(tableHeaderArray);
    }

    /**
     * @param {ColspanRowType[]} colSpanArray
     */
    render(colSpanArray) {
        renderColspanBody(this.tbody, colSpanArray);
    }
}


class RowSpanTable extends Table {
    /**
     * @param {HeaderType[]} tableHeaderArray 
     */
    constructor(tableHeaderArray) {
        super(tableHeaderArray);
    }

    /**
     * @param {RowspanRowType[]} rowSpanArray
     */
    render(rowSpanArray) {
        renderRowspanBody(this.tbody, rowSpanArray);
    }
}

const colSpanTable = new ColspanTable(colspanHeaderArr);
const rowSpanTable = new RowSpanTable(rowspanHeaderArr);
colSpanTable.render(colspanBodyArr);
rowSpanTable.render(rowspanBodyArr);

const button = document.createElement("button");
button.innerText = "HOZZÁADÁS";
document.body.appendChild(button);

button.addEventListener("click", buttonEventListener.bind(rowSpanTable));

/**
 * @this {rowSpanTable}
 */
function buttonEventListener() {
    /**
     * @type {RowspanRowType}
     */
    const obj = {
        author: "Teszt szerző",
        title1: "Teszt cím", 
        concepts1: "Teszt fogalom 1", 
        title2: "Teszt cím 2",
        concepts2: "Teszt fogalom 2"
    }

    rowSpanTable.method(function(body) {
        const row = document.createElement("tr");

        const tdAuthor = document.createElement("td");
        tdAuthor.innerText = obj.author;
        row.appendChild(tdAuthor);
        
        const tdTitle1 = document.createElement("td");
        tdTitle1.innerText = obj.title1;
        row.appendChild(tdTitle1);
        
        const tdConcept1 = document.createElement("td");
        tdConcept1.innerText = obj.concepts1;
        row.appendChild(tdConcept1);
        
        const tdConcept2 = document.createElement("td");
        tdAuthor.innerText = obj.concepts2;
        row.appendChild(tdConcept2);

        body.appendChild(row);
    })
}
