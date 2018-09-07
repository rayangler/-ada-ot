function patch1_1() {
  return ("```md\n\
|* BADABOT 1.1 BOOSTER PACK PATCH NOTES: *|\n\n\
+ Added <badabam> command.\n\
+ Added <badabigballerbrand> command.\n\
+ Added <producer> command.\n\
+ <Yer>? Yyyyyeeeeerrrrrr.\n\
```");
}

function patch1_2() {
  return ("```md\n\
|* BADABOT 1.2.2 BOOSTER PACK PATCH NOTES: *|\n\n\
+ Have you ever wanted somebody to <badaboom> your <badabing> out loud? Probably not. \
Hop into a <Voice Channel> with your friends and bots anyways.\n\
+ Tired of always hearing the same voice? See if you can get a <badavoicechange>.\n\
+ Added a relevant BLACKPINK reference as a command. It shouldn't be too hard \
to figure it out.\n\
\n* Improved code maintainability. (Even though you can't really tell, but at \
least you know.)\n\
* Fixed some badabugs with the badabig command.\n\
* Badabot no longer dies when given commands from multiple people in a voice \
channel at the same time. (He might need some time to figure out what to say next though.)\
```");
}

module.exports = {
  printPatchNotes: function(version) {
    switch (version) {
      case 1.1:
        return patch1_1();
      case 1.2:
        return patch1_2();
      default:
        return "I'm broken.";
    }
  }
}
