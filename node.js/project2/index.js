const express = require("express");
const connectToMongoDB = require("./connection");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const app = express();
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const PORT = 8000;

connectToMongoDB("mongodb://localhost:27017/URL-shortener")
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log(err);
})
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",staticRouter);
app.use('/url',urlRoute)

app.get("/test/:shortId", async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{
        $push : {
            visitedHistory : {
                timestamp : Date.now(),
            },
        },
        $inc : { totalClicks : 1 },
    });
    res.redirect(entry.redirectedUrl);
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))