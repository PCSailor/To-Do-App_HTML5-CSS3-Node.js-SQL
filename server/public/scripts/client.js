$(function(){
  console.log(new Date().getFullYear() + " jQuery sourced");
  // NOTE: ajax.GET
  getTaskData();
  function getTaskData() {
    $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function(response) {
        console.log('ajax-GET-success-function-response: ', response);
        $('#tasks_active').empty(); // NOTE: Body ID which clears the list before reloading
        for (var i = 0; i < response.length; i++) { // NOTE: array of task objects
          var currentTask = response[i]; // NOTE: Loops through task object
          var $newTask = $('<tr>'); // NOTE: Creates a new row for each task
          $newTask.data('id', currentTask.id); // NOTE: Getting data from ?? // QUESTION: Which ID pointting to?
          $newTask.append('<td><input value=" ' + currentTask.tasks_active + '" class="taskList"></td>');
          $newTask.append('<td><button class="deleteButton">Delete</button></td>');
          $newTask.append('<td><button class="editTask">Save Edit</button></td>');
          $('#tasks_active').prepend($newTask); // NOTE: Add new task to top of list



// <form id="newTaskForm" action="index.html" method="post">
// <input name="tasks_active">
// <button type="submit" id="enterNewTaskButton">
// <tbody id="tasks_active">

        } // NOTE: FOR: forLoop
      } // NOTE: FOR: success: function
    }); // NOTE: FOR: ajax.GET
  } // NOTE: FOR: function getTaskData






  // NOTE: ajax.POST
  $('#enterNewTaskButton').on('click', function(){
    // console.log('enter-New-Task-Button-clicked!');
    var clientObject = {}; //var newBookObject = {};
    clientObject.tasks_active = $('#enterNewTask').val();
    console.log('clientObject = ', clientObject);
    console.log(typeof clientObject);
    $.ajax({
      type: 'POST',
      url: '/newTask',
      data: clientObject,
      success: function(response){
        console.log('client.js/newtask response = ', response);
      } // NOTE: FOR: success-function
    }); // NOTE: FOR: ajax-post
  }); // NOTE: FOR: enterNewTaskButton').on('click'
}); // NOTE: FOR: Doc-ready-$(function(){})

// ensure req.body variables match the ones you're sending in your AJAX call. I'd recommend doing a `console.log(req.body)` in your server code. The output should show up in your terminal window.
