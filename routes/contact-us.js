var express = require('express');
var router = express.Router();
const User = require('../models/User.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contact-us');
});


module.exports = router;
