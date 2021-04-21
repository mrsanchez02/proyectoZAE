module.exports = (io) => {
    var message = []
    var users = 0
    io.on('connection', (socket) => {
        users = users + 1
        io.emit('users', users)
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
            users = users - 1
            io.emit('users', users)
        })
    })
}