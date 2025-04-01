var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const CartItem = require('../models/CartItem.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
  let products = await Product.findAll({
    include: [{model: Category}]
  });;

  let cartSize = "5";

  res.render('products', { products , cartSize });
});

router.post('/addtocart', isLoggedIn ,  async (req, res) => {
  let productId = req.body.productId;

  let product = await Product.findOne({
    productId: productId
  })

  let cart = await Cart.findOne(
    {
      userId: session.user.userId
    }
  );

  let cartItem = new CartItem ({
    cartId: cart.cartId,
    productId: productId,
    quantity: 1,
    totalPrice: product.price
  });

  await CartItem.create(cartItem);

  let products = await Product.findAll({
    include: [{model: Category}]
  });

  let userCartItems = await CartItem.findAll({
    cartId: cart.cartId
  })

  let cartSize = userCartItems.length();

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
