const Insta = require('@androz2091/insta.js');

const client = new Insta.Client();
const fetch = require("node-fetch").default;

client.on('connected', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return

    message.markSeen();

    if(message.content.toLowerCase().includes('who made you')) return message.chat.sendMessage('I am Built By @gizmolab.ai');
    if(message.content.toLowerCase().includes('who built you')) return message.chat.sendMessage('I am Built By @gizmolab.ai');
    if(message.content.toLowerCase().includes('who are you')) return message.chat.sendMessage('I am Gizmolab\'s Test Bot');
    if(message.content.toLowerCase().includes('what is your name')) return message.chat.sendMessage('I dont Have a name yet!');

    fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=${process.env.key}`)
          
    .then(response => response.json())
    .then(data => {
       
      message.chat.sendMessage(data.response)
    })
    .catch(() => {
        message.chat.sendMessage("Couldn't fetch response");
    })

});

client.login(process.env.username, process.env.password);