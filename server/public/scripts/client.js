$(function(){
console.log(new Date().getFullYear() + " jQuery sourced");





$('#enterNewTaskButton').on('click', function(){
var varEnterNewTask = $('#enterNewTask').val();
console.log(varEnterNewTask);
$.ajax({
  type: 'POST',
  url: '/newTask',
  data: varEnterNewTask,
  success: function(response){
    console.log('new task response: ', response);
  }

})


}); // NOTE: FOR: enterNewTaskButton').on('click'




}); // NOTE: FOR: Doc-ready-$(function(){})
