namespace Firework {
    export class Vector {
        x: number;
        y: number;
    
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    
        randomVector(max: number): Vector {
            let dir: number = Math.random() * Math.PI * 2;
            let spd: number = Math.random() * max;
            this.x = Math.cos(dir) * spd;
            this.y = Math.sin(dir) * spd;
    
            return this;
        }
    }
}

