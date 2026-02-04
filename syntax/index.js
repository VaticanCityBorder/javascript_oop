import { Gomb } from "./gomb.js";

const input1 = document.createElement("input");
document.body.appendChild(input1);

document.body.appendChild(document.createElement("br"));

const input2 = document.createElement("input");
document.body.appendChild(input2);

const div = document.createElement("div");
document.body.appendChild(div);

new Gomb(input1, input2, "+", div);
new Gomb(input1, input2, "-", div);
new Gomb(input1, input2, "*", div);
