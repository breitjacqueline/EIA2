"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Http = require("http");
var Url = require("url");
var FS = require("fs"); //File-System, Dateien auslesen, verschieben usw. vom Rechner
var Mongo = require("mongodb");
var Firework;
(function (Firework) {
    var port = process.env.PORT;
    if (port == undefined)
        port = 5000;
    var fireworks;
    var DatabaseUrl = "mongodb+srv://jacyb:XGHzX2TpMuyUdY8J@eia2.6l8hq.mongodb.net/Final_Task?retryWrites=true&w=majority";
    var DatabaseName = "fireworks";
    var DatabaseCollectionName = "fireworks";
    var fireworksData;
    var server = Http.createServer(requestHandler);
    server.listen(port);
    console.log("started Server on port: " + port);
    connectToDatabase(DatabaseUrl);
    function requestHandler(_request, _response) {
        var responseHtml = "";
        _response.setHeader("Acces-Control-Allow-Origin", "*"); // Wer darf auf Server zugreifen --> * jeder darf
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            var url = Url.parse(_request.url, true);
            console.log(url);
            if (url.pathname == "/") {
                var previousFireworks = createFireworkButtons();
                if (previousFireworks == "" || previousFireworks == undefined)
                    previousFireworks = "<div>No previous fireworks found</div>";
                responseHtml = getHtmlTemplate("../Client/index.html").replace("[FIREWORKS]", previousFireworks);
            }
            else if (url.pathname == "/firework") {
                responseHtml = getHtmlTemplate("../Client/firework.html");
                if (url.query.save != "no")
                    storeFirework(url.query);
                getFireworks();
            }
            else {
                _response.setHeader("content-type", getMediaType(url.pathname + ""));
                try {
                    responseHtml = getHtmlTemplate("../Client/" + url.pathname);
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
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function () {
            var options, mongoClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { useNewUrlParser: true, useUnifiedTopology: true };
                        mongoClient = new Mongo.MongoClient(_url, options);
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1:
                        _a.sent();
                        fireworks = mongoClient.db("Final_Task").collection("Fireworks");
                        console.log("Database connection ", fireworks != undefined);
                        return [2 /*return*/];
                }
            });
        });
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
        for (var key in _firework)
            if (!(/[0-9A-Fa-f]{6}/g).test(key))
                delete _firework[key];
        fireworks.insertOne(_firework);
    }
    function createFireworkButtons() {
        var tempCode = "";
        for (var tempIndex = 0; tempIndex < fireworksData.length; tempIndex++) {
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
