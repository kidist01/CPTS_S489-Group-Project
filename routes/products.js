var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
  let products = await Product.findAll({
    
  });;

  let cartSize = 0;

  if(session.user){
    cartItems = await Cart.findAll({
      userId: session.user.userId
    })

    cartSize = cartItems.length;
  }


  res.render('products', { products, cartSize });
});

router.post('/addtocart', isLoggedIn ,  async (req, res) => {
  let productId = req.body.productId;

  let product = await Product.findOne({
    productId: productId
  })

  await Cart.create (
    {
      productId: productId,
      userId: session.user.userId
    }
  );

  let cartItems = await Cart.findAll({
    userId: session.user.userId
  })

  let cartSize = cartItems.length;

  let products = await Product.findAll({
  });

  console.log(cartSize);

  res.render('products', { products, cartSize });
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}


module.exports = router;
