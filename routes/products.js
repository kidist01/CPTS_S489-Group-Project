var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Category = require('../models/Category.js');

/* GET home page. */
router.get('/', async (req, res) => {
  let products = await Product.findAll({
    include: [{model: Category}]
  });;

  res.render('products', { products });
});


module.exports = router;
