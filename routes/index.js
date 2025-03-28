var express = require('express');
var router = express.Router();
const User = require('../models/User.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/home', async (req, res) => {

  console.log(req.body.username, " ",  req.body.password)
  const user = await User.findUser(req.body.username, req.body.password)

  console.log(user);
  res.render('index');
});


module.exports = router;
