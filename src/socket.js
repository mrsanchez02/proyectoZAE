const moment = require('moment');
module.exports = (io) => {
    var message = []
    var users = 0
    io.on('connection', (socket) => {
        users = users + 1
        io.emit('users', users)
        console.log('Un usuario se ha conectado.')

        //Emitiendo mensajes actuales.
        io.emit('messages', message)

        //Nuevo usuario conectado.
        socket.broadcast.emit('new_user', 'Se ha conectado un nuevo usuario.')

        //Usuario escribiendo.
        socket.on('writing', (username) => {
            socket.broadcast.emit('writing', username)
        })

        //Mensaje
        socket.on('message', (data) => {
            message.push(data) //Recibiendo y almacenando mensaje.
            io.emit('messages', message) //Devolviendo mensaje al chat.
        })

        // Usuario desconectado.
        socket.on('disconnect', () => {
            console.log('El usuario se ha desconectado.')
            users = users - 1
            io.emit('users', users)
            socket.broadcast.emit('off_user', 'Se ha desconectado un  usuario.')
        })
    })
}