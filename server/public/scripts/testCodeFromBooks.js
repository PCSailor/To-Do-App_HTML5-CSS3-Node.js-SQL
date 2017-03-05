

 //github.com/LukeSchlangen/phi-pg-module-intro/commit/cb07d2eee374ade16196d066010e640b05db6621#diff-ec967f66a1e204e021a70add96edecc3
 +<!DOCTYPE html>
  +<html>
  +  <head>
  +    <meta charset="utf-8">
  +    <title>Books and Databases</title>
  +    <script src="vendors/jquery.js" charset="utf-8"></script>
  +    <script src="scripts/client.js" charset="utf-8"></script>
  +  </head>
  +  <body>
  +    <h1>Book Shelf</h1>
  +    <input id="newBookTitle" placeholder="Title">
  +    <input id="newBookAuthor" placeholder="Author">
  +    <button id="newBookButton">Click here to add the book!</button>
  +    <ul id="bookShelf">
  +    </ul>
  +  </body>
  +</html>




 +console.log('sourced!');
 +$(document).ready(function(){
 +  console.log('jquery was correctly sourced!');
 +  getBookData();
 +  function getBookData() {
 +    $.ajax({
 +      type: 'GET',
 +      url: '/books',
 +      success: function(response) {
 +        console.log('response', response);
 +        $('#bookShelf').empty();
 +        for (var i = 0; i < response.length; i++) {
 +          $('#bookShelf').append('<li>Title: ' + response[i].title + ', Author: ' + response[i].author + '</li>');
 +        }
 +      }
 +    });
 +  }
 +    <input id="newBookTitle" placeholder="Title">
 +    <input id="newBookAuthor" placeholder="Author">
 +    <button id="newBookButton">Click here to add the book!</button>
 +  $('#newBookButton').on('click', function(){
 +    var newBookObject = {};
 +    newBookObject.title = $('#newBookTitle').val();
 +    newBookObject.author = $('#newBookAuthor').val();
 +    $.ajax({
 +      type: 'POST',
 +      url: '/books/new',
 +      data: newBookObject,
 +      success: function(response){
 +        console.log(response);
 +        getBookData();
 +      }
 +    });
 +  });
 +});
