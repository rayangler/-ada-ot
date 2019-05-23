const Discord = require('discord.js');
const servers = require('./servers');

// Voices to choose from
var voices = [
  "uk-male",
  "us-female"
];

function getVoice(serverId) {
  return voices[servers.get(serverId).voiceId];
}

// Plays the queue of voice files
function playVoiceQueue(serverId, connection) {
  var voiceFile = servers.nextInQueue(serverId);
  var dispatcher = connection.playFile(voiceFile);

  // When the voice file triggers 'end' event, check if it should still play.
  dispatcher.on('end', () => {
    if (servers.getQueue(serverId)[0]) playVoiceQueue(serverId, connection);
    else {
      connection.disconnect();
      servers.changePlaying(serverId);
    }
  });
}

// Makes the response of the command match the name of the voice file
function fixResponse(response) {
  return response.toLowerCase().replace(/ |'/g, '');
}

module.exports = {
  // Play the voice files in voiceQueue
  playResponse: function(serverId, voiceChannel) {
    if (servers.isPlaying(serverId)) {
      return;
    }

    voiceChannel.join()
      .then(connection => {
        playVoiceQueue(serverId, connection);
        servers.changePlaying(serverId);
      })
      .catch(console.error);
  },

  // Switch between voices
  changeVoice: function(serverId, channel) {
    var voiceIndex = servers.get(serverId).voiceId;

    // Reset voiceIndex
    if (++voiceIndex >= voices.length) {
      voiceIndex = 0;
    }

    let voice = voices[voiceIndex];
    channel.send(`Voice changed to: **${voice}**`);
    servers.setVoiceId(serverId, voiceIndex);
  },

  // Adds the response of the Bada Command to the voice queue
  addToQueue: function(serverId, response) {
    var newResponse = fixResponse(response);
    var voice = getVoice(serverId);
    var voiceFile = `./voices/${voice}/${newResponse}.mp3`;

    if (voiceFile) {
      servers.getQueue(serverId).push(voiceFile);
    }
  },

  // Returns true if there are no files in the voice queue
  voiceQueueEmpty: function(serverId) {
    return (servers.getQueue(serverId).length == 0) ? true : false;
  },

  // Queues up the clickclack voice file
  clickclack: function(serverId, response) {
    var voiceFile = `./voices/${response}.mp3`;
    servers.getQueue(serverId).push(voiceFile);
  }
};
