require('dotenv').config()

const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const fs = require('fs')

//My Modules
const record = require('./record')
const speechToText = require('./speechToText')
const chat = require('./chatgpt')

const app = express()
const server = http.createServer(app)
app.use(express.static('public'))


const io = socketio(server)


io.on('connection', (socket) => {
    let wavFile = null

    console.log('A User connected')

    socket.on('start-recording', record.startRecording)
    
    socket.on('stop-recording',  async() => {
        record.stopRecording()
        wavFile = fs.readFileSync('output.wav');
        const t = await speechToText(process.env.AK, process.env.REGION, wavFile)
        socket.emit('addChatUser', t)
        const chatGptResponse = await chat("Veronica Sawyer", t)
        socket.emit('addChatV', chatGptResponse)
    })
})

server.listen(3000, () => console.log('Server on port 3000'))