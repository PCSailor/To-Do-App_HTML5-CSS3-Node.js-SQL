$(function(){
  console.log(new Date().getFullYear() + " jQuery sourced");
  $('#enterNewTaskButton').on('click', function(){
    var varEnterNewTask = $('#enterNewTask').val();
    console.log('enter-New-Task-Button-clicked!');
    console.log('var-Enter-New-Task = ',varEnterNewTask);
    $.ajax({
      type: 'POST',
      url: '/newTask',
      data: varEnterNewTask,
      success: function(response){
        console.log('client.js/newtask response = ', response);
      } // NOTE: FOR: success-function
    }); // NOTE: FOR: ajax-post
  }); // NOTE: FOR: enterNewTaskButton').on('click'
}); // NOTE: FOR: Doc-ready-$(function(){})

// ensure req.body variables match the ones you're sending in your AJAX call. I'd recommend doing a `console.log(req.body)` in your server code. The output should show up in your terminal window.
