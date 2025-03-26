var express = require('express');
var router = express.Router();
const User = require('../models/User.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { content: './partials/login.ejs'});
});

router.post('/home', async (req, res) => {

  console.log(req.body.username, " ",  req.body.password)
  const user = await User.findUser(req.body.username, req.body.password)

  console.log(user);

  if(user != null){
    res.render('index', { content: './partials/product-list.ejs'});
  }else{
    res.render('index', { content: './partials/login.ejs'});
  }
});

module.exports = router;
