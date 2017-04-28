var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require("nunjucks");
var app = express();

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// logging middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/',routes);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

var server = app.listen(1337, ()=>{
  console.log("Listening on port 1337");
})
