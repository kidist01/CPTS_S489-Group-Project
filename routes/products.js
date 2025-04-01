var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');

/* GET home page. */
router.get('/', async (req, res) => {
  let products = await Product.findAll({
    
  });;

  res.render('products', { products });
});


module.exports = router;
