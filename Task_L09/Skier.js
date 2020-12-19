"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Skier {
        constructor(_x, _y, _velocity) {
            this.moveright = Math.random() < 0.5;
            this.x = _x;
            this.y = _y;
            this.velocity = _velocity;
        }
        draw() {
            console.log("Draw Skier");
            L09_Classes.crc2.strokeStyle = "black";
            L09_Classes.crc2.lineWidth = 2;
            // left leg
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.x, this.y);
            L09_Classes.crc2.lineTo(this.x - 10, this.y + 15);
            L09_Classes.crc2.lineTo(this.x + 10, this.y + 15);
            L09_Classes.crc2.lineTo(this.x - 20, this.y + 15);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // right leg
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.x, this.y);
            L09_Classes.crc2.lineTo(this.x + 10, this.y + 10);
            L09_Classes.crc2.lineTo(this.x + 25, this.y + 10);
            L09_Classes.crc2.lineTo(this.x - 5, this.y + 10);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // body
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.x, this.y);
            L09_Classes.crc2.lineTo(this.x, this.y - 10);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // head
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.arc(this.x, this.y - 15, 5, 0, 2 * Math.PI);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // right arm
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.x, this.y - 5);
            L09_Classes.crc2.lineTo(this.x + 15, this.y - 10);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // left arm
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.x, this.y - 5);
            L09_Classes.crc2.lineTo(this.x - 15, this.y - 10);
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            if (this.moveright) {
                L09_Classes.crc2.moveTo(this.x + 30, this.y + 40);
                L09_Classes.crc2.lineTo(this.x - 9, this.y + 40);
            }
            else {
                L09_Classes.crc2.moveTo(this.x - 20, this.y + 40);
                L09_Classes.crc2.lineTo(this.x + 19, this.y + 40);
            }
        }
        update() {
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
    L09_Classes.Skier = Skier;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=Skier.js.map