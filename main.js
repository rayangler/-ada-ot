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
}

// Excludes yer
var commandsList = ["badabing",
                    "badaboom",
                    "badabigballerbrand",
                    "badabig",
                    "howsbadabusiness",
                    "badabam",
                    "produc"];

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Prevents bot messages to be accepted
  if (message.author.bot) {
    return;
  }

  var input = message.content.toLowerCase();
  // Get rid of whitespace and apostrophes
  input = input.split(" ").join("").split("'").join("");
  var channel = message.channel;

  for (var i = 0; i < commandsList.length; i++) {
    var command = commandsList[i];
    if (command == "badabig" && input.includes("badabigballerbrand")) continue;
    if (input.includes(command)) {
      respond(message, command);
    }
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
