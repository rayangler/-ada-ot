const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', () => {
  if (message.content.toLowerCase() == "badabing") {
    message.channel.send("🅱ada🅱oom");
  }
});

client.login(process.env.BOT_TOKEN);