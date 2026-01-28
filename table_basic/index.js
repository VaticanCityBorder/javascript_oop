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

// -------------------- Colspan táblázat és gomb -------------------- //

const colSpanTable = new ColspanTable(colspanHeaderArr);

const buttonCol = document.createElement("button");
buttonCol.innerText = "HOZZÁADÁS";
document.body.appendChild(buttonCol);
buttonCol.addEventListener("click", buttonColEventListener.bind(colSpanTable));


// -------------------- Rowspan táblázat és gomb -------------------- //

const rowSpanTable = new RowSpanTable(rowspanHeaderArr);
colSpanTable.render(colspanBodyArr);
rowSpanTable.render(rowspanBodyArr);

const buttonRow = document.createElement("button");
buttonRow.innerText = "HOZZÁADÁS";
document.body.appendChild(buttonRow);
buttonRow.addEventListener("click", buttonRowEventListener.bind(rowSpanTable));


/**
 * @this {rowSpanTable}
 */
function buttonColEventListener() {
    /**
     * @type {colspanRowType}
     */
    const obj = {
        author: "Teszt szerző",
        title1: "Teszt cím", 
        concepts1: "Teszt fogalom 1", 
        concepts2: "Teszt fogalom 2"
    }

    colSpanTable.method(function(body) {
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
        tdConcept2.innerText = obj.concepts2;
        row.appendChild(tdConcept2);

        body.appendChild(row);
    })
}


/**
 * @this {rowSpanTable}
 */
function buttonRowEventListener() {
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
        const row1 = document.createElement("tr");
        const row2 = document.createElement("tr");

        const tdAuthor = document.createElement("td");
        tdAuthor.innerText = obj.author;
        row1.appendChild(tdAuthor);
        tdAuthor.rowSpan = 2;
        
        const tdTitle1 = document.createElement("td");
        tdTitle1.innerText = obj.title1;
        row1.appendChild(tdTitle1);
        
        const tdConcept1 = document.createElement("td");
        tdConcept1.innerText = obj.concepts1;
        row1.appendChild(tdConcept1);
        
        const tdTitle2 = document.createElement("td");
        tdTitle2.innerText = obj.title2;
        row2.appendChild(tdTitle2);
        
        const tdConcept2 = document.createElement("td");
        tdConcept2.innerText = obj.concepts2;
        row2.appendChild(tdConcept2);

        body.appendChild(row1);
        body.appendChild(row2);
    })
}
