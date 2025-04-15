var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Product = require('../models/Product.js');
const Order = require('../models/Order.js');
const OrderItem = require('../models/OrderItem.js');
const session = require('express-session');

// Profile Page Route
router.get('/', isLoggedIn, async (req, res) => {
  // if (!req.session.user) {
  //   return res.redirect("/login?msg=Please+log+in");
  // }

  let cartItems;
  let cartSize = 0;

  try {
    // Get cart size
    cartItems = await Cart.findAll({
      where: { userId: session.user.userId }
    });
    cartSize = cartItems ? cartItems.length : 0;

    // get full user info
    const user = await User.findOne({
      where: { userId: session.user.userId }
    });

    if (!user) {
      return res.redirect("/login?msg=User+not+found");
    }

    let recentOrder = await Order.findOne({
      where: {userId: session.user.userId},
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ],    
      order: [['orderDate', 'DESC']] 
    });

    res.render('user-profile', { cartSize, user, recentOrder });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).send("Server error");
  }
});

function isLoggedIn(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
