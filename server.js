var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var gracze = [];
var color;

var danePionka = null;

function servResponse(req, res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var finish = qs.parse(allData);
        if(finish.action == "takingLogin")
        {
            if(gracze.length < 2)
            {
                switch (gracze.length) {
                    case 0:
                        color = "białymi";
                        break;
                    
                    case 1:
                        color = "czarnymi";
                        break;
                
                    default:
                        break;
                }
                let zalogowany = false;
  
                gracze.forEach(element => {
                    if(element == finish.login)
                    {
                        zalogowany = true;
                    }
                });
    
                if(zalogowany == false)
                {
                    gracze.push(finish.login);
                    res.end("Udało Ci się zalogować, twój login: " + finish.login + ", będziesz grać " + color);
                }
                else
                {
                    res.end("Twój login jest używany przez innego zawodnika");
                }
            }
            else
            {
                res.end("Jest za dużo graczy, nie wejdziesz :(");
            }
        }
        else if(finish.action == "waiting")
        {
            if(gracze.length == 2)
            {
                res.end("true");
            }
            else
            {
                res.end("false");
            }
        }
        else if(finish.action == "reset")
        {
            gracze = [];
            res.end("Nie ma teraz żadnych graczy, możesz dołączyć do gry");
        }
        else if(finish.action == "movedPawn")
        {
            if(danePionka != JSON.parse(finish.pawn))
            {
                danePionka = [JSON.parse(finish.pawn),JSON.parse(finish.place)];
            }
            res.end("haha")
        }
        else if(finish.action == "parameters")
        {
            //console.log(finish);
            res.end(JSON.stringify(danePionka));
        }
    })
}

var server = http.createServer(function (req, res) {
   // console.log(req.url)
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".js")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".jpg")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".png")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".gif")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/gif' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".otf")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            servResponse(req, res);
            break;

    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});