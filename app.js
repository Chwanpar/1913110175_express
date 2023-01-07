var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const config=require('./config/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CompanyRouter = require('./routes/company');
const StaffRouter = require('./routes/staffRouter');
const shopController = require('./routes/shop');

var app = express();

mongoose.connect(config.MONGODB_URI,
{useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', CompanyRouter);
app.use('/staff', StaffRouter);
app.use('/shop', shopController);
app.use('/menu', shopController);
module.exports = app;
