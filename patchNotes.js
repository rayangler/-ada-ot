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

function patch2_0() {
  return(
    "```md\n\
  |* BADABOT 2.0 BOOSTER PACK PATCH NOTES: *|\n\n\
  + Back and BADA-er than better. (HA, get it?)\n\
  + Can support more than one server using it at a time now.\
  (Badabot won't get confused if one server says 'badabing' and another says\
  'badaboom')\n\
  + Less crashes, hopefully!\n\
  - Nerfed Badabot's chance to say 'yeet' down to 0.5% from 5%.\n\
  ~ Please @ me if Badabot fails again. I wrote the update months ago and I don't \
  remember if there were any bugs or not. :^)\
  ```"
  );
}

module.exports = {
  printPatchNotes: function(version) {
    switch (version) {
      case 1.1:
        return patch1_1();
      case 1.2:
        return patch1_2();
      case 2.0:
        return patch2_0();
      default:
        return "I'm broken.";
    }
  }
}
