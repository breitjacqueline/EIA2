import * as Http from "http";
import * as Url from "url";
import * as FS from "fs"; //File-System, Dateien auslesen, verschieben usw. vom Rechner
import * as Mongo from "mongodb";

namespace Firework {
    let port: number | string  | undefined = process.env.PORT;
    if (port == undefined) port = 5000;
    let fireworks: Mongo.Collection;
    let DatabaseUrl: string = "mongodb+srv://jacyb:XGHzX2TpMuyUdY8J@eia2.6l8hq.mongodb.net/Final_Task?retryWrites=true&w=majority";
    let DatabaseName: string = "fireworks";
    let DatabaseCollectionName: string = "fireworks";
    let fireworksData: string[] | any;

    const server: Http.Server = Http.createServer(requestHandler);
    server.listen(port);
    console.log("started Server on port: " + port);
    connectToDatabase(DatabaseUrl);

    function requestHandler(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        let responseHtml: string = "";
        _response.setHeader("Acces-Control-Allow-Origin", "*"); // Wer darf auf Server zugreifen --> * jeder darf
        _response.setHeader("content-type", "text/html; charset=utf-8");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            console.log(url);
            if (url.pathname == "/") {
                let previousFireworks: string = createFireworkButtons();
                if (previousFireworks == "" || previousFireworks == undefined) previousFireworks = "<div>No previous fireworks found</div>";
                responseHtml = getHtmlTemplate("../Client/index.html").replace("[FIREWORKS]", previousFireworks);
            } else if (url.pathname == "/firework") { 
                responseHtml = getHtmlTemplate("../Client/firework.html");  
                if (url.query.save != "no") storeFirework(url.query);
                getFireworks();         
            } else {
                _response.setHeader("content-type", getMediaType(url.pathname + ""));
                try {
                    responseHtml = getHtmlTemplate("../Client/" + url.pathname);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        if (responseHtml == "" || responseHtml == undefined) {
            responseHtml = "<h1>Fehler404: Die aufgerufene Seite wurde nicht gefunden</h1>";
            _response.writeHead(404); //danach kann kein neuer Header hinzugefügt werden
        } else {
            _response.writeHead(200); //danach kann kein neuer Header hinzugefügt werden, 200 = ok
            _response.write(responseHtml);
            
        }
        
                   
       
        
        _response.end();
    }

    function getHtmlTemplate(filename: string): string {
        return FS.readFileSync(filename, "utf8");
    }

    function getMediaType(filename: string): string {
        if (filename.substr(filename.length - 4) == ".css") return "text/css; charset=utf-8";
        else if (filename.substr(filename.length - 3) == ".js") return "text/javascript; charset=utf-8";
        else return "text/html; charset=utf-8";
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
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

    function getFireworks(): void {
        fireworks.find().toArray(function(err, docs) {
            fireworksData = docs;
        });
    }

    function storeFirework(_firework: any): void {
        for (let key in _firework) if (!(/[0-9A-Fa-f]{6}/g).test(key)) delete _firework[key];
        fireworks.insertOne(_firework);
    }

    function createFireworkButtons(){
        let tempCode:string = "";
        for (let tempIndex = 0; tempIndex < fireworksData.length; tempIndex++){
            tempCode = tempCode + "<div class='previous-firework-wrapper'><a class='previous-firework-button' href='/firework?";
            for (var color in fireworksData[tempIndex])
                if(color != "_id")
                    tempCode += color + "=" + fireworksData[tempIndex][color] + "&";
            tempCode = tempCode + "save=no&";
            tempCode = tempCode.slice(0, -1);
            tempCode = tempCode + "'>Previous Firework:&nbsp;";
            for (var color in fireworksData[tempIndex])
                if(color != "_id")
                    tempCode += "<span style='background-color:#" + color + "'>" + fireworksData[tempIndex][color] + "</span>;&nbsp;";
            tempCode = tempCode + "</a></div>";
        }
        return tempCode;
    }
}