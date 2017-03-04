var express = require('express');
var router = express.Router();

var pg = require('pg'); // sources pg from node_modules
var config = {
  database: 'Phi', // db name // TODO: add database
  host: 'localhost', // db location
  port: 5432,
  max: 10, // # connections @ once
  idleTimeoutMillis: 30000 // 30 sec timeout
}
var pool = new pg.Pool(config);

// NOTE: router.post Tasks
router.post('/', function(req, res){ // NOTE: installed by body-parser, path from client.js, replaced with SQL-INSERT
var newTasks = req.body;
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log('pool.connect errorConnectingToDatabase ', errorConnectingToDatabase);
    res.sendStatus(500);
  } else {  // NOTE: Database Connected
    client.query('INSERT INTO tasks (tasks_active, tasks_inprogress, tasks_needhelp, tasks_reminder, tasks_oncalendar, tasks_completed, importance, color) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    [newTasks.tasks_active,
    newTasks.tasks_inprogress,
    newTasks.tasks_needhelp,
    newTasks.tasks_reminder,
    newTasks.tasks_oncalendar,
    newTasks.tasks_completed,
    newTasks.importance,
    newTasks.color],
    function(errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('function-errorMakingQuery ', errorMakingQuery);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      } // NOTE: FOR: else
    }); // NOTE: FOR: function(errorMakingQuery
  } // NOTE: FOR: else
}); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.post

module.exports = router;
