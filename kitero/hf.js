// Módszer1

function EveszkozModszer1(hegyekSzama) {
    this.hegyekSzama = hegyekSzama;
}

function KesModszer1(hegyekSzama, markolatTipus) {
    EveszkozModszer1.call(this, hegyekSzama);
    this.markolatTipus = markolatTipus;
}
Object.setPrototypeOf(KesModszer1.prototype, EveszkozModszer1.prototype);

function VillaModszer1(hegyekSzama) {
    EveszkozModszer1.call(this, hegyekSzama);
}
Object.setPrototypeOf(VillaModszer1.prototype, EveszkozModszer1.prototype);

function PoharModszer1() {}


const kes1Modszer1 = new KesModszer1(0, "fa");
const kes2Modszer1 = new KesModszer1(0, "műanyag");
const villa1Modszer1 = new VillaModszer1(4);
const pohar1Modszer1 = new PoharModszer1();

console.log(kes1Modszer1);
console.log(kes2Modszer1);
console.log(villa1Modszer1);
console.log(pohar1Modszer1);

// Módszer2

class EveszkozModszer2 {
    constructor(hegyekSzama) {
        this.hegyekSzama = hegyekSzama;
    }
}

class KesModszer2 extends EveszkozModszer2 {
    constructor(hegyekSzama, markolatTipus) {
        super(hegyekSzama);
        this.markolatTipus = markolatTipus;
    }
}

class VillaModszer2 extends EveszkozModszer2 {
    constructor(hegyekSzama) {
        super(hegyekSzama);
    }
}

class PoharModszer2 {
    constructor() {}
}


const kes1Modszer2 = new KesModszer2(0, "fa");
const kes2Modszer2 = new KesModszer2(0, "műanyag");
const villa1Modszer2 = new VillaModszer2(4);
const pohar1Modszer2 = new PoharModszer2();

console.log(kes1Modszer2);
console.log(kes2Modszer2);
console.log(villa1Modszer2);
console.log(pohar1Modszer2);
