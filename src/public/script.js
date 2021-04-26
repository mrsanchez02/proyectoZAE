const socket = io()

const username = document.getElementById('username')
const write_message = document.getElementById('write_message')
const all_messages = document.getElementById('all_messages')
const new_user = document.getElementById('new_user')
const off_user = document.getElementById('off_user')
const writing = document.getElementById('writing')
const button_addon2 = document.getElementById('button-addon2')
const usersOnline = document.getElementById('usersOnline')

// Emitiendo mensajes.
write_message.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') {
        if (username.value != '' && write_message.value != '') {
            socket.emit('message', {
                username: username.value,
                message: write_message.value,
                time: moment()
                // .format('h:mm:ss a')
            })
            write_message.value = ''
        } else {
            alert('Uno o varios campos estan en blanco.')
        }
    }
})

button_addon2.addEventListener('click', (e) => {
    if (username.value != '' && write_message.value != '') {
        socket.emit('message', {
            username: username.value,
            message: write_message.value,
            time: moment()
            // .format('h:mm:ss a')

        })
        write_message.value = ''
    } else {
        alert('Uno o varios campos estan en blanco.')
    }
})

//Nuevo usuario conectado.
socket.on('new_user', (message) => {
    new_user.innerHTML = message
    setTimeout(() => {
        new_user.innerHTML = ''
    }, 3000)
})

//se ha desconectado un usuario.
socket.on('off_user', (message) => {
    off_user.innerHTML = message
    setTimeout(() => {
        off_user.innerHTML = ''
    }, 3000)
})


// Recepcion y muestra de mensaje.
socket.on('messages', (messages) => {
    var content = ''
    for (let i = 0; i < messages.length; i++) {
        content += `
        <div class='message'>
            <span class="fw-bold">${messages[i].username}:</span>
            <span class="fst-italic">${messages[i].message}</span>
            - <em>${moment(messages[i].time).fromNow()}</em>

        </div>
        <br>
        `
    }
    all_messages.innerHTML = content
    all_messages.scrollTop = all_messages.scrollHeight
})

// Notifica que alguien esta escribiendo.
write_message.addEventListener('keydown', (e) => {
    if (username.value != '') {
        socket.emit('writing', username.value)
    }
})

// Muestra cuando alguien esta escribiendo.
socket.on('writing', (username) => {
    writing.innerHTML = username + " está escribiendo..."
    setTimeout(() => {
        writing.innerHTML = ''
    }, 3000)
})

// Actualiza el contador de usuarios conectados.
socket.on('users', (number) => {
    usersOnline.innerHTML = `Usuarios en linea: <span class="contador">${number}</span>`
})