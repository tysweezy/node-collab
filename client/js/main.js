var socket = io();
var form = document.querySelectorAll('.chat');
var message = document.getElementById('message');
var clearBoard = document.getElementById('clear-board');
// canvas
var whiteboard = document.getElementById('whiteboard');
var ctx = whiteboard.getContext('2d');
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

window.onsubmit = function(evt) {
  // handle form/socket message
  socket.emit('chat message', message.value);
  message.value = '';

  evt.preventDefault();
};

socket.on('chat message', function(msg) {
  var convo = document.getElementById('conversation');

  convo.innerHTML = convo.innerHTML +  '<li>' + msg + '</li>';
});

clearBoard.addEventListener('click', function() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // clear out arrays
  clickX = [];
  clickY = [];
  clickDrag = [];
});

whiteboard.onmousedown = function(e) {
   var mouseX = e.pageX - this.offsetLeft;
   var mouseY = e.pageY - this.offsetTop;

   paint = true;
   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
 };

whiteboard.onmousemove = function(e) {
 if (paint) {
   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
   redraw();
 }
};

whiteboard.onmouseup = function(e) {
  paint = false;
};


function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = "red";
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    ctx.beginPath();
    if (clickDrag[i] && i) {
      ctx.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      ctx.moveTo(clickX[i]-1, clickY[i]);
    }

    ctx.lineTo(clickX[i], clickY[i]);
    ctx.closePath();
    ctx.stroke();
  }
}

/* ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100); */
