module.exports = (io) => {
    var message = []
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado.')
        io.emit('messages', message)
        socket.broadcast.emit('new_user', 'Se ha conectado un nuevo usuario.')
        socket.on('writing', (username) => {
            socket.broadcast.emit('writing', username)
        })
        socket.on('message', (data) => {
            message.push(data)
            io.emit('messages', message)
        })
        socket.on('disconnect', () => {
            console.log('El usuario se ha desconectado.')
        })
    })
}