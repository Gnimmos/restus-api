var express = require('express');
var path = require('path');
var app = express();
require('dotenv').config();
var sql = require('./sql/sql');
var withoutcompares  = require('./sql/withoutcompares');
var compares = require('./sql/compares');
var getdep = require('./sql/get-departments');
var getemp = require('./sql/get-emplyees'); 
var getterm = require('./sql/get-terminals');
var gettype = require('./sql/get-types');
var router = express.Router();
var cors = require('cors')
// const port = process.env.PORT || 5000;
var bodyParser = require('body-parser')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up frontend templates and/or frameworks
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//STATIC MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({limit: '10mb',  extended: true}));

app.use('/', function(req, res, next) {

    console.log('one');
    next();
  });
app.use('/sql',sql);
app.use('/compares',compares);
app.use('/getdep',getdep);
app.use('/getemp',getemp);
app.use('/getterm',getterm);
app.use('/gettype',gettype);
app.use('/withoutcompares',withoutcompares);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(5000, function () {
});


