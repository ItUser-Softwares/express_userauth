var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send(req.body);
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.loginEmail}, ${req.session.user.loginPswd}, you are logged in!`);
  } else {
    res.redirect('/login'); // Redirect if not logged in
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out successfully.");
  });
});

module.exports = router;
