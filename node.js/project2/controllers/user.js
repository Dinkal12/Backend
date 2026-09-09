const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, email, password });
        return res.redirect("/login");
    } catch (err) {
        // Duplicate email
        return res.redirect("/signup?error=Email+already+registered");
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.redirect("/login?error=Invalid+credentials");
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId, { httpOnly: true });
    return res.redirect("/");
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
}