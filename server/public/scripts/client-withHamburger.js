$(function(){
  console.log(new Date().getFullYear() + " jQuery sourced");

// BUG: adds new task only after page refresh, but showing up on terminal and console with click
// BUG: adding on-click changes click result
  // NOTE: ajax.GET
  getTaskData();
  function getTaskData() {
    $('#enterNewTaskButton').on('click', function(){
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
            $('#tasks_active').prepend($newTask); // NOTE: Add new task to top of list
          } // NOTE: FOR: forLoop
        } // NOTE: FOR: success: function
      }); // NOTE: FOR: ajax.GET
    }); // NOTE: FOR: on-click
  } // NOTE: FOR: function getTaskData


  // NOTE: ajax.POST
  $('#enterNewTaskButton').on('click', function(){
    console.log('enter-New-Task-Button-clicked!');
    event.preventDefault();  // QUESTION: What is this for again?
    var clientObject = {}; //var newBookObject = {};
    clientObject.tasks_active = $('#enterNewTask').val();
    console.log('client.js/clientObject = ', clientObject);
    console.log(typeof clientObject);
    $.ajax({
      type: 'POST',
      url: '/tasks/newTask',  // NOTE: /tasks/newTask
      data: clientObject,  // NOTE: data to routes.js/router.post/var newTasks = req.body;
      success: function(response){
        console.log('client.js/newtask response = ', response);
        // getTaskData();
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


// NOTE: Open the Menu
// $('#hamburger').click(function() { // NOTE: div hamburger // QUESTION: What's diggerence with this code? --> $('#hamburger').on('click', function() {
//   $('#content').css('min-height', $(window).height()); // NOTE: div content for the table
//   $('nav').css('opacity', 1); // NOTE: element nav for menu links // PROBLEM?? // only setting opacity
//   var contentWidth = $('#content').width();  // NOTE: div content width set to not scale while animating
//   $('#content').css('width', contentWidth); // NOTE: div content set to original width
//   $('#contentLayer').css('display', 'block'); // NOTE: Layer layed over content so that same content is unclickable with menu shown
//   $('#container').bind('touchmove', function (e) { // NOTE: disable mobile-device-all-scrolling while menu shown
//     e.preventDefault();
//   });
//   $('#container').animate({"marginLeft": ["90%", 'easeOutExpo']}, {  // QUESTION: animate & easeOutExpo?
//     duration: 700  // QUESTION: duration?
//   }); // NOTE: FOR: container.animate
// }); // NOTE: FOR: hamburger.click
//
// // NOTE: Close the menu
//   $("#contentLayer").click(function () {
//       $('#container').unbind('touchmove'); // NOTE: enable mobile-device-all-scrolling with closed menu
//       $("#container").animate({"marginLeft": ["-1", 'easeOutExpo']}, { // NOTE: set whole container margin to original-jquery UI animation
//           duration: 700,
//           complete: function () {
//               $('#content').css('width', 'auto');
//               $('#contentLayer').css('display', 'none');
//               $('nav').css('opacity', 0);
//               $('#content').css('min-height', 'auto');
//           }
//       });
//   }); // NOTE: Sourced from https://github.com/PCSailor/mobile-menu-hamburger/edit/master/js/hamburger.js



}); // NOTE: FOR: Doc-ready-$(function(){})
