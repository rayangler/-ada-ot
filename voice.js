const Discord = require('discord.js');

var voice = "uk-male";

function chooseVoiceFile(command) {
  
}

module.exports = {
  playCommand: function(voiceChannel, command) {
    voiceChannel.join()
      .then(connection => console.log('Connected'))
      .catch(console.error);
  }
};
