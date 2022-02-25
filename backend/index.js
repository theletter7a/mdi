const {WebSocketServer} = require('ws');
const fs = require('fs');
const http = require('http');

var server = http.createServer((res, req)=>{
  res.writeHead('200');
})
var wss = new WebSocketServer({server: server});

wss.on('connection', ws=>{
    ws.on('message', res=>{
        var obj = JSON.parse(res.toString());
        if(obj.type == 'idea'){
          fs.appendFileSync('logs.txt', obj.value + '\n')
        }
        else if(obj.type == 'logs'){
          ws.send(fs.readFileSync('logs.txt', {encoding: 'utf-8'}));
        }
    });
});
