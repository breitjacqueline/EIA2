window.addEventListener("load", myFunction);
function myFunction() {
    var popup = prompt("Sag mir bitte deinen Namen");
    if (popup == null || popup == "") {
        document.querySelector("#text").innerHTML = "Willkommen " + popup;
    }
    else {
        document.querySelector("#text").innerHTML = "Willkommen " + popup;
    }
}
//# sourceMappingURL=Aufgabe_00.js.map