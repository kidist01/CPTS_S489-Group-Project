var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const session = require('express-session');

//login
router.get('/', (req, res) => {

  //check user is signed in
  if (req.session.user) {
    return res.redirect('/user-profile'); 
  }

  res.render('login', { msg: req.query.msg });
});

// HANDLE login form POST at /login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findUser(username, password);
    if (user !== null) {
      req.session.user = user;
      res.redirect("/?msg=LogedIn");
    } else {
      res.redirect("login?msg=Invalid+username+or+password");
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
