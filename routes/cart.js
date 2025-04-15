var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    let cartItems;
    let cartSize;
    if(session.user){
        cartItems = await Cart.findAll({
          where: {userId: session.user.userId},
          include: ['Product']
      })
    }
    else{
      res.redirect('/login')
    }
  
    cartSize = cartItems ? cartItems.length : 0;
  res.render('cart', {cartSize, cartItems});
});

router.post('/deleteItem', async (req, res) =>{
  let Id = req.body.productId;
  let itemToDelete = await Cart.findAll({
    where: {
      userId: session.user.userId,
      productId: Id
    }
  })
  if(itemToDelete){
    await Cart.destroy({
        where: {
          userId: session.user.userId,
          productId: Id
        }
      }
    )
  }
  else{
    console.log("Error: Item not found!!")
  }
  res.redirect('/cart');
});

router.post('/changeQty', async (req, res) =>{
  let quant = req.body.quantity;
  let Id = req.body.productId;
  let itemToChange = await Cart.findAll({
    where: {
      userId: session.user.userId,
      productId: Id
    }
  })
  if(itemToChange){
    await Cart.update({
      quantity: quant
    }, 
    {
      where: {
        userId: session.user.userId,
        productId: Id
      } 
    });
  }
  else{
    console.log("Error: Item not found!!")
  }
  res.redirect('/cart');
});

module.exports = router;
