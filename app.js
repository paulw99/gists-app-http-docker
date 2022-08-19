// Constants

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var lastrun = ""
var since

const http = require("http");
const { getReqData } = require("./utils");
const PORT = 8080;
const HOST = "localhost";
const server = http.createServer(async (req, res) => 
{
    async function callURL(id,since) {
        try {
            const theURL = `https://api.github.com/users/${id}/gists?since=${since}`
            //console.log(`theURL=${theURL}`)
            const response = await fetch(`${theURL}`);
            const body = await response.text();
            // if there was a successful response update the lastrun time
            if (response.status == 200) {
                lastrun=new Date().toISOString(); //"2022-06-13T22:30:00Z"
                res.writeHead(200, { "Content-Type": "application/json" });
            }
            // output body
            if ( body == "[]" ) {
                res.end(JSON.stringify("No new gists found"))         }
            else
            { 
                //const obj = JSON.parse(body);
                //var text = []
                
                //for (var key in obj){
                //    text += '"id":"' + obj[key].id 
                //}        
    
                res.end(JSON.stringify(body)) 
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    console.log("Called " + req.method + " : " + req.url);
    if (req.url === "/" && req.method === "GET") {
        res.end(`Welcome to your API Web Server\n 
        For GitHub user gists please try running one of the following options:\n
        http://0.0.0.0:8080/api/gists/<user>\n 
        http://0.0.0.0:8080/api/gists/<user>?since=<timestamp>\n
          where user is a valid github user\n
                timestamp the starting point of the search which should be in ISO 8601 format i.e YYYY-MM-DDTHH:MM:SSZ` );
        res.writeHead(200, { "Content-Type": "application/json" });
    }
    else if (req.url.match(/\/api\/gists\/([a-z0-9].+\b)?since=/) && req.method === "GET") {
        // console.log("Called GET : 0.0.0.0:8080/gists/{id}?");
        const split1 = req.url.split("/")[3];
        id = split1.substring(0, split1.indexOf('?since='))
        since = req.url.split("?since=")[1];
        callURL(id,since)
    }

    //Get gists for a user from the last run time
    else if (req.url.match(/\/api\/gists\/([a-z0-9]+)$/) && req.method === "GET") {
        //console.log("Called GET : 0.0.0.0:8080/gists/{id}");
        id = req.url.split("/")[3];
        since = lastrun
        callURL(id,since)
    }

    // No route present
    else {
        console.log(
            "This endpoint is not implemented / unavailable at the moment !!"
        );
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
     console.log(`server started on ${HOST}  port: ${PORT}`);
//     console.log(`server started on port: ${PORT}`);
});
