"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const FS = require("fs"); //File-System, Dateien auslesen, verschieben usw. vom Rechner
const Mongo = require("mongodb");
var Firework;
(function (Firework) {
    let port = process.env.PORT;
    if (port == undefined)
        port = 5000;
    let clientfolder = __dirname + "/../Client/";
    let fireworks;
    let DatabaseUrl = "mongodb+srv://jacyb:XGHzX2TpMuyUdY8J@eia2.6l8hq.mongodb.net/Final_Task?retryWrites=true&w=majority";
    let DatabaseName = "fireworks";
    let DatabaseCollectionName = "fireworks";
    let fireworksData;
    const server = Http.createServer(requestHandler);
    server.listen(port);
    console.log("started Server on port: " + port);
    connectToDatabase(DatabaseUrl);
    function requestHandler(_request, _response) {
        let responseHtml = "";
        _response.setHeader("Acces-Control-Allow-Origin", "*"); // Wer darf auf Server zugreifen --> * jeder darf
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            console.log(url);
            if (url.pathname == "/") {
                let previousFireworks = "";
                try {
                    previousFireworks = createFireworkButtons();
                }
                catch (e) {
                    console.log("Error: " + e);
                }
                if (previousFireworks == "" || previousFireworks == undefined)
                    previousFireworks = "<div>No previous fireworks found</div>";
                responseHtml = getHtmlTemplate(clientfolder + "index.html").replace("[FIREWORKS]", previousFireworks);
            }
            else if (url.pathname == "/firework") {
                responseHtml = getHtmlTemplate(clientfolder + "firework.html");
                if (url.query.save != "no")
                    storeFirework(url.query);
                getFireworks();
            }
            else {
                _response.setHeader("content-type", getMediaType(url.pathname + ""));
                try {
                    responseHtml = getHtmlTemplate(clientfolder + url.pathname);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        if (responseHtml == "" || responseHtml == undefined) {
            responseHtml = "<h1>Fehler404: Die aufgerufene Seite wurde nicht gefunden</h1>";
            _response.writeHead(404); //danach kann kein neuer Header hinzugefügt werden
        }
        else {
            _response.writeHead(200); //danach kann kein neuer Header hinzugefügt werden, 200 = ok
            _response.write(responseHtml);
        }
        _response.end();
    }
    function getHtmlTemplate(filename) {
        return FS.readFileSync(filename, "utf8");
    }
    function getMediaType(filename) {
        if (filename.substr(filename.length - 4) == ".css")
            return "text/css; charset=utf-8";
        else if (filename.substr(filename.length - 3) == ".js")
            return "text/javascript; charset=utf-8";
        else
            return "text/html; charset=utf-8";
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        fireworks = mongoClient.db("Final_Task").collection("Fireworks");
        console.log("Database connection ", fireworks != undefined);
    }
    // async function connectToDatabase(_url: string): Promise<void> {
    //     let options: Mongo.MongoClientOptions = {
    //         useNewUrlParser: true, useUnifiedTopology: true
    //     };
    //     let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    //     await mongoClient.connect();
    //     fireworks = mongoClient.db(DatabaseName).collection(DatabaseCollectionName);
    //     console.log("database connection", fireworks != undefined);
    //     if (fireworks != undefined) getFireworks();
    // }
    function getFireworks() {
        fireworks.find().toArray(function (err, docs) {
            fireworksData = docs;
        });
    }
    function storeFirework(_firework) {
        for (let key in _firework)
            if (!(/[0-9A-Fa-f]{6}/g).test(key))
                delete _firework[key];
        fireworks.insertOne(_firework);
    }
    function createFireworkButtons() {
        let tempCode = "";
        for (let tempIndex = 0; tempIndex < fireworksData.length; tempIndex++) {
            tempCode = tempCode + "<div class='previous-firework-wrapper'><a class='previous-firework-button' href='/firework?";
            for (var color in fireworksData[tempIndex])
                if (color != "_id")
                    tempCode += color + "=" + fireworksData[tempIndex][color] + "&";
            tempCode = tempCode + "save=no&";
            tempCode = tempCode.slice(0, -1);
            tempCode = tempCode + "'>Previous Firework:&nbsp;";
            for (var color in fireworksData[tempIndex])
                if (color != "_id")
                    tempCode += "<span style='background-color:#" + color + "'>" + fireworksData[tempIndex][color] + "</span>;&nbsp;";
            tempCode = tempCode + "</a></div>";
        }
        return tempCode;
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=Server.js.map