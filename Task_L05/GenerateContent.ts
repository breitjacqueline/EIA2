namespace L05_witchCaldron {

    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }
    
    export function generateContent(_data: Data): void {
        for (let category in _data) {
            let items: Item[] = _data[category];
            let group: HTMLElement | null = null;
            switch (category) {
                case "Ingredients":
                    group = createMultiple(items, category);
                    break;
                
                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);       
            
        }
    }

    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        let idCounter: number = 0;
        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = "ing_cb_" + idCounter;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            label.id = "ing_name_" + idCounter;

            let amount: HTMLInputElement = document.createElement("input");
            amount.type = "number";
            amount.width = 50;
            amount.id = "ing_val_" + idCounter;

            idCounter = idCounter + 1;

            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(amount);
            group.appendChild(document.createElement("br"));
        }

        let button: HTMLInputElement = document.createElement("input");
        button.type = "button";
        button.id = "addIngredients";
        button.value = "add ingredient";
        group.appendChild(button);

        return group;
    }
}