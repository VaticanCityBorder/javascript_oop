
/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { NavigationBar } from "./navigationBar.js"
import { TableView } from "./table.js";

const formFields = [{ // létrehozunk egy formField listát ami alapján példányosítja a FormInputokat
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] // létrehozunk egy header listát

const manager = new AuthorManager(); // példányosítjuk a managert

const navbar = new NavigationBar(); // példányosítjuk a navigációs sávot
navbar.appendTo(document.body); // hozzáadjuk a body-hoz

const tableView = new TableView("table", headerArray, manager); // példányosítjuk a táblázatot
tableView.appendTo(document.body); // hozzáadjuk a body-hoz
navbar.addViewElement("Táblázat", tableView); // hozzáadjuk a navigációs sávhoz a táblázatot

const formView = new FormView("tableForm", formFields, manager); // példányosítjuk a formot
formView.appendTo(document.body); // hozzáadjuk a body-hoz
navbar.addViewElement("Form", formView); // hozzáadjuk a navigációs sávhoz a formot

const importExport = new ImportView("importexport", manager); // példányosítjuk az import/export nézetet
importExport.appendTo(document.body); // hozzáadjuk a body-hoz
navbar.addViewElement("Import/Export", importExport); // hozzáadjuk a navigációs sávhoz az import/export nézetet
navbar.activate("table"); // aktiváljuk a táblázat nézetet, hogy megjelenjen