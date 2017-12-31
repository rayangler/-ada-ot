const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var input = message.content.toLowerCase();
  
  // Basic Bada commands
  if (input.includes("badabing") ||
      input.includes("bada bing") ) {
    message.channel.send(":b:ada:b:oom");
  }
  if (input.includes("badaboom") ||
      input.includes("bada boom") ) {
    message.channel.send(":b:ada:b:ing");
  }
  if (input.includes("badabig") ||
      input.includes("bada big") ) {
    message.channel.send(":b:adaNasty");
  }
  if (input.includes("how's badabusiness") ||
      input.includes("hows badabusiness") ) {
    message.channel.send(":b:ada:b:oomin'");
  }
  
  // Misc. Commands
  if (input == "badabot creator") {
    message.channel.send("My creator is none other than :b:aemund. You're welcome.");
  }
  
});

client.login(process.env.BOT_TOKEN);
