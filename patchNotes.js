function patch1_1() {
  return ("```md\n\
|* BADABOT 1.1 BOOSTER PACK PATCH NOTES: *|\n\
+ Added <badabam> command.\n\
+ Added <badabigballerbrand> command.\n\
+ Added <producer> command.\n\
+ <Yer>? Yyyyyeeeeerrrrrr.\n\
```");
}

module.exports = {
  printPatchNotes: function(version) {
    switch (version) {
      case 1.1:
        return patch1_1();
      default:
        return "I'm broken.";
    }
  }
}
