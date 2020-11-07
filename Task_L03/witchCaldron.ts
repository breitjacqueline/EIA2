namespace L03_witchCaldron {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Start");
        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
        form.addEventListener("change", handleChange);

        // let buttonText: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addText");
        // buttonText.addEventListener("click", handleButton);

        let buttonTemperature: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addTemperature");
        buttonTemperature.addEventListener("click", handleTemperature);
        
        let buttonStir: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addStir");
        buttonStir.addEventListener("click", handleStir);
    }
    
    function handleTemperature(_event: Event): void {
        let cool: HTMLFormElement = <HTMLFormElement>document.querySelector("#cool");
        let heat: HTMLFormElement = <HTMLFormElement>document.querySelector("#heat");

        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");

        let formData: FormData = new FormData(document.forms[0]);

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

    function handleStir(_event: Event): void {
        let intensity: boolean = false;
        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");
        
        let formData: FormData = new FormData(document.forms[0]);
        
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

    function handleChange(_event: Event): void {
        let wormwood: HTMLFormElement = <HTMLFormElement>document.querySelector("#wormwood");
        let slothBrain: HTMLFormElement = <HTMLFormElement>document.querySelector("#slothBrain");
        let rosePetals: HTMLFormElement = <HTMLFormElement>document.querySelector("#rosePetals");
        let moonstone: HTMLFormElement = <HTMLFormElement>document.querySelector("#moonstone");
        let knotgrass: HTMLFormElement = <HTMLFormElement>document.querySelector("#knotgrass");
        let skin: HTMLFormElement = <HTMLFormElement>document.querySelector("#skin");
        let horn: HTMLFormElement = <HTMLFormElement>document.querySelector("#horn");
        let asphodel: HTMLFormElement = <HTMLFormElement>document.querySelector("#asphodel");

        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");
        recipe.innerHTML = "";

        let totalPrice: number = 0;
        let formData: FormData = new FormData(document.forms[0]);

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
    
}