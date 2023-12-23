const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听端口 8080
const wss = new WebSocket.Server({ port: 8080 });

// 监听连接事件
wss.on('connection', function connection(ws) {
  console.log('Client connected');
  const datas = {
    activeLine: 11,
    stones: [1,2,3,4],
    climbgrid: 0,
    isRight: 1
}

  // 监听消息事件
  ws.on('message', function incoming(message) {
    const request = JSON.parse(message)
    console.log('Received: %s', message, request);
    if(typeof request.gridIndex === 'number') {
        // 向客户端发送消息
        datas.climbgrid = request.gridIndex
        datas.activeLine -= 1
        ws.send(JSON.stringify(datas));
    } else {
        ws.send(JSON.stringify({statu: 2, msg: '参数错误，请传入数字'}))
    }
  });

  // 监听关闭事件
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});


// 终端运行： node ./server.js
