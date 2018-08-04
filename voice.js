const Discord = require('discord.js');

var voice = "uk-male";

function chooseVoiceFile(command) {
  
}

module.exports = {
  playCommand: function(voiceChannel, command) {
    voiceChannel.join()
      .then(connection => {
        console.log('Connected to voice channel: ' + voiceChannel);
        const dispatcher = connection.playFile('./test.mp3');
      })
      .catch(console.error);
  },

  leave: function(voiceChannel) {
    console.log('Disconnected from voice channel: ' + voiceChannel);
    voiceChannel.leave();
  },

  changeVoice(newVoice) {
    if (newVoice == voice) return;
    voice = newVoice;
    console.log("Voice changed to: " + voice);
  }
};
