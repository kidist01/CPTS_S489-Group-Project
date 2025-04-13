var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Product = require('../models/Product.js');
console.log('PRODUCT MODEL:', Product);
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

  // if(session.user.isAdmin){
  //   const products = await Products.findAll();
  // }
  const products = await Product.findAll();
  // console.log(products)

  const dummyProducts = [
    {
      name: 'Dog Food',
      description: 'High quality dog food',
      price: 29.99,
      stockNumber: 100,
      imageUrl: 'https://example.com/dog-food.jpg',
      category: 'Food'
    },
    {
      name: 'Cat Toy',
      description: 'Interactive cat toy',
      price: 9.99,
      stockNumber: 50,
      imageUrl: 'https://example.com/cat-toy.jpg',
      category: 'Toys'
    }
  ];
  cartSize = cartItems ? cartItems.length : 0;

  res.render('admin', {cartSize, products });
});

router.post('/itemCreate', async function(req, res){
  console.log(req.body);
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


module.exports = router;
