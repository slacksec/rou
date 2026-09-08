// Presentation adapter for the pinned Construct 2 export.
(() => {
  'use strict';
  let started = false;
  const startSound = new Audio('media/menuselect.ogg');
  startSound.preload = 'auto';
  const font = new Image();
  font.src = 'images/defaultfont.png';
  const overlay = document.createElement('div');
  overlay.id = 'sans-menu-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10;display:none;pointer-events:none';
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  canvas.style.cssText = 'position:absolute;image-rendering:pixelated;pointer-events:none';
  overlay.append(canvas);
  document.body.append(overlay);
  const context = canvas.getContext('2d');
  let screen = '';

  // Same glyph cells and proportional advances as the source DefaultFont.
  function advance(character) {
    if ('#%&MWmw~'.includes(character)) return 9;
    if (' $*+-./0123456789=?@ABCDEFGHIJKLNOPQRSTUVXYZ\\^abcdefghijklnopqrstuvxyz'.includes(character)) return 8;
    if ('"<>{}'.includes(character)) return 7;
    if ('!()[]_'.includes(character)) return 6;
    if (character === '`') return 5;
    if ("',:;|".includes(character)) return 4;
    return 10;
  }

  function line(text, y) {
    let x = (640 - [...text].reduce((sum, c) => sum + advance(c) * 2, 0)) / 2;
    const columns = Math.floor(font.naturalWidth / 10);
    for (const character of text) {
      const glyph = character.charCodeAt(0) - 32;
      context.drawImage(font, (glyph % columns) * 10, Math.floor(glyph / columns) * 16,
        10, 16, x, y, 20, 32);
      x += advance(character) * 2;
    }
  }

  function draw() {
    context.clearRect(0, 0, 640, 480);
    context.imageSmoothingEnabled = false;
    if (!font.complete || !font.naturalWidth) return;
    if (screen === 'start') line('click to start', 224);
    if (screen === 'menu') {
      line('arrow keys to move', 304);
      line('enter to accept/continue', 344);
      line('shift to go back', 384);
    }
  }

  function resize() {
    const rect = document.getElementById('c2canvas').getBoundingClientRect();
    Object.assign(canvas.style, {
      left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px'
    });
  }
  new ResizeObserver(resize).observe(document.getElementById('c2canvas'));
  window.addEventListener('resize', resize);
  font.addEventListener('load', draw);

  function show(next) {
    screen = next;
    overlay.style.display = next ? 'block' : 'none';
    overlay.style.background = next === 'start' ? '#000' : 'transparent';
    overlay.style.pointerEvents = next === 'start' ? 'auto' : 'none';
    overlay.setAttribute('aria-label', next === 'start' ? 'click to start' :
      'arrow keys to move, enter to accept/continue, shift to go back');
    overlay.setAttribute('role', next === 'start' ? 'button' : 'img');
    overlay.tabIndex = next === 'start' ? 0 : -1;
    resize();
    draw();
  }

  function start() {
    if (screen !== 'start') return;
    started = true;
    startSound.play().catch(() => {});
    overlay.blur();
    window.focus();
    window.c2_callFunction('MenuMain', []);
  }
  overlay.addEventListener('click', start);
  window.addEventListener('keydown', event => {
    if (screen !== 'start') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.key === 'Enter' || event.key === ' ') start();
  }, true);

  window.sansMenuEvent = event => {
    if (event === 'menumain') {
      show(started ? 'menu' : 'start');
      // Defer menu creation until a click, after the attack loader completes.
      return !started;
    }
    if (event.startsWith('menumode')) show('');
    return false;
  };
})();
