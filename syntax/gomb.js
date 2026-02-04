import { muvelet, muveletLetrehoz } from "./functions.js";
export { Gomb };

class Gomb {

    constructor(input1, input2, muveletString, eredmenyDiv) {
        this.input1 = input1;
        this.input2 = input2;
        this.muveletString = muveletString;
        this.eredmenyDiv = eredmenyDiv;

        this.button = document.createElement("button");
        
        if (muveletString == "+") {
            this.button.innerText = "Összeadás";
        } 
        else if (muveletString == "-") {
            this.button.innerText = "Kivonás";
        } 
        else if (muveletString == "*") {
            this.button.innerText = "Szorzás";
        }
        
        document.body.appendChild(this.button);
        
        this.button.addEventListener(
            "click",
            this.#calculate(this.input1, this.input2, this.eredmenyDiv)
        );
    }

    #calculate(input1, input2, eredmenyDiv) {
        return () => {
            const num1 = Number(input1.value);
            const num2 = Number(input2.value);

            const eredmeny = muvelet(num1, num2, muveletLetrehoz(this.muveletString));

            eredmenyDiv.innerText = eredmeny.result;
        };
    }
}
