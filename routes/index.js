var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Product = require('../models/Product.js');
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

  let products = await Product.findAll({
    limit: 4
  })

  res.render('index', {products, cartSize});
});

router.post('/home', async (req, res) => {

  const user = await User.findUser(req.body.username, req.body.password);

  if(user != null){
    console.log("User was found");
    session.user = user;
  }else{
    console.log("User Was Not Found")
  }

  let cartSize = 0;

  if(session.user){
    cartItems = await Cart.findAll({
      userId: session.user.userId
    })

    cartSize = cartItems.length;
  }

  let products = await Product.findAll({
    limit: 4
  })

  res.render('index', { products, cartSize });
});

router.post('/addtocart', isLoggedIn ,  async (req, res) => {
  let productId = req.body.productId;

  let product = await Product.findOne({
    productId: productId
  })

  let previousCartItems = await Cart.findOne({
    where: { productId: productId, userId: session.user.userId}
  });

  console.log(previousCartItems)

  if(previousCartItems != null){
    let prevQuantity = Number(previousCartItems.quantity)
    let totalQuantity = prevQuantity + 1;

    await Cart.update({ quantity: totalQuantity},
      {where: { productId: productId, userId: session.user.userId}}
    );

  } else {
    await Cart.create (
      {
        productId: productId,
        userId: session.user.userId
      });
  }

  let cartItems = await Cart.findAll({
    userId: session.user.userId
  })

  let cartSize = cartItems.length;

  let products = await Product.findAll({
  });

  console.log(cartSize);

  res.render('index', { products, cartSize });
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
