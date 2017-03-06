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



// BUG: adding new task only after page refresh, showing up on terminal and console with click
// NOTE: router GET
router.get('/', function(req, res){ // replaced with a SELECT statement into SQL
  pool.connect(function(errorConnectingToDatabase, client, done) {
    if(errorConnectingToDatabase) {
      console.log('router.get-error-connecting-to-database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM tasks_one;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('router.get-error-making-query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        } // NOTE: FOR: else
      }) // NOTE: FOR: client.query
    } // NOTE: FOR: else
  }); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.get


// NOTE: router POST
router.post('/newTask', function(req, res){ // NOTE: installed by body-parser, path from client.js, replaced with SQL-INSERT
var newTasks = req.body;  // NOTE: data from client.js/ajax-post/data: clientObject,
console.log('routes.js/newTasks = ', newTasks); // NOTE: should match data from client.js/ajax-post/data: clientObject,
console.log('routes.js/req.body = ', req.body); // NOTE: should match data from client.js/ajax-post/data: clientObject,
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log('router.post-error-Connecting-To-Database = ', errorConnectingToDatabase);
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
    function(errorMakingQuery, result) { // NOTE: runs after query is sent out
      done();
      if(errorMakingQuery) {
        console.log('router.post-error-Making-Query = ', errorMakingQuery);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      } // NOTE: FOR: else
    }); // NOTE: FOR: function(errorMakingQuery
  } // NOTE: FOR: else
}); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.post


// // NOTE: router.delete
// router.delete('/delete/:id', function(req, res) {
//   var taskId = req.params.id; // QUESTION: Identify code purpose
//   console.log('Task to delete: ', taskId);
//   pool.connect(function(errorConnectingToDatabase, client, done){
//     if(errorConnectingToDatabase) {
//       console.log('router.delete-error-connecting-to-database: ', errorConnectingToDatabase);
//       res.sendStatus(500);
//     } else {
//       client.query('DELETE FROM tasks_one WHERE id=$1;',
//       [taskId],
//       function(errorMakingQuery, result) { // NOTE: runs after query is sent out
//         done();
//         if(errorMakingQuery) {
//           console.log('router.delete-error-making-query: ', errorMakingQuery);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(202);
//         } // NOTE: FOR: else
//       }); // NOTE: FOR: function(errorMakingQuery AND client query
//       } // NOTE: FOR: else
//     }); // NOTE: FOR: pool connect
//   }); // NOTE: FOR: router.delete
//
//
//   // NOTE: router.PUT
//   router.put('/edit/:id', function(req, res) {
//     var taskId = req.params.id; // QUESTION: Identify code purpose
//     var taskObject = req.body;
//     console.log('Task to update: ', taskId);
//     pool.connect(function(errorConnectingToDatabase, client, done) {
//       if(errorConnectingToDatabase) {
//         console.log('router.put-error-connecting-to-database: ', errorConnectingToDatabase);
//         res.sendStatus(500);
//       } else {
//         client.query('UPDATE tasks_one SET tasks_active=$1 WHERE id=$2;', // NOTE: SQL query
//         [taskObject.tasks_active, taskId], // NOTE: array that replaces $1, $2 in the query
//         function(errorMakingQuery, result) { // NOTE: runs after query is sent out
//           done();
//           if(errorMakingQuery) {
//             console.log('router.put-error-making-query: ', errorMakingQuery);
//             res.sendStatus(500);
//           } else {
//             res.sendStatus(202);
//           } // NOTE: FOR: else
//         }); // NOTE: FOR: function-errorMakingQuery AND client.query
//       } // NOTE: FOR: else
//     }); // NOTE: FOR: pool.connect
//   }); // NOTE: FOR: router.put


module.exports = router;
