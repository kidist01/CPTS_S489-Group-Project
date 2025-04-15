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

  try {
    let product = await Product.findOne({
      where: { productId}
    })
    
    let previousCartItems = await Cart.findOne({
      where: { productId: productId, userId: session.user.userId}
    });

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
    
  } catch (error) {
    console.error('Error in POST /products/addtocart:', error);
    res.status(500).send('Server Error');
    
  }
  res.redirect('/products');
  //res.render('products', { products, cartSize });
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}


module.exports = router;
