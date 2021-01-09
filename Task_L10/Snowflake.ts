namespace L10_Inheritance {
    export class Snowflake extends Moveable {

        constructor (_x: number, _y: number) {
            super(_x, _y);
        }

        draw(): void {
            console.log("Snowflakes");

            let radiusSnowflake: number = Math.random() * 3 + 0.5;
                 
            crc2.beginPath();
            crc2.arc(this.x, this.y, radiusSnowflake, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.fill();
        }

        update(): void {
            this.draw();
            if (this.y > 640) {
                this.y = 0;
            }
            else {
                this.y += 1;
            }
        
        }
    }
}