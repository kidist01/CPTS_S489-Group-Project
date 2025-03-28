const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Catergory = require('./models/Category.js');
const CatergoryThroughs = require('./models/CategoryThrough.js');
const Cart = require('./models/Cart.js');
const CartItem = require('./models/CartItem.js');
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
const sequelize = require('./db');
const CategoryThroughs = require('./models/CategoryThrough.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
 
  //Create a Product with a Category
  const category1 = await Catergory.create({categoryId:1, categoryName: "Dog Food", description: "Dog Food"});
  const product1 = await Product.create({productId:1, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "purinaDogFood"});
  const productThrough1 = await CategoryThroughs.create({id: 1, categoryId:1, productId: 1,});

  //Create a Cart for the first User
  const cart1 = await Cart.create({cartId: 1, userId:1});
  const cartItem1 = await CartItem.create({cartItemId:1, cartId: 1, productId: 1, quantity: 1, totalPrice: 59.99});

  //Create an Order for a user
  const order1 = await Order.create({orderId: 1, userId:1, orderDate: "2025-3-25", shippingAddress: "2394 Northwest Street", shippingCity: "Prosser", shippingState: "Wa", shippingZip: "9232", totalPrice: 59.99});
  const orderItem1 = await OrderItem.create({id:1, orderId: 1, productId: 1});

}

sequelize.sync({ force: true }).then(() => {
  console.log("Sync Compelted");
  setup().then(()=> {console.log("Setup Complete")})
});

module.exports = app;
