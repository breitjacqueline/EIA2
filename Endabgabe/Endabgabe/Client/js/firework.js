"use strict";
var Firework;
(function (Firework) {
    class FireworkObject {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        update(particles) {
            //Placeholder
        }
        draw(ctx) {
            //Placeholder
        }
    }
    Firework.FireworkObject = FireworkObject;
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map