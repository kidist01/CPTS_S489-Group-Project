const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /signup (shows the form)
router.get("/", (req, res) => {
  res.render("signup", { msg: req.query.msg });
});

// POST /signup (handles form submission)
router.post("/", async (req, res) => {
  const { username, email, street, city, state, zip, password, repeatPassword } = req.body;

  // make sure fields are filled in case form required doesn't caatch it
  if (!username || !email || !street || !city || !state || !zip || !password || !repeatPassword) {
    return res.redirect("/signup?msg=All fields are required");
  }

  if (password !== repeatPassword) {
    return res.redirect("/signup?msg=Passwords do not match");
  }

  try {
    await User.create({
      userId: Date.now(),username,email, street,city,state,zip,password, isAdmin: false
    });

  //after account added redirect to login page 
    res.redirect("login");
  } catch (error) {
    console.error(error);
    res.redirect("/signup?msg=Error+creating+account");
  }
});

module.exports = router;
