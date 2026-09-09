const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require('../controllers/user');

router.post('/login', handleUserLogin);
router.post('/signup', handleUserSignup);

router.get('/logout', (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
});

module.exports = router;