var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("hbs");

var indexRouter = require('./routes/index');
var contactsRouter = require('./routes/contacts');
var relationsRouter = require('./routes/relations');

var mongoose = require("mongoose");
var configs = require("./configs/globals");

var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'contactmanagement',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/contacts', contactsRouter);
app.use('/relations', relationsRouter);

mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => console.log('Connected Successfully!'));

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});


hbs.registerHelper("createOptionElement", (currentValue, selectedValue) =>{
  console.log("Comparing: "+ currentValue + " and " + selectedValue);
  var selectedProperty = "";
  if (currentValue == selectedProperty) selectedProperty = "selected";
  return new hbs.SafeString(
    '<option ${selectedProperty}>${currentValue}</option>'
  );
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

module.exports = app;
