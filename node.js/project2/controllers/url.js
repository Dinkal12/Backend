const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    try {
        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectedUrl: body.url,
            visitedHistory: [],
            createdBy: req.user._id,
        });
        return res.json({ shortId: shortID });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId, createdBy: req.user._id });
    if (!result) return res.status(404).json({ error: "Not found" });
    return res.json({ totalClicks: result.totalClicks, visitedHistory: result.visitedHistory });
}

module.exports = { handleGenerateNewURL, handleGetAnalytics };