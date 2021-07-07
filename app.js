var express = require('express');
var path = require('path');
var app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
var sql = require('./sql/sql');
var withoutcompares  = require('./sql/withoutcompares');
var compares = require('./sql/compares');
var getdep = require('./sql/get-departments');
var getemp = require('./sql/get-emplyees'); 
var getterm = require('./sql/get-terminals');
var gettype = require('./sql/get-types');
const change = require('./queries/datachange');
const changeenddate = require('./queries/enddatechange');
const changecomp = require('./queries/changeenddate');
const changeenddatecomp = require('./queries/choosestartdate');

var router = express.Router();
var cors = require('cors');
const { endianness } = require('os');
const port = process.env.PORT || 5000;
const dir = path.join(__dirname, 'public');

app.use(  cors({
  origin: 'https://actaweb.netlify.app/',
  credentials: false,
}));
app.use(  cors({
  origin: 'https://actaweb.netlify.app',//http://wolvestalk.commedia.wiki/
  credentials: false,
  methods: "Fetch"
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin: *');
  res.header('Access-Control-Allow-Methods: *');
  res.header('Access-Control-Allow-Headers: *');
  next();
});
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});


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

//change dates
app.post('/changedate',async(req, res) =>  {
  var date = req.body.startd;
  console.log('The date: ' + date);
  change.cangedate(date);
  res.json({ ok: true });
}); 

app.post('/changeenddate',async(req, res) =>  {
  var date = req.body.startd;
  console.log('The date: ' + date);
  changeenddate.cangeenddate(date);
  res.json({ ok: true });
}); 

app.post('/changecomp',async(req, res) =>  {
  var date = req.body.startd;
  console.log('The date: ' + date);
  change.cangedate(date);
  res.json({ ok: true });
}); 

app.post('/changeenddatecomp',async(req, res) =>  {
  var date = req.body.startd;
  console.log('The date: ' + date);
  changeenddate.cangeenddate(date);
  res.json({ ok: true });
}); 


app.use(express.static(dir));

app.listen(port, function () {
});


