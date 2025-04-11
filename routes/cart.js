var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    let cartItems;
    let cartSize;
    console.log(session.user)
    if(session.user){
        console.log(session.user);
        cartItems = await Cart.findAll({
          where: {userId: session.user.userId},
          include: ['Product']
      })
    }
    else{
      res.redirect('/login')
    }
  
    cartSize = cartItems ? cartItems.length : 0;
  res.render('cart', {cartSize, cartItems});
});


module.exports = router;
