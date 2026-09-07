const express = require("express");
const { handleGenerateNewURL } = require("../controllers/url");

const router = express.Router();

router.post("/",handleGenerateNewURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;
