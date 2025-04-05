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

    if (req.session && req.session.user) {
      const cartItems = await Cart.findAll({
        where: { userId: req.session.user.userId }
      });
      cartSize = cartItems.length;
    }

    console.log('Rendering product-info page...');
    res.render('product-info', { product, cartSize });

  } catch (err) {
    console.error('Error in POST /product-info:', err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;