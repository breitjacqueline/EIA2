"use strict";
var L10_Inheritance;
(function (L10_Inheritance) {
    class Skier extends L10_Inheritance.Moveable {
        constructor(_x, _y, _velocity) {
            super(_x, _y);
            this.moveright = Math.random() < 0.5;
            this.velocity = _velocity;
        }
        draw() {
            console.log("Draw Skier");
            L10_Inheritance.crc2.strokeStyle = "black";
            L10_Inheritance.crc2.lineWidth = 2;
            // left leg
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.moveTo(this.x, this.y);
            L10_Inheritance.crc2.lineTo(this.x - 10, this.y + 15);
            L10_Inheritance.crc2.lineTo(this.x + 10, this.y + 15);
            L10_Inheritance.crc2.lineTo(this.x - 20, this.y + 15);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            // right leg
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.moveTo(this.x, this.y);
            L10_Inheritance.crc2.lineTo(this.x + 10, this.y + 10);
            L10_Inheritance.crc2.lineTo(this.x + 25, this.y + 10);
            L10_Inheritance.crc2.lineTo(this.x - 5, this.y + 10);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            // body
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.moveTo(this.x, this.y);
            L10_Inheritance.crc2.lineTo(this.x, this.y - 10);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            // head
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.arc(this.x, this.y - 15, 5, 0, 2 * Math.PI);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            // right arm
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.moveTo(this.x, this.y - 5);
            L10_Inheritance.crc2.lineTo(this.x + 15, this.y - 10);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            // left arm
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.moveTo(this.x, this.y - 5);
            L10_Inheritance.crc2.lineTo(this.x - 15, this.y - 10);
            L10_Inheritance.crc2.stroke();
            L10_Inheritance.crc2.closePath();
            if (this.moveright) {
                L10_Inheritance.crc2.moveTo(this.x + 30, this.y + 40);
                L10_Inheritance.crc2.lineTo(this.x - 9, this.y + 40);
            }
            else {
                L10_Inheritance.crc2.moveTo(this.x - 20, this.y + 40);
                L10_Inheritance.crc2.lineTo(this.x + 19, this.y + 40);
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
    L10_Inheritance.Skier = Skier;
})(L10_Inheritance || (L10_Inheritance = {}));
//# sourceMappingURL=Skier.js.map