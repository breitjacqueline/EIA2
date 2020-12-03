import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_witchCaldron {

    interface Recipe {
        [type: string]: string | string[] | undefined;
    }

    let recipes: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;
    
    let databaseUrl: string = "mongodb+srv://jacyb:XGHzX2TpMuyUdY8J@eia2.6l8hq.mongodb.net/witchCaldron?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer();
    console.log("Server starting on port:" + _port);

    server.listen(_port);
    server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        recipes = mongoClient.db("witchCaldron").collection("Orders");
        console.log("Database connection ", recipes != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let command: string | string[] | undefined = url.query["command"];
            
            if (command == "retrieve") {
                handleRetrieveRecipe(_request, _response);
            } else {
                showRecipes(_request, _response);
            }
        }
    }
   
    function storeRecipes(_order: Recipe): void {
        recipes.insertOne(_order);  
    }

    function showRecipes(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRecipes(<Recipe>url.query);
        }
        _response.end();
    }

    async function handleRetrieveRecipe(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let allRecipes: Mongo.Cursor = recipes.find();
        let allRecipesString: string[] = await allRecipes.toArray();

        for (let recipe of allRecipesString) {
            for (let key in Object(recipe)) {
                _response.write(key + ": " + Object(recipe)[key] + "\n");
            }
            _response.write("\n");
        }
        _response.end();
    }

}

