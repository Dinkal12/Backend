const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    // req.user is set by checkAuth middleware (may be undefined if not logged in)
    if (!req.user) return res.redirect("/login");
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,
        user: req.user,
    });
});

router.get("/signup", (req, res) => {
    return res.render("SignUp", { error: req.query.error || null });
});

router.get("/login", (req, res) => {
    return res.render("login", { error: req.query.error || null });
});

module.exports = router;
