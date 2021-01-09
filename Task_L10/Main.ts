namespace L10_Inheritance {
    interface Vector {
        x: number;
        y: number;
    }


    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;
    let posMountains: Vector = { x: 0, y: 340 };
    let moveables: Moveable[] = [];

    
    for (let i: number = 1; i < 400; i++) {
        moveables.push(new Snowflake(Math.floor(Math.random() * (340 + 1)), Math.floor(Math.random() * (600 + 1))));
    }
    
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    moveables.push(new Skier(340, 640, (Math.random() * 5) + 1));
    
    let imgData: ImageData;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: 300, y: 50 });
        drawCloud({ x: 100, y: 75 }, { x: 200, y: 50 });
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawSkiSlope();
        drawSkiLift({x: 0, y: 200});
        generateTrees();
        //Hintergrund speichern
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        window.setInterval(animate, 10);
}

    function drawSkiers(): void {
        console.log("draw skiers");
        for (let moveable of moveables) {
            moveable.update();
        }
    }

    function drawSnowflakes(): void {
        console.log("draw snowflakes");
        for (let moveable of moveables) {
            moveable.update();
        }
    }

    function animate(): void {
        console.log("animate");
        crc2.putImageData(imgData, 0, 0);
        drawSkiers();
        drawSnowflakes();
    }

    function drawSkiLift(_position: Vector): void {
        console.log("Lift", _position);
        
        crc2.save();  
        crc2.beginPath();
        crc2.strokeStyle = "black";
        crc2.moveTo(0, 30);
        crc2.lineTo(360, 320);
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
    
        crc2.translate(_position.x, _position.y); 
        crc2.restore(); 

        crc2.save();
        crc2.translate(0, 30); 

        for (let i: number = 0; i <= 7; i++) {
        
            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.moveTo(0, 0);
            crc2.translate(50, 40);

            crc2.moveTo(0, 0);
            crc2.lineTo(0, 30);
            crc2.lineTo(-25, 30);
            crc2.moveTo(12.5, 0);
           
            crc2.stroke();           
        }
        crc2.restore(); 
    }


    function generateTrees(): void {
        console.log("Trees");

        for (let i: number = 0; i < 7; i++) {
            let pos: Vector = getRandomCoordinate(110, 350, 400, 620);
            drawTree(pos); 
        }

    }

    function getRandomCoordinate(xMin: number, xMax: number, yMin: number, yMax: number): Vector {
        let x: number = getRandom(xMin, xMax);
        let y: number = getRandom(yMin, yMax);
        return {x, y};
    }

    function getRandom(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "aliceblue");
        gradient.addColorStop(1, "HSL(360, 0%, 100%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 10;
        let r2: number = 50;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(51, 100%, 50%, 1)");
        gradient.addColorStop(1, "HSLA(43, 74%, 75%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position);

        let nParticles: number = 30;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }
    
    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 640);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawSkiSlope(): void {
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

    function drawTree(pos: Vector): void {
        console.log("Trees", pos);

        let x: number = pos.x;
        let y: number = pos.y;

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

}