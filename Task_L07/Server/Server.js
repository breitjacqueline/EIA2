"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_witchCaldron;
(function (L07_witchCaldron) {
    let recipes;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://jacyb:XGHzX2TpMuyUdY8J@eia2.6l8hq.mongodb.net/witchCaldron?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        recipes = mongoClient.db("witchCaldron").collection("Orders");
        console.log("Database connection ", recipes != undefined);
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            if (command == "retrieve") {
                handleRetrieveRecipe(_request, _response);
            }
            else {
                showRecipes(_request, _response);
            }
        }
    }
    function storeRecipes(_order) {
        recipes.insertOne(_order);
    }
    function showRecipes(_request, _response) {
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRecipes(url.query);
        }
        _response.end();
    }
    async function handleRetrieveRecipe(_request, _response) {
        let allRecipes = recipes.find();
        let allRecipesString = await allRecipes.toArray();
        for (let recipe of allRecipesString) {
            for (let key in Object(recipe)) {
                _response.write(key + ": " + Object(recipe)[key] + "\n");
            }
            _response.write("\n");
        }
        _response.end();
    }
})(L07_witchCaldron = exports.L07_witchCaldron || (exports.L07_witchCaldron = {}));
//# sourceMappingURL=Server.js.map