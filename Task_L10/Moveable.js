"use strict";
var L10_Inheritance;
(function (L10_Inheritance) {
    class Moveable {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        draw() {
            // console.log("moveable draw");
        }
        update() {
            // console.log("moveable update");
        }
    }
    L10_Inheritance.Moveable = Moveable;
})(L10_Inheritance || (L10_Inheritance = {}));
//# sourceMappingURL=Moveable.js.map