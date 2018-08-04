const Discord = require('discord.js');
const client = new Discord.Client();

const yer = require('./yer');
const patchNotes = require('./patchNotes');
const voice = require('./voice');
const commandsMap = require('./commands');

const currentVersion = 1.1;

function respond(message, command) {
  var response = commandsMap.get(command);
  message.channel.send(response);
  if (message.member.voiceChannel) {
    voice.playCommand(message.member.voiceChannel, response);
  }
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) {
    return;
  }

  var input = message.content.toLowerCase();
  var channel = message.channel;

  // Basic Bada commands
  // BADABING
  if (input.includes("badabing") ||
      input.includes("bada bing") ) {
    respond(message, "badabing");
  }

  // BADABOOM
  if (input.includes("badaboom") ||
      input.includes("bada boom") ) {
    respond(message, "badaboom");
  }

  // BADABIGBALLERBRAND
  if (input.includes("badabigballerbrand")) {
    respond(message, "badabigballerbrand");
  }

  // BADABIG
  else if (input.includes("badabig") ||
      input.includes("bada big") ) {
    respond(message, "badabig");
  }

  // HOW'S BADABUSINESS
  if (input.includes("how's badabusiness") ||
      input.includes("hows badabusiness") ||
      input.includes("how's bada business") ||
      input.includes("hows bada business") ) {
    respond(message, "how's badabusiness");
  }

  // BADABAM
  if (input.includes("badabam")) {
    respond(message, "badabam");
  }

  // PRODUC-
  if (input.includes("produc")) {
    respond(message, "produc");
  }

  // YER
  if (yer.findYer(input)) {
    message.channel.send(yer.respondYer());
  }

  // Misc. Commands
  if (input == "badabot creator") {
    message.channel.send("My creator is none other than :b:aemund. You're welcome.");
  }

  // Patch notes
  if (input == "badabooster pack" || input == "badaboosterpack") {
    message.channel.send(patchNotes.printPatchNotes(currentVersion));
  }

});

client.login(process.env.BOT_TOKEN);
