var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');

// Profile Page Route
router.get('/', async (req, res) => {
  // if (!req.session.user) {
  //   return res.redirect("/login?msg=Please+log+in");
  // }

  let cartItems;
  let cartSize = 0;

  try {
    // Get cart size
    cartItems = await Cart.findAll({
      where: { userId: req.session.user.userId }
    });
    cartSize = cartItems ? cartItems.length : 0;

    // get full user info
    const user = await User.findOne({
      where: { userId: req.session.user.userId }
    });

    if (!user) {
      return res.redirect("/login?msg=User+not+found");
    }

    res.render('user-profile', { cartSize, user });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
