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
var faqsRouter = require('./routes/faqs');
var loginRouter = require('./routes/login');
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
 
  //Create a Product with a Category
  const category1 = await Catergory.create({categoryId:1, categoryName: "Dog Food", description: "Dog Food"});
  const category2 = await Catergory.create({categoryId:2, categoryName: "Cat Food", description: "Cat Food"});
  const category3 = await Catergory.create({categoryId:3, categoryName: "Fish Food", description: "Fish Food"});
  const category4 = await Catergory.create({categoryId:4, categoryName: "Dog", description: "Dog"});
  const category5 = await Catergory.create({categoryId:5, categoryName: "Cat", description: "Cat"});
  const category6 = await Catergory.create({categoryId:6, categoryName: "Fish", description: "Fish"});

  const product1 = await Product.create({productId:1, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough1 = await CategoryThroughs.create({id: 1, categoryId:1, productId: 1,});

  const product2 = await Product.create({productId:2, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough2 = await CategoryThroughs.create({id: 2, categoryId:1, productId: 2,});

  const product3 = await Product.create({productId:3, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough3 = await CategoryThroughs.create({id: 3, categoryId:1, productId: 3,});

  const product4 = await Product.create({productId:4, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough4 = await CategoryThroughs.create({id: 4, categoryId:1, productId: 4,});

  const product5 = await Product.create({productId:5, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough5 = await CategoryThroughs.create({id: 5, categoryId:1, productId: 5,});

  const product6 = await Product.create({productId:6, name: "Purina Dog Food", description: "Purina Dog Food For Medium Dogs", price: 59.99, stockNumber: 32, imageUrl: "PurinaDogFood"});
  const productThrough6 = await CategoryThroughs.create({id: 6, categoryId:1, productId: 6,});

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
