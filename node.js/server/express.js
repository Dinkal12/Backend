const http = require("http");
const fs = require("fs");
const express = require("express");
const url = require("url");

const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello from home page")
});
app.get("/about",(req,res)=>{
    const userId = req.query.id;
    return res.send(`Hello ${userId}`)
});

app.post("/signup",(req,res)=>{
    return res.send("Signup Page POST")
});

app.listen(8000,()=>{
    console.log("Server started on port 8000")
});