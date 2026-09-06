const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.method} : ${req.url} New Request Recieved\n`;
    fs.appendFile("log.txt", log, (err) => { 
        if (err) {
            console.error("Failed to write log:", err);
            res.end("Internal Server Error");
            return;
        }

        const myUrl = url.parse(req.url, true);
        console.log(myUrl);
        
        switch (myUrl.pathname) {
            case '/':
                res.end("Homepage");
                break;
            case '/about':
                res.end("About Page");
                break;
            case '/signup':
                if (req.method === "GET") res.end("Signup Page");
                else if (req.method === "POST") {
                    res.end("Signup Page POST");
                } 
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server started on port 8000");
}); 


// URL Parameters : https://www.youtube.com/watch?v=N5-F8eJ391c&list=PLRBtndIRw8bCIo8Qp_W3aMhK1S6s5k38S&index=16

//  HTTPS + DOMAIN + PATH + QUERY + FRAGMENT