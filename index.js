const PORT = process.env.socketPort || 8080

const path = require('path').resolve()
const express = require('express')
const socketio = require('socket.io')
const { createServer } = require('http')

const app = express()
const server = createServer(app)
const socket = socketio(server)

app.use('/web/', express.static(path + '/web'))
app.get('/', (_req, res) => res.redirect('/web'))

socket.on('connection', (session) => {
  session.on('msg', (msg) => {
    if (msg.author.length < 1 || msg.content.length < 1) return
    socket.emit('msg', msg)
  })
})

server.listen(PORT, () => console.log('Server is now on http://localhost:' + PORT))
