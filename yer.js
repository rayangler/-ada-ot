function randomNumber() {
  return Math.floor(Math.random() * 10) + 1; // Random number between 1 to 10
}

module.exports = {
  /* Checks a message to see if "yer" is contained in it. */
  findYer: function(message) {
    var yer = "yer"; // Trigger word that we are looking for
    var yerIndex = 0; // Index character of trigger
    var nextLetter = yer[yerIndex]; // Next letter to look for
    var previousLetter = null; // The next letter that was just found

    for (var i = 0; i < message.length; i++) {
      // If the number of characters left in the message is less than the number
      // of letters left to find in the trigger word, then yer is not present
      if ((message.length - i) < (yer.length - yerIndex)) {
        return false;
      }
      // Progress is made
      if (message[i] == nextLetter) {
        // The nextLetter found is also the last letter of the trigger
        if (yerIndex == yer.length - 1) {
          return true;
        }
        previousLetter = nextLetter;
        nextLetter = yer[++yerIndex];
      }
      // Continuing the search
      else if (yerIndex === 0 || message[i] == previousLetter) {
        continue;
      }
      // Reset the search for yer
      else {
        yerIndex = 0;
        nextLetter = yer[yerIndex];
        previousLetter = null;
      }
    }
  },

  /* Provides "yer" with varying quantities of each letter */
  respondYer: function() {
    var yer = "yer"; // Yer
    var response = ""; // Stores the letters of yer

    for (var i = 0; i < yer.length; i++) {
      response += yer[i].repeat(randomNumber());
    }

    return response.toUpperCase();
  }

}
