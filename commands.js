var commandsMap = new Map();

commandsMap.set("badabing", "badaboom");
commandsMap.set("badaboom", "badabing");
commandsMap.set("badabigballerbrand", "badabigDickEnergy");
commandsMap.set("badabig", "badaNasty");
commandsMap.set("howsbadabusiness", "badaboomin'");
commandsMap.set("badabam", "badaslam");
commandsMap.set("produc", "Metrobadaboomin'");
commandsMap.set("yer", "yer");

module.exports = {
  get: function(message) {
    return commandsMap.get(message);
  }
}
