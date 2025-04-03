var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const session = require('express-session');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login');
});


module.exports = router;
