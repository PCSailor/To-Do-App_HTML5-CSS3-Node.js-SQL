var express = require('express');
var router = express.Router();

var pg = require('pg'); // sources pg from node_modules
var config = {
  database: 'phi', // db name // TODO: add database
  host: 'localhost', // db location
  port: 5432,
  max: 10, // # connections @ once
  idleTimeoutMillis: 30000 // 30 sec timeout
}
var pool = new pg.Pool(config);

// NOTE: POST
router.post('/', function(req, res){ // NOTE: installed by body-parser, path from client.js, replaced with SQL-INSERT
var newTasks = req.body;  // NOTE: data from client.js/ajax-post/data: clientObject,
console.log('routes.js/newTasks = ', newTasks); // NOTE: should match data from client.js/ajax-post/data: clientObject,
console.log('routes.js/req.body = ', req.body); // NOTE: should match data from client.js/ajax-post/data: clientObject,
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log('POST errorConnectingToDatabase = ', errorConnectingToDatabase);
    res.sendStatus(500);
  } else {  // NOTE: Database Connected
    // client.query('INSERT INTO tasks (tasks_active, tasks_inprogress, tasks_needhelp, tasks_reminder, tasks_oncalendar, tasks_completed, importance, color) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    client.query('INSERT INTO tasks_one (tasks_active) VALUES ($1);',
    // client.query('UPDATE tasks_two (tasks_active) VALUES ($1);',
    [newTasks.tasks_active],
    // newTasks.tasks_inprogress,
    // newTasks.tasks_needhelp,
    // newTasks.tasks_reminder,
    // newTasks.tasks_oncalendar,
    // newTasks.tasks_completed,
    // newTasks.importance,
    // newTasks.color],
    function(errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('POST error-Making-Query = ', errorMakingQuery);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      } // NOTE: FOR: else
    }); // NOTE: FOR: function(errorMakingQuery
  } // NOTE: FOR: else
}); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.post

module.exports = router;
