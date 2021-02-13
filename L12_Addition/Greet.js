"use strict";
var L12_Addition;
(function (L12_Addition) {
    let greets = [{ greet: "Hi" }, { greet: "Hallo" }, { greet: "Servus" }];
    try {
        let input = prompt("Lass dich grüßen!", "Gib hier eine Zahl ein");
        let greet = greets[Number(input)].greet;
        alert(greet);
    }
    catch (_error) {
        alert("Tschüss!");
        console.log(_error);
    }
    console.log("Done");
})(L12_Addition || (L12_Addition = {}));
//# sourceMappingURL=Greet.js.map