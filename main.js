const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require('./functions');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) {
    return;
  }

  var input = message.content.toLowerCase();

  // Basic Bada commands
  // BADABING
  if (input.includes("badabing") ||
      input.includes("bada bing") ) {
    message.channel.send(":b:ada:b:oom");
  }

  // BADABOOM
  if (input.includes("badaboom") ||
      input.includes("bada boom") ) {
    message.channel.send(":b:ada:b:ing");
  }

  // BADABIGBALLERBRAND
  if (input.includes("badabigballerbrand")) {
    message.channel.send(":b:ada:b:igDickEnergy");
  }

  // BADABIG
  else if (input.includes("badabig") ||
      input.includes("bada big") ) {
    message.channel.send(":b:adaNasty");
  }

  // HOW'S BADABUSINESS
  if (input.includes("how's badabusiness") ||
      input.includes("hows badabusiness") ||
      input.includes("how's bada business") ||
      input.includes("hows bada business") ) {
    message.channel.send(":b:ada:b:oomin'");
  }

  // BADABAM
  if (input.includes("badabam")) {
    message.channel.send(":b:adaslam");
  }

  // PRODUC-
  if (input.includes("produc")) {
    message.channel.send("Metro :b:ada:b:oomin'");
  }

  // YER
  if (functions.findYer(input)) {
    message.channel.send(functions.respondYer());
  }

  // Misc. Commands
  if (input == "badabot creator") {
    message.channel.send("My creator is none other than :b:aemund. You're welcome.");
  }

});

client.login(process.env.BOT_TOKEN);
