import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class ImportView extends ViewElement { // importálás és exportálás definiálása

    /**
     * @type {AuthorManager}
     */
    #manager; // privát manager tulajdonság definiálása

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager) { // konstruktor definiálása
        super(id); // szülőosztály konstruktorának meghívása
        this.#manager = manager; // manager értékének beállítása
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        this.div.appendChild(fileInput);
        const resultDiv = document.createElement("div");
        this.div.appendChild(resultDiv); // resultDiv létrehozása és hozzáadása a div-hez
        this.#manager.importResultCallback = (message) => { // importResultCallback definiálása (hívjuk az addElementList függvényben)
            resultDiv.innerText = message; // resultDiv tartalmának beállítása a message-re
            setTimeout(() => { // settimeout hívása
                resultDiv.innerText = ""; // resultDiv tartalmának törlése
            }, 1500); // másfléc másodperc múlva
        }
        fileInput.addEventListener("change", (e) => { // input change eseményére feliratkozás
            const file = e.target.files[0]; // elkérjük az esemény targetjának fájlját
            const reader = new FileReader(); // FileReader létrehozása
            reader.readAsText(file, "UTF-8"); // elkezdjük beolvasni a fájlt

            reader.onload = () => { // feliratkozunk a reader onload eseményére (akkor fut le, amikor a fájl beolvasása befejeződött)
                /**
                 * @type {import("./index.js").AuthorType[]}
                 */
                const result = []; // létrehozunk egy result tömböt üres tömbként
                const fileContent = reader.result; // elkérjük a filereader resultját
                const fileContentLines = fileContent.split("\n"); // szétvaálsztjuk a fájl tartalmát sorokra
                for (const line of fileContentLines) { // végigiterálunk a sorokon
                    const data = line.split(";"); // szétválasztjuk a sorokat
                    /**
                     * @type {import("./index.js").AuthorType}
                     */
                    const authorType = { // deklarálunk egy authorType változót
                        author: data[0], // ahol a sor első pontosvesszőjéig tartó rész a szerző
                        work: data[1], // ahol a sor második pontosvesszőjéig tartó rész a mű
                        concept: data[2] // ahol a sor harmadik pontosvesszőjéig tartó rész a fogalom
                    };
                    result.push(authorType); // hozzáadjuk az authorType-ot a result tömbhöz
                }
                this.#manager.addElementList(result); // meghívjuk a tömbbel az authormanager.addElementList metódusát
            }
        })

        const exportButton = document.createElement("button"); // létrehozunk egy gombot
        exportButton.innerText = "Export"; // megadjuk a szövegét
        this.div.appendChild(exportButton); // hozzáadjuk a div-hez
        exportButton.addEventListener("click", () => { // feliratkozunk a a gomg click eseményére
            const a = document.createElement("a"); // létrehozunk egy linket
            const fileContent = this.#manager.getExportString(); // elkérjük a manager export stringjét
            const file = new Blob([fileContent]); // létrehozunk egy blobot a filecontentből
            const fileUrl = URL.createObjectURL(file); // létrehozunk egy url-t a blobhoz
            a.href = fileUrl; // megadjuk a link href-jét az url-nek
            a.download = "export.csv"; // megadjuk a link downloadját
            a.click(); // a linkre kattintunk
            URL.revokeObjectURL(a.href); // visszavonjuk a blob linkjének az URL-jét
        })
    }
}

export { ImportView } // exportáljuk az ImportView osztályt
