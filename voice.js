const Discord = require('discord.js');

// Voices to choose from
var voices = [
  "uk-male",
  "us-female"
];
var voiceIndex = 0; // Start at 0
var voice = voices[voiceIndex]; // The sound of badabot in the voice channel
var isPlaying = false;

var voiceQueue = []; // Queue of voice files

// Plays the queue of voice files
function playVoiceQueue(connection) {
  var voiceFile = voiceQueue.shift();
  var dispatcher = connection.playFile(voiceFile);
  console.log("Playing voice file: " + voiceFile);
  dispatcher.on('end', () => {
    if (voiceQueue[0]) playVoiceQueue(connection);
    else {
      isPlaying = false;
      connection.disconnect();
      console.log("End of dispatcher connection");
    }
  });
}

// Makes the response of the command match the name of the voice file
function fixResponse(response) {
  var newResponse =  response.split(' ').join("") // Remove whitesspace
                             .split(':').join("") // Remove emoji indicator
                             .split("'").join(""); // Remove apostrophes
  return newResponse.toLowerCase();
}

module.exports = {
  // Play the voice files in voiceQueue
  playResponse: function(voiceChannel) {
    if (isPlaying) return;
    voiceChannel.join()
      .then(connection => {
        isPlaying = true;
        playVoiceQueue(connection);
      })
      .catch(console.error);
  },

  // Forcefully remove bot from voice channel
  leave: function(voiceChannel) {
    console.log('Disconnected from voice channel: ' + voiceChannel);
    voiceChannel.leave();
  },

  // Switch between voices
  changeVoice: function(channel) {
    // Reset voiceIndex
    if (++voiceIndex >= voices.length) voiceIndex = 0;
    voice = voices[voiceIndex];

    channel.send(`Voice changed to: **${voice}**`);
    console.log("Voice changed to: " + voice);
  },

  // Adds the response of the Bada Command to the voice queue
  addToQueue: function(response) {
    var newResponse = fixResponse(response);
    var voiceFile = `./voices/${voice}/${newResponse}.mp3`;

    voiceQueue.push(voiceFile);
    console.log(voiceFile + " added to queue");
  },

  // Returns true if there are no files in the voice queue
  voiceQueueEmpty: function() {
    return (voiceQueue.length == 0) ? true : false;
  },

  clickclack: function(response) {
    var voiceFile = `./voices/${response}.mp3`;

    voiceQueue.push(voiceFile);
  }
};
