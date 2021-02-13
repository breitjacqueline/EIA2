"use strict";
var Firework;
(function (Firework) {
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        randomVector(max) {
            let dir = Math.random() * Math.PI * 2;
            let spd = Math.random() * max;
            this.x = Math.cos(dir) * spd;
            this.y = Math.sin(dir) * spd;
            return this;
        }
    }
    Firework.Vector = Vector;
})(Firework || (Firework = {}));
//# sourceMappingURL=vector.js.map