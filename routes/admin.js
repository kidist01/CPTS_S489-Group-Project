var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Product = require('../models/Product.js');
const OrderItem = require('../models/OrderItem.js')
console.log('PRODUCT MODEL:', Product);
const session = require('express-session');
const Order = require('../models/Order.js');

/* GET home page. */
router.get('/', isAdmin, async (req, res) => {
  let cartItems;
  let cartSize;
  if(session.user){
      cartItems = await Cart.findAll({
        userId: session.user.userId
    })
  }

  // if(session.user.isAdmin){
  //   const products = await Products.findAll();
  // }
  const products = await Product.findAll();

  cartSize = cartItems ? cartItems.length : 0;

  res.render('admin', {cartSize, products });
});

function isAdmin(req, res, next) {
  if (session.user && session.user.isAdmin) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.post('/itemCreate', async function(req, res){
  const { name, description, price, stockNumber, imageUrl, category } = req.body;
  let product;
  try{
    product = await Product.create({
      name,
      description,
      price,
      stockNumber,
      imageUrl,
      category
    });
    // res.status(201).json(product);
    res.redirect('/admin');
  }
  catch(error){
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
}
); 

router.post('/itemDelete', async function(req, res){
  const { productId } = req.body;
  try{
    await Cart.destroy({ where: { productId } });
    await Product.destroy({where: { productId }});
    res.redirect('/admin');
  }
  catch(error){
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.post('/itemUpdate', async function(req,res){
  const { productId, price, stockNumber, description } = req.body;
  try {
    await Product.update(
      {
        price: parseFloat(price),
        stockNumber: parseInt(stockNumber),
        description: description
      },
      { where: { productId } }
    );
    res.redirect('/admin');
  }
  catch(error){
    console.log('Error updating product', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


module.exports = router;
