namespace L10_Inheritance {
    export class Moveable {
        x: number;
        y: number;

        constructor (_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        draw(): void {
            // console.log("moveable draw");
        }

        update(): void {
            // console.log("moveable update");
    }

    }
}