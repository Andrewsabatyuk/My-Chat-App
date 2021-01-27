// const io = require('socket.io')(5000)
const io = require('socket.io')(5000, {
  cors: {
    origin: '*',
  }
}); 

io.on('connection', socket =>{
    const id = socket.handshake.query.id;
    socket.join(id)


    socket.on('send-message', ({recipients, text}) => {
        recipients.forEach(recipient =>{
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})
// Access to XMLHttpRequest at 'http://localhost:5000/socket.io/?id=22&EIO=4&transport=polling&t=NPXThYW' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
