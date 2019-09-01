const sio = require('socket.io');
const http = require('http')
const fs = require('fs')


const app  = http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/html'})
  res.end(fs.readFileSync('./index.html'))
})

app.listen(3000,()=>{console.log('3000listening...');})


// 创建socket服务器
const socket = sio.listen(app)

// 监听客户端的连接状态
socket.on('connection',(socket)=>{
  // 打印客户端的连接提示
  console.log('客户端建立连接');
  // 发送给客户端数据
  socket.send('你好');

  // 监听客户端发送过来的数据
  socket.on('message',(msg)=>{
    console.log('接收到一个消息',msg);
  })
  // 监听客户端的断开连接事件
  socket.on('disconnect',()=>{
    console.log('客户端断开连接');
  })
})
