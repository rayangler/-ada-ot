var commandsMap = new Map();

commandsMap.set("badabing", ":b:ada:b:oom");
commandsMap.set("badaboom", ":b:ada:b:ing");
commandsMap.set("badabigballerbrand", ":b:ada:b:igDickEnergy");
commandsMap.set("badabig", ":b:adaNasty");
commandsMap.set("howsbadabusiness", ":b:ada:b:oomin'");
commandsMap.set("badabam", ":b:adaslam");
commandsMap.set("produc", "Metro :b:ada:b:oomin'");
commandsMap.set("yer", "yer");

module.exports = {
  get: function(message) {
    return commandsMap.get(message);
  }
}
