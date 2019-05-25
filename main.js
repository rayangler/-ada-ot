const Discord = require('discord.js');
const client = new Discord.Client();

const yer = require('./yer');
const patchNotes = require('./patchNotes');
const voice = require('./voice');
const commandsMap = require('./commands');
const servers = require('./servers');

const currentVersion = 2.0;

// The standard Bada Commands
var commandsList = [
  "badabing",
  "badaboom",
  "badabig",
  "badabigballerbrand",
  "howsbadabusiness",
  "badabam",
  "produc",
  "yer"
];

// Prints response to a badacommand in text channel
function printMessage(channel, response) {
  if (response == 'yer') {
    channel.send(yer.respondYer());
    return;
  }

  let newResponse = response.replace(/b/g, ':b:');
  channel.send(newResponse);
}

// Prepares the response to voice/text channels
function prepResponse(serverId, textChannel, voiceChannel, response) {
  if (voiceChannel) {
    voice.addToQueue(serverId, response);
  }

  printMessage(textChannel, response);
}

// Looks for the presence of keywords of commands in the message
function checkForBadaCommands(serverId, textChannel, input, voiceChannel) {
  var commandFound = false;

  // Go through the array of basic keywords: "badabing", "badaboom", etc.
  for (var i = 0; i < commandsList.length; i++) {
    var command = commandsList[i];

    if (command == "badabig" && input.includes("badabigballerbrand")) {
      continue;
    }
    else if ((command == "yer" && yer.findYer(input)) || input.includes(command)) {
      commandFound = true;
      prepResponse(serverId, textChannel, voiceChannel, commandsMap.get(command));
    }
  }

  // Done looking through commands. Play responses now
  if (voiceChannel && commandFound) {
      voice.playResponse(serverId, voiceChannel);
  }
}

// See if bot wants to randomly say yeet
function tryYeet(channel) {
  var chance = Math.floor(Math.random() * 200); // 0 to 199 (inclusive)

  // 0.5% chance to randomly say yeet every message
  if (chance < 1) {
    channel.send("Yeet");
  }
}

///////////////////////////////////////////////////////////////////////////////

// Discord bot is now online
client.on('ready', () => {
  console.log('I am ready!');
});

// Bot picks up a message on the server(s) it's in
client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) return;

  // Remove all ' and whitespace, while making the message all lowercase.
  var input = message.content.toLowerCase().replace(/ |'/g, '');
  var voiceChannel = message.member.voiceChannel;
  var serverId = message.guild.id;

  // Server is not yet known to the bot
  if (!servers.get(serverId)) {
    servers.newServer(serverId);
  }

  // Look for commands
  if (input == "badachangevoice" || input == "badavoicechange") {
    voice.changeVoice(serverId, message.channel);
  }
  else if (input == "badaboosterpack" || input == "badapatchnotes") {
    message.channel.send(patchNotes.printPatchNotes(currentVersion));
  }
  // Easter Egg Command 1
  else if (input == "clickclack" && voiceChannel) {
    voice.clickclack(serverId, input);
    voice.playResponse(serverId, voiceChannel);
  }
  else {
    checkForBadaCommands(serverId, message.channel, input, voiceChannel);
  }

  tryYeet(message.channel);

});

// Bot logs in
client.login(process.env.BOT_TOKEN);
