const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.toLowerCase() == "badabing") {
    message.channel.send(":b:ada:b:oom");
  }
  if (message.content == "badabot creator") {
    message.channel.send("My creator is none other than Raymund. You're welcome.");
  }
});

client.login(process.env.BOT_TOKEN);
