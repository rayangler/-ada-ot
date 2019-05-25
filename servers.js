var servers = new Map();

module.exports = {
  // Get reference to the servers settings as a whole.
  get: (serverId) => {
    return servers.get(serverId);
  },

  // Reference to queue of the server
  getQueue: (serverId) => {
    return servers.get(serverId).queue;
  },

  // Create a new server in the map with default settings.
  newServer: (serverId) => {
    servers.set(serverId, {
      queue: [],
      isPlaying: false,
      voiceId: 0 // uk-male default
    });
  },

  // Adds a new voice file to the end of the queue
  addToQueue: (serverId, voiceFile) => {
    servers.get(serverId).queue.push(voiceFile);
  },

  // Returns next element in queue and then shifts forward
  nextInQueue: (serverId) => {
    return servers.get(serverId).queue.shift();
  },

  // Sets the index of the voice
  setVoiceId: (serverId, index) => {
    servers.get(serverId).voiceId = index;
  },

  // Change the current status of the bot playing something
  changePlaying: (serverId) => {
    servers.get(serverId).isPlaying = !servers.get(serverId).isPlaying;
  },

  // Change the current status of the bot playing something to false
  setPlayingFalse: (serverId) => {
    servers.get(serverId).isPlaying = false;
  },

  // Change the current status of the bot playing something to true
  setPlayingTrue: (serverId) => {
    servers.get(serverId).isPlaying = true;
  },

  // Returns if there is anything playing in the server
  isPlaying: (serverId) => {
    return servers.get(serverId).isPlaying;
  },

  // Debug command to print servers to the console
  console: () => {
    console.log(servers);
  }
}
