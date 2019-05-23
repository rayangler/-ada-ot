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
  addToQueue: (serverId, voiceFile) => {
    servers.get(serverId).queue.push(voiceFile);
  },
  nextInQueue: (serverId) => {
    return servers.get(serverId).queue.shift();
  },
  setVoiceId: (serverId, index) => {
    servers.get(serverId).voiceId = index;
  },
  changePlaying: (serverId) => {
    servers.get(serverId).isPlaying = !servers.get(serverId).isPlaying;
  },
  isPlaying: (serverId) => {
    return servers.get(serverId).isPlaying;
  },
  console: () => {
    console.log(servers);
  }
}
