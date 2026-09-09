const express = require("express");
const connectToMongoDB = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const staticRouter = require("./routes/staticRouter");
const app = express();
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const userRouter = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const PORT = 8000;

connectToMongoDB("mongodb://localhost:27017/URL-shortener")
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log(err);
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());

app.use("/", checkAuth, staticRouter);
app.use('/url',restrictToLoggedInUserOnly,urlRoute);
app.use('/user',userRouter);


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