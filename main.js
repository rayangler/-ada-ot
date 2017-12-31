const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var input = message.content.toLowerCase();
  
  if (input == "badabing" ||
      input == "bada bing" ||
      input == ":b:ada:b:ing" ||
      input == ":b:ada :b:ing") {
    message.channel.send(":b:ada:b:oom");
  }
  if (input == "badaboom" ||
      input == "bada boom" ||
      input == ":b:ada:b:oom" ||
      input == ":b:ada :b:oom") {
    message.channel.send(":b:ada:b:ing");
  }
  if (input == "badabot creator") {
    message.channel.send("My creator is none other than Raymund. You're welcome.");
  }
  
});

client.login(process.env.BOT_TOKEN);
