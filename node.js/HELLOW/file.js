const fs = require("fs");

// Sync (Blocking) -->  fs.writeFileSync("hello.txt", "Hello World");   

// Async (Non blocking operation)
 fs.writeFile("hello.txt", "Hello World", (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("File written successfully");
                }
});

/*
Sync --> 

const result = fs.readFileSync("hello.txt");
console.log(result);

Async -->

fs.readFile("hello.txt", (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
});    

Sync --> 

fs.appendFileSync("hello.txt", "Hello World");

Async -->

fs.appendFile("hello.txt", "Hello World", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File appended successfully");
    }
});     

fs.stat("hello.txt", (err, stats) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(stats);
    }
}); 

fs.unlinkSync("hello.txt");

fs.deleteFile("hello.txt", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File deleted successfully");
    }
});     

fs.mkdirSync("hello");
*/
