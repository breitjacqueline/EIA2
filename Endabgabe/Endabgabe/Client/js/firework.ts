namespace Firework {
    export class FireworkObject {
        x: number;
        y: number;
        color: string;

        constructor(x: number, y: number, color: string) {
            this.x = x;
            this.y = y;
            this.color = color;
        }

        update(particles: Particle[] | undefined): any {
             //Placeholder
        }

        draw(ctx: CanvasRenderingContext2D): void {
            //Placeholder
        }
    }
}