const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const app = express()
require('dotenv').config()

//settings
app.set('port', process.env.PORT || 3000)

//middleware
app.use(express.static(path.join(__dirname, 'public')))

//Socket io
const server = http.createServer(app)
const io = socketio(server)
require('./socket')(io)


//listener
server.listen(app.get('port'), () => {
    console.log('Aplicacion corriendo en puerto ' + app.get('port'))
})