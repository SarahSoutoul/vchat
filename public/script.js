
let socket = io()

document.getElementById('r').addEventListener('click', function () {
  socket.emit('start-recording')
  document.getElementById('r').hidden = true
  document.getElementById('s').hidden = false
});

document.getElementById('s').addEventListener('click', function () {
  socket.emit('stop-recording')
  document.getElementById('s').hidden = true
  document.getElementById('r').hidden = false
});

socket.on('addChatUser', (t) => {
  const chatBox = document.getElementById('chat-box')

  const newChatText = document.createElement('div')
  newChatText.classList.add('chat-text')
  newChatText.innerHTML = `<strong>You:</strong> ${t}`

  chatBox.appendChild(newChatText)
})

socket.on('addChatV', (t) => {
  const chatBox = document.getElementById('chat-box')

  const newChatText = document.createElement('div')
  newChatText.classList.add('chat-text')
  newChatText.innerHTML = `<strong>Veronica:</strong> ${t}`

  chatBox.appendChild(newChatText)
})

let spinner = document.getElementById('spinner')

