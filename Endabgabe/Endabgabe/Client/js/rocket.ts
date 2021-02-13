namespace Firework {
    export class Rocket extends FireworkObject {
        isBlown: boolean;

        constructor(x: number, y: number, color: string) {
            super(x, y, color);
            this.isBlown = false;
        }

        update(particles: Particle[]): Particle[] {
            this.y -= 3;
            if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
                this.isBlown = true;
                for (let i: number = 0; i < 60; i++) {
                    particles.push(new Particle(this.x, this.y, this.color));
                }
            }
            return particles;
        }

        draw(ctx: CanvasRenderingContext2D): void {
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }
}