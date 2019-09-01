let express = require('express')
let socket = require('socket.io')

// App setup
let app = express()

let server = app.listen(3000,function() {
  console.log('listen to requests on port 3000')
})

// Static files
app.use(express.static('public'))

// Socket setup
let io = socket(server)

io.on('connection', function(socket) {
  // every new socket connection build a new socket.id
  console.log('made socket connection',socket.id)
  
  socket.on('chat', function(data) {
    console.log(data);
    let result = {data,id:socket.id}
    io.sockets.emit('chat', result)
    // io.sockets.emit('chat',`${data.uname}您好,您的节操掉了`)
  })
})