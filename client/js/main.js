var socket = io();
var form = document.querySelectorAll('.chat');
var message = document.getElementById('message');

window.onsubmit = function() {
  // handle form/socket message
  socket.emit('chat message', message.value);
  message.value = '';

  return false;
};

// canvas
var whiteboard = document.getElementById('whiteboard');
var ctx = whiteboard.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
