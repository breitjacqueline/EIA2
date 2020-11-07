"use strict";
var L03_witchCaldron;
(function (L03_witchCaldron) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        form.addEventListener("change", handleChange);
        // let buttonText: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addText");
        // buttonText.addEventListener("click", handleButton);
        let buttonTemperature = document.querySelector("input#addTemperature");
        buttonTemperature.addEventListener("click", handleTemperature);
        let buttonStir = document.querySelector("input#addStir");
        buttonStir.addEventListener("click", handleStir);
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
                        recipe.innerHTML += "<br>" + "Temperature: " + entry[1] + "<br>";
                    break;
                case "Degree":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "Until C° = " + entry[1] + "<br>";
                    break;
                case "Color":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "Until Color = " + entry[1] + "<br>";
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
                        recipe.innerHTML += "<br>" + "Stirring intensity: " + entry[1] + "<br>";
                    intensity = true;
                    break;
                case "Time":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += "Stir for: " + entry[1] + " minutes" + "<br>";
                    break;
                case "Consistency":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += "Stir until consistency is " + entry[1] + "<br>";
                    break;
            }
        }
    }
    function handleChange(_event) {
        let wormwood = document.querySelector("#wormwood");
        let slothBrain = document.querySelector("#slothBrain");
        let rosePetals = document.querySelector("#rosePetals");
        let moonstone = document.querySelector("#moonstone");
        let knotgrass = document.querySelector("#knotgrass");
        let skin = document.querySelector("#skin");
        let horn = document.querySelector("#horn");
        let asphodel = document.querySelector("#asphodel");
        let recipe = document.querySelector("div#recipe");
        recipe.innerHTML = "";
        let totalPrice = 0;
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
                case "Ingredients":
                    if (entry[1] != "")
                        recipe.innerHTML += "Ingredients: " + entry[1] + "<br>";
                    break;
                case "wormwood amount":
                    if (entry[1] != "" && wormwood.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 2 * Number(entry[1]);
                    }
                    break;
                case "brain amount":
                    if (entry[1] != "" && slothBrain.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 4 * Number(entry[1]);
                    }
                    break;
                case "rose amount":
                    if (entry[1] != "" && rosePetals.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 1 * Number(entry[1]);
                    }
                    break;
                case "moonstone amount":
                    if (entry[1] != "" && moonstone.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 6 * Number(entry[1]);
                    }
                    break;
                case "knotgrass amount":
                    if (entry[1] != "" && knotgrass.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 2 * Number(entry[1]);
                    }
                    break;
                case "skin amount":
                    if (entry[1] != "" && skin.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 3 * Number(entry[1]);
                    }
                    break;
                case "horn amount":
                    if (entry[1] != "" && horn.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 5 * Number(entry[1]);
                    }
                    break;
                case "asphodel amount":
                    if (entry[1] != "" && asphodel.checked) {
                        recipe.innerHTML += "Amount: " + entry[1] + "<br>";
                        totalPrice += 2 * Number(entry[1]);
                    }
                    break;
            }
        }
        recipe.innerHTML += "<br>" + "Total Price: " + totalPrice.toFixed(2) + " Galleonen";
    }
})(L03_witchCaldron || (L03_witchCaldron = {}));
//# sourceMappingURL=witchCaldron.js.map