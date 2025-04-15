var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Order = require('../models/Order.js');
const OrderItem = require('../models/OrderItem.js');
const Cart = require('../models/Cart.js');
const session = require('express-session');

/* GET home page. */
router.get('/', isLoggedIn, async (req, res) => {
    let cartItems;
    let cartSize;
    let subTotal = 0.0;

    if(session.user){
        cartItems = await Cart.findAll({
            where: {userId: session.user.userId},
            include: ['Product']
        });
    }
    else{
      res.redirect('/login')
    }
  
  cartSize = cartItems ? cartItems.length : 0;

  if(cartItems.length <= 0){
    res.redirect('/cart');
}

  if(cartItems){
    cartItems.forEach((x) => subTotal += x.Product.price * x.quantity)
  }

  console.log("SubTotal", subTotal);

  res.render('order', {cartSize, cartItems, subTotal});
});

router.post('/submit', isLoggedIn, async (req, res) => {
    console.log(req.body.country)
    console.log(req.body.first_name)
    console.log(req.body.last_name)
    console.log(req.body.address)
    console.log(req.body.city)
    console.log(req.body.state)
    console.log(req.body.zip_code)
    console.log(req.body.phone_number)
    console.log(req.body.email_address)
    console.log(req.body.CreditCardType)
    console.log(req.body.car_number)
    console.log(req.body.car_code)

    let cartItems = await Cart.findAll({
        where: {userId: session.user.userId},
        include: ['Product']
    });

    if(cartItems.length <= 0){
        res.redirect('/cart');
    }
    let orderTotal = 0.0;

    let orderItemArray = [];
    cartItems.forEach((x) => { 
        orderTotal += x.Product.price * x.quantity;
    });

    const newOrder = await Order.create(
        {
            userId: session.user.userId,
            orderDate: new Date(),
            shippingAddress: req.body.address,
            shippingCity: req.body.city,
            shippingState: req.body.state,
            shippingZip: req.body.zip_code,
            totalPrice: orderTotal
        }
    );

    await Promise.all(cartItems.map(async (x) => {    
        await OrderItem.create(
            {
                orderId: newOrder.orderId,
                productId: x.productId
            }
        );

        await Product.update(
            { stockNumber: x.Product.stockNumber - x.quantity },
            { where: { productId: x.productId } }
        );

        await Cart.destroy(
            { where: { cartId: x.cartId } }
        );
    }));
    
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
