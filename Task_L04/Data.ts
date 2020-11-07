namespace L04_witchCaldron {
    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }
}