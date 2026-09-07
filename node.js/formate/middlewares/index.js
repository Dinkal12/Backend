const fs = require("fs");

function logger(req, res, next) {
    const log = `Method: ${req.method} | URL: ${req.url} | Path: ${req.path} | Time: ${new Date().toISOString()}\n`;
    fs.appendFile("./log.txt", log, (err) => {
        if (err) console.error("Logger error:", err);
        next();  // always call next() so the request continues
    });
}

module.exports = { logger };
