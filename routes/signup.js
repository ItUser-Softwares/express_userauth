var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');


router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'Signup Page' });
});

router.post('/signup', async (req, res, next) => {
    const { signupEmail, signupPswd } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username: signupEmail });
    if (existingUser) {
        return res.send("User already exists!");
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(signupPswd, 10);
    const newUser = new User({ username: signupEmail, password: hashedPassword });
    await newUser.save();

    return res.send("Signup successful! <a href='/login'>Go to Login</a>");
});


module.exports = router;