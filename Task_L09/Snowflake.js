"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Snowflake {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        draw() {
            console.log("Snowflakes");
            let radiusSnowflake = Math.random() * 3 + 0.5;
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.arc(this.x, this.y, radiusSnowflake, 0, 2 * Math.PI);
            L09_Classes.crc2.fillStyle = "white";
            L09_Classes.crc2.fill();
        }
        update() {
            if (this.y > 640) {
                this.y = 0;
            }
            else {
                this.y += 1;
            }
            this.draw();
        }
    }
    L09_Classes.Snowflake = Snowflake;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=Snowflake.js.map