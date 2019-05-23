const Discord = require('discord.js');
const client = new Discord.Client();

const yer = require('./yer');
const patchNotes = require('./patchNotes');
const voice = require('./voice');
const commandsMap = require('./commands');
const servers = require('./servers');

const currentVersion = 1.2;

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

/* Takes a response to a badacommand and handles printing it appropriately. */
function printMessage(channel, response) {
  if (response == 'yer') {
    channel.send(yer.respondYer());
    return;
  }
  let newResponse = response.replace(/b/g, ':b:');
  channel.send(newResponse);
}

function prepResponse(serverId, textChannel, voiceChannel, response) {
  if (voiceChannel) {
    voice.addToQueue(serverId, response);
  }
  printMessage(textChannel, response);
}

function checkForBadaCommands(serverId, textChannel, input, voiceChannel) {
  for (var i = 0; i < commandsList.length; i++) {
    var command = commandsList[i];
    if (command == "badabig" && input.includes("badabigballerbrand")) {
      continue;
    }
    else if ((command == "yer" && yer.findYer(input)) || input.includes(command)) {
      prepResponse(serverId, textChannel, voiceChannel, commandsMap.get(command));
    }
  }

  if (voiceChannel) {
      voice.playResponse(serverId, voiceChannel);
  }
}

function tryYeet(channel) {
  var chance = Math.floor(Math.random() * 100); // 0 to 99 (inclusive)
  // 5% chance to randomly say yeet every message
  if (chance < 1) {
    channel.send("Yeet");
  }
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) return;

  // Remove all ' and whitespace, while making the message all lowercase.
  var input = message.content.toLowerCase().replace(/ |'/g, '');
  var voiceChannel = message.member.voiceChannel;
  var serverId = message.guild.id;
  if (!servers.get(serverId)) {
    servers.newServer(serverId);
  }

  if (input == "badachangevoice" || input == "badavoicechange") {
    voice.changeVoice(serverId, message.channel);
  }
  else if (input == "badabotcreator") {
    message.channel.send("My creator is none other than :b:aemund. You're welcome.");
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


//client.login(process.env.BOT_TOKEN);
client.login('Mzk2ODgwNDI5OTI5NzI1OTU0.DnSFAw.VLlw3r8xJ0up3m41yH7_CwetfsQ');
