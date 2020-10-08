window.addEventListener ("load", myFunction); 

function myFunction(): void {
    var popup: string | null = prompt("Sag mir bitte deinen Namen");

    if (popup == null || popup == "") {
        document.querySelector("#text").innerHTML = "Willkommen " + popup;
    } else {
        document.querySelector("#text").innerHTML = "Willkommen " + popup;
    }
}
