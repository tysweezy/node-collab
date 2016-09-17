'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');
let express = require('express');

// constants
const PORT =  3000;

// middleware
// app.use(bodyParser.json());
app.use(express.static('client'));

// @todo: will separate things into views
  // working on concept at first
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

io.on('connection', function(socket) {

 socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
 });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});


http.listen(PORT, function() {
  console.log('listening on port: ' + PORT + ' yo!');
});
