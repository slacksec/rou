/*
 * WEBSITE ANNOUNCEMENT + ADMIN ABUSE SETTINGS
 * Edit only the values in this block to update the feature across every page.
 */
const ADMIN_ABUSE_SETTINGS = {
  websiteName: 'Calvin',
  announcementText: 'Testing, testing',
  showAnnouncement: true,
  announcementSeconds: 5,

  // Easy-to-edit announcement colours and fonts
  nameColor: '#ffffff',
  textColor: '#ffffff',
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  nameFont: 'Arial, Helvetica, sans-serif',
  textFont: 'Arial, Helvetica, sans-serif',

  // Change this one line to true to start the music and disco effects.
  adminAbuse: false,

  // Add, remove, or reorder local MP3 files to change the party playlist.
  musicVolume: 0.8,
  musicTracks: [
    { title: 'Raining Tacos', file: 'assets/admin-abuse-music/raining-tacos.mp3' },
    { title: 'Crab Rave', file: 'assets/admin-abuse-music/crab-rave.mp3' },
    { title: 'Party Track 3', file: 'assets/admin-abuse-music/party-track-3.mp3' },
    { title: 'Nyan Cat', file: 'assets/admin-abuse-music/nyan-cat.mp3' }
  ]
};

(() => {
  'use strict';

  const settings = ADMIN_ABUSE_SETTINGS;
  const originalTitle = document.title;
  document.title = originalTitle
    ? `${settings.websiteName} — ${originalTitle}`
    : settings.websiteName;

  const css = `
    #admin-abuse-layer {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      pointer-events: none;
      overflow: hidden;
      isolation: isolate;
    }

    #admin-abuse-announcement {
      --name-color: ${settings.nameColor};
      --text-color: ${settings.textColor};
      --announcement-bg: ${settings.backgroundColor};
      --announcement-border: ${settings.borderColor};
      position: absolute;
      top: max(18px, env(safe-area-inset-top));
      left: 50%;
      width: min(680px, calc(100vw - 32px));
      padding: 8px 16px;
      border: 0;
      color: var(--text-color);
      background: var(--announcement-bg);
      text-align: center;
      opacity: 0;
      transform: translate(-50%, -145%);
      transition: opacity .25s ease, transform .45s cubic-bezier(.2, .9, .3, 1.18);
    }

    #admin-abuse-announcement.is-visible {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    #admin-abuse-announcement .admin-site-name {
      display: block;
      margin-bottom: 5px;
      color: var(--name-color);
      font-family: ${settings.nameFont};
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 400;
      line-height: 1.1;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .9);
    }

    #admin-abuse-announcement .admin-message {
      display: block;
      color: var(--text-color);
      font-family: ${settings.textFont};
      font-size: clamp(1rem, 3.4vw, 1.3rem);
      font-weight: 400;
      line-height: 1.25;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .9);
    }

    #admin-abuse-layer.party-on::before {
      content: '';
      position: absolute;
      inset: -55vmax;
      background: repeating-conic-gradient(
        from 0deg at 50% 50%,
        rgba(255, 0, 222, .11) 0deg 8deg,
        transparent 8deg 20deg,
        rgba(0, 238, 255, .1) 20deg 28deg,
        transparent 28deg 40deg
      );
      animation: adminPartyWash 2.2s linear infinite;
    }

    .admin-disco-ball {
      position: absolute;
      top: -4vmin;
      width: clamp(125px, 20vmin, 245px);
      aspect-ratio: 1;
      border: 5px solid rgba(255, 255, 255, .9);
      border-radius: 50%;
      background:
        linear-gradient(90deg, transparent 47%, rgba(0, 0, 0, .48) 50%, transparent 53%),
        linear-gradient(0deg, transparent 47%, rgba(0, 0, 0, .4) 50%, transparent 53%),
        repeating-linear-gradient(90deg, rgba(255,255,255,.9) 0 9%, #9ff 9% 17%, #f7a 17% 25%);
      background-size: 29% 100%, 100% 25%, 100% 100%;
      box-shadow: 0 0 30px #fff, 0 0 80px #00eaff, 0 0 130px #ff00de;
      animation: adminDiscoSpin 1.05s linear infinite, adminBallGlow .55s steps(2) infinite;
    }

    .admin-disco-ball.left { left: 4vw; }
    .admin-disco-ball.right { right: 4vw; animation-direction: reverse, normal; }

    .admin-light-ray {
      position: absolute;
      top: -18vh;
      left: 50%;
      width: 9vw;
      min-width: 65px;
      height: 145vh;
      opacity: .64;
      transform-origin: 50% 0;
      filter: blur(7px);
      mix-blend-mode: screen;
      clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);
      animation: adminRayFlash .52s steps(2) infinite alternate;
    }

    .admin-party-label {
      position: absolute;
      right: 12px;
      bottom: 12px;
      padding: 8px 12px;
      border: 2px solid #fff;
      border-radius: 999px;
      color: #fff;
      background: #7d00af;
      font: 900 13px/1 Arial, sans-serif;
      box-shadow: 0 0 18px #ff4fd8;
      animation: adminLabelBounce .6s ease-in-out infinite alternate;
      pointer-events: auto;
      cursor: pointer;
    }

    @keyframes adminDiscoSpin { to { transform: rotate(360deg); } }
    @keyframes adminBallGlow { to { filter: hue-rotate(120deg); } }
    @keyframes adminPartyWash { to { transform: rotate(360deg) scale(1.45); } }
    @keyframes adminRayFlash {
      from { opacity: .24; filter: blur(10px) hue-rotate(0deg); }
      to { opacity: .85; filter: blur(4px) hue-rotate(150deg); }
    }
    @keyframes adminLabelBounce { to { transform: translateY(-8px) rotate(2deg); } }

    @media (prefers-reduced-motion: reduce) {
      #admin-abuse-layer *, #admin-abuse-layer::before { animation-duration: 4s !important; }
    }
  `;

  function addStyles() {
    const style = document.createElement('style');
    style.id = 'admin-abuse-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function makeLayer() {
    const layer = document.createElement('div');
    layer.id = 'admin-abuse-layer';
    layer.setAttribute('aria-live', 'polite');
    document.body.appendChild(layer);
    return layer;
  }

  function showAnnouncement(layer) {
    if (!settings.showAnnouncement || !settings.announcementText) return;

    // The same announcement appears only once. Editing either line makes it new.
    const announcementId = `${settings.websiteName}\n${settings.announcementText}`;
    const storageKey = 'admin-abuse-last-announcement';
    try {
      if (localStorage.getItem(storageKey) === announcementId) return;
      localStorage.setItem(storageKey, announcementId);
    } catch {
      // The announcement still works if storage is unavailable.
    }

    const announcement = document.createElement('div');
    announcement.id = 'admin-abuse-announcement';

    const name = document.createElement('strong');
    name.className = 'admin-site-name';
    name.textContent = settings.websiteName;

    const message = document.createElement('span');
    message.className = 'admin-message';
    message.textContent = settings.announcementText;

    announcement.append(name, message);
    layer.appendChild(announcement);
    requestAnimationFrame(() => announcement.classList.add('is-visible'));

    window.setTimeout(() => {
      announcement.classList.remove('is-visible');
      window.setTimeout(() => announcement.remove(), 500);
    }, Math.max(1, settings.announcementSeconds) * 1000);
  }

  let partyAudio = null;
  let partyTrackIndex = 0;

  async function startPartyMusic(label) {
    if (!settings.musicTracks.length) return false;
    if (partyAudio && !partyAudio.paused) return true;

    try {
      await partyAudio.play();
      const track = settings.musicTracks[partyTrackIndex];
      label.dataset.musicState = 'playing';
      label.textContent = `🔊 ${track.title} 🪩`;
      return true;
    } catch {
      label.dataset.musicState = 'waiting';
      label.textContent = '🔊 TAP FOR MUSIC 🪩';
      return false;
    }
  }

  function startParty(layer) {
    if (!settings.adminAbuse) return;
    layer.classList.add('party-on');

    ['left', 'right'].forEach((side) => {
      const ball = document.createElement('div');
      ball.className = `admin-disco-ball ${side}`;
      ball.setAttribute('aria-hidden', 'true');
      layer.appendChild(ball);
    });

    const rayColors = ['#ff00de', '#00eaff', '#fff200', '#54ff69', '#ff6138', '#8d5cff'];
    for (let i = 0; i < 16; i += 1) {
      const ray = document.createElement('div');
      ray.className = 'admin-light-ray';
      ray.style.background = `linear-gradient(${rayColors[i % rayColors.length]}, transparent)`;
      ray.style.transform = `translateX(-50%) rotate(${i * 22.5 - 168}deg)`;
      ray.style.animationDelay = `${(i % 5) * -0.11}s`;
      layer.appendChild(ray);
    }

    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'admin-party-label';
    label.textContent = '🔊 TAP FOR MUSIC 🪩';
    label.title = 'Start the party music';
    layer.appendChild(label);

    partyAudio = document.createElement('audio');
    partyAudio.id = 'admin-party-audio';
    partyAudio.preload = 'auto';
    partyAudio.volume = Math.min(1, Math.max(0, settings.musicVolume));
    partyAudio.src = settings.musicTracks[partyTrackIndex].file;
    layer.appendChild(partyAudio);

    partyAudio.addEventListener('ended', async () => {
      partyTrackIndex = (partyTrackIndex + 1) % settings.musicTracks.length;
      partyAudio.src = settings.musicTracks[partyTrackIndex].file;
      await startPartyMusic(label);
    });

    const unlockMusic = async () => {
      if (await startPartyMusic(label)) {
        document.removeEventListener('pointerdown', unlockMusic, true);
        document.removeEventListener('keydown', unlockMusic, true);
      }
    };

    label.addEventListener('click', unlockMusic);
    document.addEventListener('pointerdown', unlockMusic, { capture: true });
    document.addEventListener('keydown', unlockMusic, { capture: true });
    startPartyMusic(label);
  }

  function init() {
    addStyles();
    const layer = makeLayer();
    showAnnouncement(layer);
    startParty(layer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
