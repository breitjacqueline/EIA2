"use strict";
var L08_Canvas;
(function (L08_Canvas) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        // let horizon: number = crc2.canvas.height * golden;
        let posMountains = { x: 0, y: 340 };
        drawBackground();
        drawSun({ x: 300, y: 50 });
        drawCloud({ x: 100, y: 75 }, { x: 200, y: 50 });
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawSkiSlope();
        drawSkiLift();
        generatePeople();
        generateTrees();
    }
    function drawSkiLift() {
        crc2.strokeStyle = "black";
        crc2.lineWidth = 3;
        // Endpoint
        crc2.beginPath();
        crc2.lineTo(10, 350);
        crc2.lineTo(30, 300);
        crc2.lineTo(90, 300);
        crc2.lineTo(110, 350);
        crc2.stroke();
        crc2.closePath();
        //Startpoint
        crc2.beginPath();
        crc2.lineTo(10, 600);
        crc2.lineTo(30, 550);
        crc2.lineTo(90, 550);
        crc2.lineTo(110, 600);
        crc2.stroke();
        crc2.closePath();
        //cable pull left
        crc2.beginPath();
        crc2.lineTo(30, 300);
        crc2.lineTo(30, 550);
        crc2.stroke();
        crc2.closePath();
        //cable pull right
        crc2.beginPath();
        crc2.lineTo(90, 300);
        crc2.lineTo(90, 550);
        crc2.stroke();
        crc2.closePath();
        //T-bar end
        crc2.beginPath();
        crc2.lineTo(30, 350);
        crc2.lineTo(90, 350);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(60, 350);
        crc2.lineTo(60, 380);
        crc2.stroke();
        crc2.closePath();
        //T-bar middle
        crc2.beginPath();
        crc2.lineTo(30, 420);
        crc2.lineTo(90, 420);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(60, 420);
        crc2.lineTo(60, 450);
        crc2.stroke();
        crc2.closePath();
        //T-bar start
        crc2.beginPath();
        crc2.lineTo(30, 490);
        crc2.lineTo(90, 490);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(60, 490);
        crc2.lineTo(60, 520);
        crc2.stroke();
        crc2.closePath();
        //tow nr3
        crc2.beginPath();
        crc2.lineTo(90, 370);
        crc2.lineTo(80, 390);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(90, 390);
        crc2.lineTo(70, 390);
        crc2.stroke();
        crc2.closePath();
        //tow nr2
        crc2.beginPath();
        crc2.lineTo(90, 430);
        crc2.lineTo(80, 450);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(90, 450);
        crc2.lineTo(70, 450);
        crc2.stroke();
        crc2.closePath();
        //tow nr1
        crc2.beginPath();
        crc2.lineTo(90, 500);
        crc2.lineTo(80, 520);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.lineTo(90, 520);
        crc2.lineTo(70, 520);
        crc2.stroke();
        crc2.closePath();
    }
    function generatePeople() {
        for (let i = 0; i < 5; i++) {
            let pos = getRandomCoordinate(20, 340, 350, 630);
            drawPeople(pos);
        }
    }
    function drawPeople(pos) {
        console.log("People");
        let x = pos.x;
        let y = pos.y;
        crc2.strokeStyle = "black";
        crc2.lineWidth = 2;
        // left leg
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x - 10, y + 15);
        crc2.lineTo(x + 10, y + 15);
        crc2.lineTo(x - 20, y + 15);
        crc2.stroke();
        crc2.closePath();
        // right leg
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x + 10, y + 10);
        crc2.lineTo(x + 25, y + 10);
        crc2.lineTo(x - 5, y + 10);
        crc2.stroke();
        crc2.closePath();
        // body
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x, y - 10);
        crc2.stroke();
        crc2.closePath();
        // head
        crc2.beginPath();
        crc2.arc(x, y - 15, 5, 0, 2 * Math.PI);
        crc2.stroke();
        crc2.closePath();
        // right arm
        crc2.beginPath();
        crc2.moveTo(x, y - 5);
        crc2.lineTo(x + 15, y - 10);
        crc2.stroke();
        crc2.closePath();
        // left arm
        crc2.beginPath();
        crc2.moveTo(x, y - 5);
        crc2.lineTo(x - 15, y - 10);
        crc2.stroke();
        crc2.closePath();
    }
    function generateTrees() {
        console.log("Trees");
        for (let i = 0; i < 10; i++) {
            let pos = getRandomCoordinate(110, 350, 640, 400);
            drawTree(pos);
        }
    }
    function getRandomCoordinate(xMin, xMax, yMin, yMax) {
        let x = getRandom(xMin, xMax);
        let y = getRandom(yMin, yMax);
        return { x, y };
    }
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "aliceblue");
        gradient.addColorStop(1, "HSL(360, 0%, 100%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 10;
        let r2 = 50;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(51, 100%, 50%, 1)");
        gradient.addColorStop(1, "HSLA(43, 74%, 75%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position);
        let nParticles = 30;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 640);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawSkiSlope() {
        console.log("Ski Slope");
        crc2.fillStyle = "whitesmoke";
        crc2.strokeStyle = "white";
        crc2.save();
        crc2.beginPath();
        crc2.lineTo(0, 100);
        crc2.lineTo(0, 640);
        crc2.lineTo(360, 640);
        crc2.lineTo(360, 400);
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    function drawTree(pos) {
        console.log("Trees", pos);
        let x = pos.x;
        let y = pos.y;
        crc2.save();
        crc2.beginPath();
        crc2.lineTo(x + 0, y + 0);
        crc2.lineTo(x + 0, y + 10);
        crc2.lineTo(x + 5, y + 10);
        crc2.lineTo(x + 5, y + 0);
        crc2.fillStyle = "sienna";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
        crc2.save();
        crc2.beginPath();
        crc2.lineTo(x + 2.5, y - 20);
        crc2.lineTo(x - 10, y + 0);
        crc2.lineTo(x + 15, y + 0);
        crc2.fillStyle = "darkgreen";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
})(L08_Canvas || (L08_Canvas = {}));
//# sourceMappingURL=Canvas.js.map