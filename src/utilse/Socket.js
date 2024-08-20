const { Server } = require('socket.io');

const connectChat = () => {

  const io = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.emit('welocme', "avooo avooo javvvooooo") // all
    socket.broadcast.emit('hello', 'how are you') // one too all

    socket.on('hello', (data) => {
      // console.log(data);
      socket.to(data.receiver).emit('res-msg', data.massage)
    });

    socket.on("join-gruop", (gruop_name) => {
      console.log(gruop_name);
      socket.join(gruop_name)
    })
  });

  io.listen(4000, () => {
    console.log('server strating at port 4000');
  })

}


module.exports = connectChat;
