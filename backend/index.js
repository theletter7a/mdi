const {WebSocketServer} = require('ws');
const fs = require('fs');

var wss = new WebSocketServer({port: 8080});

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
