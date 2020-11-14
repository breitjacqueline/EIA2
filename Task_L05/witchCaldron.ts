namespace L05_witchCaldron {
    window.addEventListener("load", handleLoad);
    let totalPrice: number = 0;
    let form: HTMLFormElement;

    let response: Response;
    let data: Data;

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Start");

        form = <HTMLFormElement>document.querySelector("form#orderForm");
        response = await fetch("Data.json");
        let offer: string = await response.text();
        data = JSON.parse(offer);

        //fill content
        generateContent(data);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        submit.addEventListener("click", sendOrder);

        let recipeContainer: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipeContainer");
        let result: HTMLDivElement = document.createElement("div");
        result.id = "result";
        recipeContainer.appendChild(result);
        let totalPrice: HTMLElement = document.createElement("p");
        totalPrice.id = "totalPrice";
        result.appendChild(totalPrice);
        
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("input#name");
        name.addEventListener("change", handleChange);

        let effect: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#effect");
        effect.addEventListener("change", handleChange);

        let duration: HTMLInputElement = <HTMLInputElement>document.querySelector("input#duration");
        duration.addEventListener("change", handleChange);

        let buttonIngredients: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addIngredients");
        buttonIngredients.addEventListener("click", handleIngrediengts);

        let buttonTemperature: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addTemperature");
        buttonTemperature.addEventListener("click", handleTemperature);
        
        let buttonStir: HTMLInputElement = <HTMLInputElement>document.querySelector("input#addStir");
        buttonStir.addEventListener("click", handleStir);
        
        
    }

    async function sendOrder(_event: Event): Promise<void> {
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("index.html?" + query.toString());
        alert("Order sent!");
    }

    function addToTotalPrice(_priceToAdd: number): void {
        totalPrice = totalPrice + _priceToAdd;
        updateTotalPrice();

    }

    function updateTotalPrice(): void {
        let priceLabel: HTMLElement = <HTMLElement>document.querySelector("p#totalPrice");
        priceLabel.innerHTML = "Total Price: " + totalPrice;
    }

    function handleIngrediengts(_event: Event): void {

        let ingLength: number = data["Ingredients"].length;

        let ingList: HTMLElement = document.createElement("ol");
        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");
        recipe.appendChild(ingList);


        for (let i: number = 0; i < ingLength; i++) {
            let checkbox: HTMLInputElement = <HTMLInputElement>document.querySelector("#ing_cb_" + i);
            let label: HTMLLabelElement = <HTMLLabelElement>document.querySelector("#ing_name_" + i);
            let value: HTMLInputElement = <HTMLInputElement>document.querySelector("#ing_val_" + i);

            if (checkbox.checked) {
                let amount: number = value.valueAsNumber;
                let name: string = data["Ingredients"][i].name;
                let price: number = data["Ingredients"][i].price;
                
                let ingItem: HTMLElement = document.createElement("li");
                let sumPrice: number = price * amount;
                ingItem.innerHTML = "Add" + name + ", amount: " + amount + ", price: " + sumPrice;
                ingList.appendChild(ingItem);
                addToTotalPrice(sumPrice);
                

            }
        }
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

    function handleStir(_event: Event): void {
        let intensity: boolean = false;
        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");
        
        let formData: FormData = new FormData(document.forms[0]);
        
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

    function handleChange(_event: Event): void {
       
        let recipe: HTMLDivElement = <HTMLDivElement>document.querySelector("div#recipe");
        recipe.innerHTML = "";
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
            }
            
        }

    }
}