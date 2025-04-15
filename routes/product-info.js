var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');  
const session = require('express-session');

router.use((req, res, next) => {
  console.log('HIT product-info router');
  console.log('req.body:', req.body)
  next();
});


/* GET home page. */
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;
    console.log('productId:', productId);

    const product = await Product.findOne({
      where: { productId }
    });

    console.log('products:', product);

    let cartSize = 0;

    if(session.user){
      cartItems = await Cart.findAll({
        userId: session.user.userId
      })
  
      cartSize = cartItems.length;
    }

    console.log('Rendering product-info page...');
    res.render('product-info', { product, cartSize });

  } catch (err) {
    console.error('Error in POST /product-info:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/addToCart', isLoggedIn ,  async (req, res) => {
  let productId = req.body.productId;

  try {
    let product = await Product.findOne({
      where: { productId}
    })
    await Cart.create (
      {
        productId: productId,
        userId: session.user.userId
      }
    );
    
  } catch (error) {
    console.error('Error in POST /products/addtocart:', error);
    res.status(500).send('Server Error');
    
  }
  res.redirect('/');
  //res.render('product-info', { products, cartSize });
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;