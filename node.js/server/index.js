const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} New Request Recieved\n`;
    fs.appendFile("log.txt", log, (err, data) => { 
        
        switch (req.url) {
            case '/':
                res.end("Homepage");
                break;
            case '/about':
                res.end("About Page");
                break;
            default:
                res.end("404 Not Found");
        }

        console.log(req.url);
    });
});

myServer.listen(8000, () => {
    console.log("Server started on port 8000");
}); 