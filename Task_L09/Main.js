"use strict";
var L09_Classes;
(function (L09_Classes) {
    window.addEventListener("load", handleLoad);
    window.setTimeout(animate, 5);
    let golden = 0.62;
    let posMountains = { x: 0, y: 340 };
    let skiers = [];
    let snowflakes = [];
    for (let i = 1; i < 400; i++) {
        snowflakes.push(new L09_Classes.Snowflake(Math.floor(Math.random() * (340 + 1)), Math.floor(Math.random() * (600 + 1))));
    }
    let imgData;
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    skiers.push(new L09_Classes.Skier(340, 640, (Math.random() * 5) + 1));
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Classes.crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun({ x: 300, y: 50 });
        drawCloud({ x: 100, y: 75 }, { x: 200, y: 50 });
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawSkiSlope();
        drawSkiLift({ x: 0, y: 200 });
        generateTrees();
        //Hintergrund speichern
        imgData = L09_Classes.crc2.getImageData(0, 0, canvas.width, canvas.height);
    }
    function drawSkiers() {
        console.log("draw skiers");
        for (let skier of skiers) {
            skier.update();
        }
    }
    function drawSnowflakes() {
        console.log("draw snowflakes");
        for (let snowflake of snowflakes) {
            snowflake.update();
        }
    }
    function animate() {
        console.log("animate");
        L09_Classes.crc2.putImageData(imgData, 0, 0);
        drawSkiers();
        drawSnowflakes();
        window.setTimeout(animate, 5);
    }
    function drawSkiLift(_position) {
        console.log("Lift", _position);
        L09_Classes.crc2.save();
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.strokeStyle = "black";
        L09_Classes.crc2.moveTo(0, 30);
        L09_Classes.crc2.lineTo(360, 320);
        L09_Classes.crc2.lineWidth = 2;
        L09_Classes.crc2.stroke();
        L09_Classes.crc2.closePath();
        L09_Classes.crc2.translate(_position.x, _position.y);
        L09_Classes.crc2.restore();
        L09_Classes.crc2.save();
        L09_Classes.crc2.translate(0, 30);
        for (let i = 0; i <= 7; i++) {
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.strokeStyle = "black";
            L09_Classes.crc2.moveTo(0, 0);
            L09_Classes.crc2.translate(50, 40);
            L09_Classes.crc2.moveTo(0, 0);
            L09_Classes.crc2.lineTo(0, 30);
            L09_Classes.crc2.lineTo(-25, 30);
            L09_Classes.crc2.moveTo(12.5, 0);
            L09_Classes.crc2.stroke();
        }
        L09_Classes.crc2.restore();
    }
    function generateTrees() {
        console.log("Trees");
        for (let i = 0; i < 7; i++) {
            let pos = getRandomCoordinate(110, 350, 400, 620);
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
        let gradient = L09_Classes.crc2.createLinearGradient(0, 0, 0, L09_Classes.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "aliceblue");
        gradient.addColorStop(1, "HSL(360, 0%, 100%)");
        L09_Classes.crc2.fillStyle = gradient;
        L09_Classes.crc2.fillRect(0, 0, L09_Classes.crc2.canvas.width, L09_Classes.crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 10;
        let r2 = 50;
        let gradient = L09_Classes.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(51, 100%, 50%, 1)");
        gradient.addColorStop(1, "HSLA(43, 74%, 75%, 0)");
        L09_Classes.crc2.save();
        L09_Classes.crc2.translate(_position.x, _position.y);
        L09_Classes.crc2.fillStyle = gradient;
        L09_Classes.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L09_Classes.crc2.fill();
        L09_Classes.crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position);
        let nParticles = 30;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = L09_Classes.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        L09_Classes.crc2.save();
        L09_Classes.crc2.translate(_position.x, _position.y);
        L09_Classes.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L09_Classes.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L09_Classes.crc2.translate(x, y);
            L09_Classes.crc2.fill(particle);
            L09_Classes.crc2.restore();
        }
        L09_Classes.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L09_Classes.crc2.save();
        L09_Classes.crc2.translate(_position.x, _position.y);
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.moveTo(0, 0);
        L09_Classes.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            L09_Classes.crc2.lineTo(x, y);
        } while (x < L09_Classes.crc2.canvas.width);
        L09_Classes.crc2.lineTo(x, 640);
        L09_Classes.crc2.closePath();
        let gradient = L09_Classes.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        L09_Classes.crc2.fillStyle = gradient;
        L09_Classes.crc2.fill();
        L09_Classes.crc2.restore();
    }
    function drawSkiSlope() {
        console.log("Ski Slope");
        L09_Classes.crc2.fillStyle = "whitesmoke";
        L09_Classes.crc2.strokeStyle = "white";
        L09_Classes.crc2.save();
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.lineTo(0, 100);
        L09_Classes.crc2.lineTo(0, 640);
        L09_Classes.crc2.lineTo(360, 640);
        L09_Classes.crc2.lineTo(360, 400);
        L09_Classes.crc2.fill();
        L09_Classes.crc2.stroke();
        L09_Classes.crc2.restore();
    }
    function drawTree(pos) {
        console.log("Trees", pos);
        let x = pos.x;
        let y = pos.y;
        L09_Classes.crc2.save();
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.lineTo(x + 0, y + 0);
        L09_Classes.crc2.lineTo(x + 0, y + 10);
        L09_Classes.crc2.lineTo(x + 5, y + 10);
        L09_Classes.crc2.lineTo(x + 5, y + 0);
        L09_Classes.crc2.fillStyle = "sienna";
        L09_Classes.crc2.fill();
        L09_Classes.crc2.closePath();
        L09_Classes.crc2.restore();
        L09_Classes.crc2.save();
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.lineTo(x + 2.5, y - 20);
        L09_Classes.crc2.lineTo(x - 10, y + 0);
        L09_Classes.crc2.lineTo(x + 15, y + 0);
        L09_Classes.crc2.fillStyle = "darkgreen";
        L09_Classes.crc2.fill();
        L09_Classes.crc2.closePath();
        L09_Classes.crc2.restore();
    }
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=Main.js.map