"use strict";
var Firework;
(function (Firework) {
    class Rocket extends Firework.FireworkObject {
        constructor(x, y, color) {
            super(x, y, color);
            this.isBlown = false;
        }
        update(particles) {
            this.y -= 3;
            if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
                this.isBlown = true;
                for (let i = 0; i < 60; i++) {
                    particles.push(new Firework.Particle(this.x, this.y, this.color));
                }
            }
            return particles;
        }
        draw(ctx) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }
    Firework.Rocket = Rocket;
})(Firework || (Firework = {}));
//# sourceMappingURL=rocket.js.map