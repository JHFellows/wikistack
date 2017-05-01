var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require("nunjucks");
var makesRouter = require("./routes");
var app = express();
var models = require('./models');

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
app.use('/',makesRouter);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: false })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

models.db.sync({force: true})
.then(function(){
	app.listen(3000, ()=>{
	  console.log("Listening on port 3000");
	});
})
.catch(console.error);
