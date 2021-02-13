namespace Firework {
    let canvas: any;
    let canvasContext: CanvasRenderingContext2D;
    let width: number;
    let height: number;
    let rockets: Rocket[] = [];
    let particles: Particle[] = [];
    let chosenRockets: any = {};
    let refreshInterval: any;

    function setup(): void {
        canvas = document.getElementById("canvas");
        canvasContext = canvas.getContext("2d");
        windowResized();
        setChosenRockets();
        window.addEventListener("resize", windowResized);
        // console.log(chosenRockets);
    }

    function loop(): void {
        canvasContext.globalAlpha = 0.1;
        setCanvasStyle();
        canvasContext.globalAlpha = 1;
        iterateFireworkObjects();
        if (Math.random() < 1 / 60 && rocketStillExist()) 
        rockets.push(new Rocket(Math.random() * (width - 200) + 100, height, randomColor())); 
    }

    function randomColor(): string {
        let colorKeys: string[] = Object.keys(chosenRockets);
        let colorId: number = -1;
        while (colorId == -1 || chosenRockets[colorKeys[colorId]] < 1)
            colorId = Math.floor(Math.random() * colorKeys.length);
        chosenRockets[colorKeys[colorId]] -= 1;
        return "#" + colorKeys[colorId];
    }

    function setSize(): void {
        canvas.style.width = (innerWidth) + "px";
        canvas.style.height = (innerHeight) + "px";
        width = innerWidth;
        height = innerHeight;
        canvas.width = innerWidth * window.devicePixelRatio;
        canvas.height = innerHeight * window.devicePixelRatio;
        canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function windowResized(): void {
        setSize();
        setCanvasStyle();
    }

    function setCanvasStyle(): void {
        canvasContext.fillStyle = "#000000";
        canvasContext.fillRect(0, 0, width, height);
    }

    function setChosenRockets(): void {
        for (let rocketColor of window.location.search.substring(1).split("&")) {
            let tempArray: string[] = rocketColor.split("=");
            if (/[0-9A-Fa-f]{6}/g.test(tempArray[0])) chosenRockets[tempArray[0]] = tempArray[1];
        }
    }

    function rocketStillExist(): boolean {
        let colorKeys: string[] = Object.keys(chosenRockets);
        for (let i: number = 0; i < colorKeys.length; i++) {
            if (!(chosenRockets[colorKeys[i]] * 1 === parseInt((chosenRockets[colorKeys[i]]), 10))) chosenRockets[colorKeys[i]] = 0;
            if (chosenRockets[colorKeys[i]] > 0) return true;
        }
        //Überprüft ob noch Raketen oder Partikel dargestellt werden, sobald keine mehr dargestellt werden und auch keine neue Rakete mehr existiert, stoppt die Ausfühung, durch Löschung des Intervalls
        if (particles.length == 0 && rockets.length == 0) clearInterval(refreshInterval);
        return false;
    }

    function iterateFireworkObjects(): void {
        for (let i: number = 0; i < rockets.length; i++) {
            particles = rockets[i].update(particles);
            rockets[i].draw(canvasContext);
            if (rockets[i].isBlown) rockets.splice(i, 1);
        } 
        for (let i: number = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(canvasContext);
            if (particles[i].lifetime > 80) particles.splice(i, 1);
        } 
    }

    setTimeout(setup, 1);
    refreshInterval = setInterval(loop, 1 / 60);
}