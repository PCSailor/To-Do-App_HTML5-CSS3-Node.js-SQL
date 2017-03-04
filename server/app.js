console.log(new Date().getFullYear() + ' server listening to port 5000');
// QUESTION: Does this order matter?
// NOTE: express
var express = require('express'); // sources express from node_modules
var app = express(); // creates express app
app.use(express.static('server/public')); // static file search
// NOTE: body-parser
var bodyParser = require('body-parser'); // retrieves created data
app.use(bodyParser.urlencoded({extended: true})); //req.body created below
// NOTE: pg
var pg = require('pg'); // sources pg from node_modules
var pool = new pg.Pool(config);
var config = {
  database: 'Phi', // db name // TODO: add database
  host: 'localhost', // db location
  port: 5432,
  max: 10, // # connections @ once
  idleTimeoutMillis: 30000 // 30 sec timeout
}
// QUESTION: Does this order matter?
app.listen(5000);
