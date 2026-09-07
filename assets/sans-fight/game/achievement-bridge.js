// Adapter for the pinned Construct 2 export; no changes to combat logic.
// sc is its Function plugin. D initializes an instance; Ui identifies On function.
(() => {
  'use strict';
  const initialize = sc.prototype.S.prototype.D;
  sc.prototype.S.prototype.D = function () {
    initialize.apply(this, arguments);
    const runtime = this.b;
    const trigger = runtime.trigger;
    let normalRun = false;
    runtime.trigger = function (condition, instance, name) {
      if (condition === sc.prototype.c.Ui && typeof name === 'string') {
        const event = name.toLowerCase();
        if (event.startsWith('menumode')) {
          normalRun = event === 'menumodenormal';
        } else if (event === 'menumain') {
          normalRun = false;
        } else if (event === 'win1' && normalRun) {
          // Win1 follows the final attack, when Sans concedes victory.
          normalRun = false;
          try {
            window.parent.ROUAchievements?.unlock(
              'sans-normal',
              "time to go to Grillby's",
              'assets/sans-fight/source/Animations/SansHead/Default/000.png'
            );
          } catch (error) {
            // Storage restrictions must never interrupt the game's victory sequence.
            console.warn('Could not save the Sans achievement:', error);
          }
        }
      }
      return trigger.apply(this, arguments);
    };
  };
})();
