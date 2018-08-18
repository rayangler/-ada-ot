const Discord = require('discord.js');
const client = new Discord.Client();

const yer = require('./yer');
const patchNotes = require('./patchNotes');
const voice = require('./voice');
const commandsMap = require('./commands');

const currentVersion = 1.2;

// The standard Bada Commands
var commandsList = [
  "badabing",
  "badaboom",
  "badabigballerbrand",
  "badabig",
  "howsbadabusiness",
  "badabam",
  "produc",
  "yer"
];

function checkForBadaCommands(message, input, voiceChannel) {
  for (var i = 0; i < commandsList.length; i++) {
    var command = commandsList[i];
    if (command == "badabig" && input.includes("badabigballerbrand")) continue;
    if (command == "yer" && yer.findYer(input)) {
      respond(message, command);
      continue;
    }
    if (input.includes(command)) {
      respond(message, command);
    }
  }

  // After the badacommands are done:
  if (voiceChannel && !voice.voiceQueueEmpty()) {
    voice.playResponse(voiceChannel);
  }
}

// Determines what to do with the Bada Command
function respond(message, command) {
  var response = commandsMap.get(command);

  if (command == "yer") {
    message.channel.send(yer.respondYer());
  }
  else {
    message.channel.send(response);
  }

  if (message.member.voiceChannel) {
    voice.addToQueue(response);
  }
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) return;

  var voiceChannel = message.member.voiceChannel;
  var input = message.content.toLowerCase();
  // Get rid of whitespace and apostrophes
  input = input.split(" ").join("").split("'").join("");
  console.log("Message: " + input);

  if (input == "badaleave" && voiceChannel) {
    voice.leave(voiceChannel);
  }
  else if (input == "badachangevoice" || input == "badavoicechange") {
    voice.changeVoice(message.channel);
  }
  else if (input == "badabotcreator") {
    message.channel.send("My creator is none other than :b:aemund. You're welcome.");
  }
  else if (input == "badaboosterpack" || input == "badapatchnotes") {
    message.channel.send(patchNotes.printPatchNotes(currentVersion));
  }
  else if (input == "clickclack" && voiceChannel) {
    voice.clickclack(input);
    voice.playResponse(voiceChannel);
  }
  else {
    checkForBadaCommands(message, input, voiceChannel);
  }

});


//client.login(process.env.BOT_TOKEN);
client.login("Mzk2ODgwNDI5OTI5NzI1OTU0.DSoBlg.YrLoJg8wpcYKD7s5zj-niYzzs7Q");
