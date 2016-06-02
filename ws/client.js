var socket = new require('ws')('ws://localhost:9090');
//当服务器和客户端连接之后会执行回调函数
socket.on('open',function(){
  socket.send('hello server!');
});
//在客户端监听服务器的消息
socket.on('message',function(message){
    console.log(message);
});