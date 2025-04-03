var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    let cartItems;
    let cartSize;
    if(session.user){
        cartItems = await Cart.findAll({
          userId: session.user.userId
      })
    }
  
    cartSize = cartItems ? cartItems.length : 0;
  res.render('cart', {cartSize});
});


module.exports = router;
