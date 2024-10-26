var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const User = require('../models/User');
var bcrypt = require('bcryptjs');



router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res, next) => {
    const { loginEmail, loginPswd } = req.body;
    const user = await User.findOne({ username: loginEmail });
    if (!user) {
        return res.send('Invalid User! User Not Found!');
    }

    const isPasswordValid = await bcrypt.compare(loginPswd, user.password);
    if (isPasswordValid) {
        req.session.user = { loginEmail, loginPswd };
        return res.redirect('/');
    } else {
        return res.send("Invalid username or password.");
    }
});

module.exports = router;