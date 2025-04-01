var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const session = require('express-session');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/home', async (req, res) => {

  const user = await User.findUser(req.body.username, req.body.password);
  if(user != null){
    console.log("User was found");
    session.user = user;
  }else{
    console.log("User Was Not Found")
  }

  cartSize = 5
  res.render('index', { cartSize });
});


module.exports = router;
