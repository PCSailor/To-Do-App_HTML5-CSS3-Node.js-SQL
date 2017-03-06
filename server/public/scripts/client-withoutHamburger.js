$(function(){
  console.log(new Date().getFullYear() + " jQuery sourced");

// BUG: adds new task only after page refresh, but showing up on terminal and console with click.  Delete & update working correct
// BUG: adding on-click changes click result
// BUG: When I post the table appears but not on page load
  // NOTE: ajax.GET
  getTaskData();
  function getTaskData() {
    // $('#enterNewTaskButton').on('click', function(){
      $.ajax({
        type: 'GET',
        url: '/tasks',  // NOTE: /tasks
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
            $('#tasks_active').append($newTask); // NOTE: Add new task to top of list
            // NOTE: From index.html:
            // <form id="newTaskForm" action="index.html" method="post">
            // <input name="tasks_active">
            // <button type="submit" id="enterNewTaskButton">
            // <tbody id="tasks_active">
          } // NOTE: FOR: forLoop
        } // NOTE: FOR: success: function
      }); // NOTE: FOR: ajax.GET
    // }); // NOTE: FOR: on-click
  } // NOTE: FOR: function getTaskData


  // NOTE: ajax.POST
  $('#enterNewTaskButton').on('click', function(){
    console.log('enter-New-Task-Button-clicked!');
    event.preventDefault();  // QUESTION: What is this for again?
    var clientObject = {};

    // QUESTION: Is this code from Books needed?
    //     var formFields = $(this).serializeArray();
    // formFields.forEach(function (field) {
    //   clientObject[field.name] = field.value;
    // });
    // console.log('client.js/formfields = ', formfields);
    // QUESTION: Is this code from Books needed?

    clientObject.tasks_active = $('#enterNewTask').val();
    console.log('client.js/clientObject = ', clientObject);
    console.log(typeof clientObject);
    $.ajax({
      type: 'POST',
      url: '/tasks/newTask',  // NOTE: /tasks/newTask
      data: clientObject,  // NOTE: data to routes.js/router.post/var newTasks = req.body;
      success: function(response){
        console.log('client.js/newtask response = ', response);
        getTaskData();
        $('#newTaskForm > input').val('');
      } // NOTE: FOR: success-function
    }); // NOTE: FOR: ajax-post
  }); // NOTE: FOR: on-click


  // NOTE: ajax.delete
  $('#tasks_active').on('click', '.deleteButton', function(){
    var idDelectedTask = $(this).parent().parent().data().id; // TODO: CHECK TRANSVERSING
    console.log('This is the task to delete: ', idDelectedTask);
    $.ajax({
      type: 'Delete',
      url: '/tasks/delete/' + idDelectedTask,  // NOTE: /tasks/delete
      success: function(response) {
        console.log('successful delete reponse: ', response);
        getTaskData();
      }
    });
  });


  // NOTE: ajax.UPDATE
  $('#tasks_active').on('click', '.editTask', function() {
    var idEditedTask = $(this).parent().parent().data().id; // TODO: CHECK TRANSVERSING
    var taskToSave = $(this).parent().parent().find('.taskList').val();
    var taskObjectToSave = {
      tasks_active: taskToSave
    };
    $.ajax({
      type: 'PUT',
      url: '/tasks/edit/' + idEditedTask,  // NOTE: /tasks/edit
      data: taskObjectToSave,
      success: function(response) {
        console.log('successful update reponse: ', response);
        getTaskData();
      }
    });
  });

}); // NOTE: FOR: Doc-ready-$(function(){})
