var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const config=require('./config/index');
const passport = require('passport'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CompanyRouter = require('./routes/company');
const StaffRouter = require('./routes/staffRouter');
const shopController = require('./routes/shop');

const errorHandler = require('./middleware/errorHandler')

var app = express();

mongoose.connect(config.MONGODB_URI,
{useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger('dev'));
app.use(express.json({ 
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', CompanyRouter);
app.use('/staff', StaffRouter);
app.use('/shop', shopController);
app.use('/menu', shopController);

app.use(errorHandler)

module.exports = app;
