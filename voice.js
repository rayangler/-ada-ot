const Discord = require('discord.js');
const servers = require('./servers');

// Voices to choose from
var voices = [
  "uk-male",
  "us-female"
];

// Returns the current voice at a given server
function getVoice(serverId) {
  return voices[servers.get(serverId).voiceId];
}

// Plays the queue of voice files
function playVoiceQueue(serverId, connection) {
  var voiceFile = servers.nextInQueue(serverId);
  var dispatcher = connection.playFile(voiceFile);

  // Voice file has ended
  dispatcher.on('end', () => {
    // Play next file
    if (servers.getQueue(serverId)[0]) {
      playVoiceQueue(serverId, connection);
    }
    // No more files to play
    else {
      servers.setPlayingFalse(serverId);

      // Wait 3 seconds. If nothing is playing, leave the voice channel
      setTimeout(() => {
        if (servers.isPlaying(serverId) == false) {
          connection.disconnect();
        }
      }, 5000);
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
    // Bot is already playing
    if (servers.isPlaying(serverId)) {
      return;
    }

    voiceChannel.join()
      .then(connection => {
        servers.setPlayingTrue(serverId);
        playVoiceQueue(serverId, connection);
      })
      .catch(console.error);
  },

  // Switch between voices
  changeVoice: function(serverId, channel) {
    var voiceIndex = servers.get(serverId).voiceId;

    // Reset voice index to 0 to loop around
    if (++voiceIndex >= voices.length) {
      voiceIndex = 0;
    }

    let voice = voices[voiceIndex];
    servers.setVoiceId(serverId, voiceIndex);
    channel.send(`Voice changed to: **${voice}**`);
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
