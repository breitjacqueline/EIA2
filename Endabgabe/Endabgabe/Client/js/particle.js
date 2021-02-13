"use strict";
var Firework;
(function (Firework) {
    class Particle extends Firework.FireworkObject {
        constructor(x, y, color) {
            super(x, y, color);
            this.vector = new Firework.Vector(0, 0).randomVector(2);
            this.lifetime = 0;
        }
        update() {
            this.x += this.vector.x;
            this.y += this.vector.y;
            this.vector.y = (0.02 + this.vector.y) * 0.99;
            this.vector.x *= 0.99;
            this.lifetime++;
        }
        draw(ctx) {
            //Je höher die Lifetime, desto dunkler werden Partikel
            ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
            ctx.fillStyle = this.color;
            //Erzeugt Rechteck mit 2px an Position von y
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=particle.js.map