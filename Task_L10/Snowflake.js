"use strict";
var L10_Inheritance;
(function (L10_Inheritance) {
    class Snowflake extends L10_Inheritance.Moveable {
        constructor(_x, _y) {
            super(_x, _y);
        }
        draw() {
            console.log("Snowflakes");
            let radiusSnowflake = Math.random() * 3 + 0.5;
            L10_Inheritance.crc2.beginPath();
            L10_Inheritance.crc2.arc(this.x, this.y, radiusSnowflake, 0, 2 * Math.PI);
            L10_Inheritance.crc2.fillStyle = "white";
            L10_Inheritance.crc2.fill();
        }
        update() {
            this.draw();
            if (this.y > 640) {
                this.y = 0;
            }
            else {
                this.y += 1;
            }
        }
    }
    L10_Inheritance.Snowflake = Snowflake;
})(L10_Inheritance || (L10_Inheritance = {}));
//# sourceMappingURL=Snowflake.js.map