export {muvelet, muveletLetrehoz};

function muvelet(a, b, callback) {
    const result = callback(a, b);
    return {result};
}

function muveletLetrehoz(jel) {
    if (jel == "+") {
        return (egyik, masik) => egyik + masik;
    }

    else if (jel == "-") {
        return (egyik, masik) => egyik - masik;
    }

    else if (jel == "*") {
        return (egyik, masik) => egyik * masik;
    }
}
