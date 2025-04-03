var express = require('express');
const User = require('../models/User');
const Cart = require('../models/Cart.js');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let cartItems;
    let cartSize;
    if(session.user){
        cartItems = await Cart.findAll({
          userId: session.user.userId
      })
    }
  
    cartSize = cartItems ? cartItems.length : 0;

  res.render('index', { title: 'Express', cartSize });
});

router.post('/login', async function(req, res, next) {
  //console.log(req.body.username+" - "+req.body.password);
  const user = await User.findUser(req.body.username, req.body.password)
  if(user!== null){
    req.session.user = user

    let cartItems;
    let cartSize;
    if(session.user){
        cartItems = await Cart.findAll({
          userId: session.user.userId
      })
    }
  
    cartSize = cartItems ? cartItems.length : 0;

    res.redirect("/home", {cartSize})
  }else{
    res.redirect("/?msg=fail")
  }
});

module.exports = router;