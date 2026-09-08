# Bad Time Simulator (Sans Fight)

Upstream: https://github.com/Jcw87/c2-sans-fight
Author: Jcw87. Undertale is by Toby Fox.

- `source/`: all master branch files at 0bb6afe3764d3f4081ec00da1552950b2c2b08e4 (Construct 2 project, documentation, and assets).
- `game/`: browser export from gh-pages at a1732fcddc0487e47ec8d903bcb0049a627e69c7.
- `/sans_fight.html`: full-window host page. The homepage Sans icon opens this page.

`game/menu-bridge.js` defers the first `MenuMain` event until the player clicks the black start screen after attack loading. It draws the prompt and main-menu controls using the original DefaultFont sprite sheet and glyph widths. Controls hide on mode selection and return with the main menu. Enter and Shift use the game's existing bindings.

The original combat code and assets are preserved. `game/achievement-bridge.js` listens for Normal mode and the final `Win1` event to unlock “time to go to Grillby's” through the shared achievement system. The achievement uses the upstream Sans head sprite and appears in the toast and achievements gallery. The exported index also loads the bridge, and the offline manifest includes it with a new cache version. The upstream Google Analytics tag was removed from the exported index page so this site does not send analytics to the original author's account. Git metadata is excluded. The iframe keeps runtime asset paths and the service worker inside the game directory. The existing GitHub Pages workflow deploys these files with the site.
