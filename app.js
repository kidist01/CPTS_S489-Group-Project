const Cart = require('./models/Cart.js');
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Order = require('./models/Order.js');
const OrderItem = require('./models/OrderItem.js');


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactUsRouter = require('./routes/contact-us');
var adoptionsRouter = require('./routes/adoptions');
var productRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var adminRouter = require('./routes/admin');
var userProfileRouter = require('./routes/user-profile');
var faqsRouter = require('./routes/faqs');
var loginRouter = require('./routes/login');
const sequelize = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'CPTS489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact-us', contactUsRouter);
app.use('/adoptions', adoptionsRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/user-profile', userProfileRouter);
app.use('/faqs', faqsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup(params){
  //Create A User
  const colby = await User.create({userId:1, username: "colby", password: "1234", email: "colby.morris@wsu.edu", street: "2394 Northwest Street", city: "Prosser", state: "Wa", zip: "9232", isAdmin: true});

  const product1 = await Product.create({productId:1, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood", category: "Dog Food"});
  const product2 = await Product.create({productId:2, name: "Meow Mix Original Choice", description: "Meow Mix Cat Food", price: 39.99, stockNumber: 22, imageUrl: "mewMixOriginalChoice", category: "Cat Food"});
  const product3 = await Product.create({productId:3, name: "Wellness Appetizing Cat Food", description: "Wellness Appetizing Cat Wet Food", price: 19.99, stockNumber: 18, imageUrl: "WellnessAppetizingCatFood", category: "Cat Food"});
  const product4 = await Product.create({productId:4, name: "Blue Buffalo Dog Food", description: "Blue Buffalo Homestyle Recipe Food For Medium Dogs", price: 39.99, stockNumber: 31, imageUrl: "blueBuffaloHomestyleRecipe", category: "Dog Food"});
  const product5 = await Product.create({productId:5, name: "Carhartt Dog Leash", description: "Carhartt Dog Leash For Medium Dogs", price: 19.99, stockNumber: 21, imageUrl: "carharttDogLeash", category: "Cat"});
  const product6 = await Product.create({productId:6, name: "Carhartt Dog Collar", description: "Dog Collar For Medium Dogs", price: 19.99, stockNumber: 10, imageUrl: "carharttDogCollar", category: "Dog"});
  const product7 = await Product.create({productId:7, name: "Applaws Cat Treats", description: "Applaws Cat Treat Puree", price: 19.99, stockNumber: 21, imageUrl: "applawsCatTreat", category: "Cat"});
  const product8 = await Product.create({productId:8, name: "Milk Bone Dog Treats", description: "Milk Bone Soft And Chewey Dog Treats", price: 15.99, stockNumber: 18, imageUrl: "milkBoneSoftChewey", category: "Dog"});

  //Create a Cart for the first User
  const cart1 = await Cart.create({productId: 1, userId:1});

  //Create an Order for a user
  const order1 = await Order.create({orderId: 1, userId:1, orderDate: "2025-3-25", shippingAddress: "2394 Northwest Street", shippingCity: "Prosser", shippingState: "Wa", shippingZip: "9232", totalPrice: 59.99});
  const orderItem1 = await OrderItem.create({id:1, orderId: 1, productId: 1});

}

sequelize.sync({ force: true }).then(() => {
  console.log("Sync Compelted");
  setup().then(()=> {console.log("Setup Complete")})
});

module.exports = app;
