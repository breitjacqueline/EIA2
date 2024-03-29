"use strict";
var L06_witchCaldron;
(function (L06_witchCaldron) {
    window.addEventListener("load", handleLoad);
    let totalPrice = 0;
    let form;
    let url = "http://localhost:5001";
    let response;
    let data;
    async function handleLoad(_event) {
        console.log("Start");
        form = document.querySelector("form#orderForm");
        response = await fetch("Data.json");
        let offer = await response.text();
        data = JSON.parse(offer);
        //fill content
        L06_witchCaldron.generateContent(data);
        let submit = document.querySelector("button[type=button]");
        submit.addEventListener("click", sendOrder);
        let recipeContainer = document.querySelector("div#recipeContainer");
        let result = document.createElement("div");
        result.id = "result";
        recipeContainer.appendChild(result);
        let totalPrice = document.createElement("p");
        totalPrice.id = "totalPrice";
        result.appendChild(totalPrice);
        let name = document.querySelector("input#name");
        name.addEventListener("change", handleChange);
        let effect = document.querySelector("select#effect");
        effect.addEventListener("change", handleChange);
        let duration = document.querySelector("input#duration");
        duration.addEventListener("change", handleChange);
        let buttonIngredients = document.querySelector("input#addIngredients");
        buttonIngredients.addEventListener("click", handleIngrediengts);
        let buttonTemperature = document.querySelector("input#addTemperature");
        buttonTemperature.addEventListener("click", handleTemperature);
        let buttonStir = document.querySelector("input#addStir");
        buttonStir.addEventListener("click", handleStir);
    }
    async function sendOrder(_event) {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function addToTotalPrice(_priceToAdd) {
        totalPrice = totalPrice + _priceToAdd;
        updateTotalPrice();
    }
    function updateTotalPrice() {
        let priceLabel = document.querySelector("p#totalPrice");
        priceLabel.innerHTML = "Total Price: " + totalPrice;
    }
    function handleIngrediengts(_event) {
        let ingLength = data["Ingredients"].length;
        let ingList = document.createElement("ol");
        let recipe = document.querySelector("div#recipe");
        recipe.appendChild(ingList);
        for (let i = 0; i < ingLength; i++) {
            let checkbox = document.querySelector("#ing_cb_" + i);
            let label = document.querySelector("#ing_name_" + i);
            let value = document.querySelector("#ing_val_" + i);
            if (checkbox.checked) {
                let amount = value.valueAsNumber;
                let name = data["Ingredients"][i].name;
                let price = data["Ingredients"][i].price;
                let ingItem = document.createElement("li");
                let sumPrice = price * amount;
                ingItem.innerHTML = "Add  " + name + ", amount: " + amount + ", price: " + sumPrice;
                ingList.appendChild(ingItem);
                addToTotalPrice(sumPrice);
            }
        }
    }
    function handleTemperature(_event) {
        let cool = document.querySelector("#cool");
        let heat = document.querySelector("#heat");
        let recipe = document.querySelector("div#recipe");
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            switch (entry[0]) {
                case "Temperature":
                    if (entry[1] != "")
                        recipe.innerHTML += "<br>" + entry[1];
                    break;
                case "Degree":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += " to " + entry[1] + " C°";
                    break;
                case "Color":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += " until color is " + entry[1] + "." + "<br>";
                    break;
            }
        }
    }
    function handleStir(_event) {
        let intensity = false;
        let recipe = document.querySelector("div#recipe");
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            switch (entry[0]) {
                case "Stir":
                    if (Number(entry[1]) != 0)
                        recipe.innerHTML += "Stir with an intensity of " + entry[1] + " U/min";
                    intensity = true;
                    break;
                case "Time":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += " for " + entry[1] + " minutes";
                    break;
                case "Consistency":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += " until consistency is " + entry[1] + "." + "<br>" + "<br>";
                    break;
            }
        }
    }
    function handleChange(_event) {
        let recipe = document.querySelector("div#recipe");
        recipe.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "")
                        recipe.innerHTML += "Name: " + entry[1] + "<br>";
                    break;
                case "description":
                    if (entry[1] != "")
                        recipe.innerHTML += "Description, risks & side effects: " + entry[1] + "<br>";
                    break;
                case "Effect":
                    if (entry[1] != "None")
                        recipe.innerHTML += "Effect: " + entry[1] + "<br>";
                    break;
                case "duration":
                    if (entry[1] != "")
                        recipe.innerHTML += "Duration: " + entry[1] + "Stunde(n)" + "<br>" + "<br>";
                    break;
            }
        }
    }
})(L06_witchCaldron || (L06_witchCaldron = {}));
//# sourceMappingURL=witchCaldron.js.map