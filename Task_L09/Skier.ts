namespace L09_Classes {
    export class Skier {
        x: number;
        y: number;
        velocity: number;
        moveright: boolean = Math.random() < 0.5;
    
    
        constructor(_x: number, _y: number, _velocity: number) {
            this.x = _x;
            this.y = _y;
            this.velocity = _velocity;
        }

        draw(): void {
            console.log("Draw Skier");

            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;

// left leg
            crc2.beginPath();
            crc2.moveTo(this.x, this.y);
            crc2.lineTo(this.x - 10, this.y + 15);
            crc2.lineTo(this.x + 10, this.y + 15);
            crc2.lineTo(this.x - 20, this.y + 15);
            crc2.stroke();
            crc2.closePath();

// right leg
            crc2.beginPath();
            crc2.moveTo(this.x, this.y);
            crc2.lineTo(this.x + 10, this.y + 10);
            crc2.lineTo(this.x + 25, this.y + 10);
            crc2.lineTo(this.x - 5, this.y + 10);
            crc2.stroke();
            crc2.closePath();

// body
            crc2.beginPath();
            crc2.moveTo(this.x, this.y);
            crc2.lineTo(this.x, this.y - 10);
            crc2.stroke();
            crc2.closePath();

// head
            crc2.beginPath();
            crc2.arc(this.x, this.y - 15, 5, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.closePath();

// right arm
            crc2.beginPath();
            crc2.moveTo(this.x, this.y - 5);
            crc2.lineTo(this.x + 15, this.y - 10);
            crc2.stroke();
            crc2.closePath();

// left arm
            crc2.beginPath();
            crc2.moveTo(this.x, this.y - 5);
            crc2.lineTo(this.x - 15, this.y - 10);
            crc2.stroke();
            crc2.closePath();

            if (this.moveright) {
                crc2.moveTo(this.x + 30, this.y + 40);
                crc2.lineTo(this.x - 9, this.y + 40);
            }
            else {
                crc2.moveTo(this.x - 20, this.y + 40);
                crc2.lineTo(this.x + 19, this.y + 40);
            }

        }

        update(): void {
            console.log("Skier move");
            this.draw();
            this.y += this.velocity;
        
            if (Math.random() * 100 < 1) {
            this.moveright = !this.moveright;
        }
            if (this.moveright) {
            this.x += this.velocity;
        }
        else {
            this.x -= this.velocity;
        }

            if (this.y > 640) {
            this.y = 150;
            this.x = 0;
        }

    }

    }
}