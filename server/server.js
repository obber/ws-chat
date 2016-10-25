var server = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var express = require('express');
var app = express();
var port = 3000;
 
app.use(express.static('./client'));

var count = 0;

wss.on('connection', socket => {
  var location = url.parse(socket.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions 
  // or socket.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
  socket.on('message', message => {
    console.log('message = ', message);
  });
 
  setInterval(() => {
    socket.send('sending message #' + count++);
  }, 2000);
});
 
server.on('request', app);
server.listen(port, () => {
  console.log('Listening on ' + server.address().port)
});