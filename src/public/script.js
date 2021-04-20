const socket = io()

const username = document.getElementById('username')
const write_message = document.getElementById('write_message')
const all_messages = document.getElementById('all_messages')
const new_user = document.getElementById('new_user')
const writing = document.getElementById('writing')
const button_addon2 = document.getElementById('button-addon2')

write_message.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') {
        if (username.value != '' && write_message.value != '') {
            socket.emit('message', {
                username: username.value,
                message: write_message.value //Agregar .slice(0, -1) en caso de text area.
            })
            write_message.value = ''
        } else {
            console.log("Favor ingresar todos los campos.")
        }
    }
})

button_addon2.addEventListener('click', (e) => {
    if (username.value != '' && write_message.value != '') {
        socket.emit('message', {
            username: username.value,
            message: write_message.value // Agregar .slice(0, -1) en caso de text area.
        })
        write_message.value = ''
    } else {
        console.log("Favor ingresar todos los campos.")
    }
})


socket.on('new_user', (message) => {
    new_user.innerHTML = message
    setTimeout(() => {
        new_user.innerHTML = ''
    }, 3000)
})
socket.on('messages', (messages) => {
    var content = ''
    for (let i = 0; i < messages.length; i++) {
        content += `
        <div class='message'>
            ${messages[i].username}:
            ${messages[i].message}
        </div>
        <br>
        `
    }
    all_messages.innerHTML = content
    all_messages.scrollTop = all_messages.scrollHeight
})

write_message.addEventListener('keydown', (e) => {
    if (username.value != '') {
        socket.emit('writing', username.value)
    }
})

socket.on('writing', (username) => {
    writing.innerHTML = username + " está escribiendo..."
    setTimeout(() => {
        writing.innerHTML = ''
    }, 3000)
})