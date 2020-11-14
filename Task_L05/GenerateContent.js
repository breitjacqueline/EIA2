"use strict";
var L05_witchCaldron;
(function (L05_witchCaldron) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Ingredients":
                    group = createMultiple(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    L05_witchCaldron.generateContent = generateContent;
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        let idCounter = 0;
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = "ing_cb_" + idCounter;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            label.id = "ing_name_" + idCounter;
            let amount = document.createElement("input");
            amount.type = "number";
            amount.width = 50;
            amount.id = "ing_val_" + idCounter;
            idCounter = idCounter + 1;
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(amount);
            group.appendChild(document.createElement("br"));
        }
        let button = document.createElement("input");
        button.type = "button";
        button.id = "addIngredients";
        button.value = "add ingredient";
        group.appendChild(button);
        return group;
    }
})(L05_witchCaldron || (L05_witchCaldron = {}));
//# sourceMappingURL=GenerateContent.js.map