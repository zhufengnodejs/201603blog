var server = new require('ws').Server({port:9090});
//ws 代表与某个客户端的连接
//当有客户端连接到服务器端的时候会调用回调函数
var wss  = [];
server.on('connection',function(ws){
    wss.push(ws);
   //当客户端向服务器发送消息的时候会执行回调数
   ws.on('message',function(message){
       wss.forEach(function(ws){
           ws.send(message);
       });

   });
});