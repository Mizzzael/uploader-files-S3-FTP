let ws = null;
window.addEventListener('load', e => {
  startChat();
}, false);

function startChat () {
  ws = adonis.Ws().connect()

  ws.on('open', () => {
    console.log('OPEN');
    subscribeToChannel();
  })

  ws.on('error', () => {
    console.log('Error');
  })

  ws.on('message', (message) => {
    console.log(message);
  });


  setTimeout(() => {
    ws.getSubscription('chat').emit('message', {
      username: "Sabugo",
      body: "Bunda"
    })
  }, 3000);
}

function subscribeToChannel () {
  const chat = ws.subscribe('chat')

  chat.on('error', () => {
   console.log('Putz');
  })

  chat.on('message', (message) => {
    console.log(message);
  })
}