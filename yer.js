function randomNumber() {
  return Math.floor(Math.random() * 10) + 1; // Random number between 1 to 10
}

module.exports = {
  /* Checks a message to see if "yer" is contained in it. */
  findYer: function(message) {
    let re = /y+\s*e+\s*r+/g;
    if (message.search(re) != -1) {
      return true;
    } else {
      return false;
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
