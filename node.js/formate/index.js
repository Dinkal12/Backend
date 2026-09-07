const express = require("express");
const { connectDb } = require("./connetion");
const { logger } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Middleware - parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware - logger
app.use(logger);

// Routes
app.use("/api/users", userRouter);

// Start server only after DB connects
connectDb("mongodb://127.0.0.1:27017/formate")
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log("Server is running at port", PORT));
    })
    .catch(err => {
        console.log("DB Connection Error:", err);
    });
