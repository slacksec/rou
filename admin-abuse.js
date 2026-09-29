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
  adminAbuse: true,
  adminAbuseReloadButtonText: 'Spam reload for more announcement text!',
  adminAbuseHomeGif: 'https://media.tenor.com/YMz82SDst8sAAAAj/tv-tenna-dance.gif',

  // Add, remove, or reorder local MP3 files to change the party playlist.
  musicVolume: 0.8,
  musicTracks: [
    { title: 'Raining Tacos', file: 'assets/admin-abuse-music/raining-tacos.mp3' },
    { title: 'Crab Rave', file: 'assets/admin-abuse-music/crab-rave.mp3' },
    { title: 'Beethoven Virus Ultimate', file: 'assets/admin-abuse-music/beethoven-virus-ultimate.mp3' },
    { title: 'Party Track 4', file: 'assets/admin-abuse-music/party-track-3.mp3' },
    { title: 'Nyan Cat', file: 'assets/admin-abuse-music/nyan-cat.mp3' },
    { title: 'Cutie Mew Mew Magic', file: 'assets/admin-abuse-music/cutie-mew-mew-magic.mp3' },
    { title: 'Scheming Weasel', file: 'assets/admin-abuse-music/scheming-weasel-faster.mp3' }
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

    .admin-reload-pointer {
      position: fixed;
      z-index: 2147483647;
      width: max-content;
      max-width: min(280px, calc(100vw - 24px));
      color: #111;
      font: 400 clamp(.85rem, 2.8vw, 1.35rem)/1 Arial, Helvetica, sans-serif;
      text-align: center;
      transform: translateX(-50%);
      pointer-events: none;
    }

    .admin-reload-pointer .admin-pointer-arrow {
      font-size: 1em;
    }

    .admin-tenna-dance {
      position: absolute;
      right: 28px;
      top: 110px;
      width: clamp(96px, 18vw, 170px);
      height: auto;
      filter:
        drop-shadow(0 0 8px #fff)
        drop-shadow(0 0 18px #00eaff)
        drop-shadow(0 0 26px #ff00de);
      animation: adminTennaVibe .55s ease-in-out infinite alternate, adminTennaShine 1.2s linear infinite;
    }

    @keyframes adminDiscoSpin { to { transform: rotate(360deg); } }
    @keyframes adminBallGlow { to { filter: hue-rotate(120deg); } }
    @keyframes adminPartyWash { to { transform: rotate(360deg) scale(1.45); } }
    @keyframes adminRayFlash {
      from { opacity: .24; filter: blur(10px) hue-rotate(0deg); }
      to { opacity: .85; filter: blur(4px) hue-rotate(150deg); }
    }
    @keyframes adminLabelBounce { to { transform: translateY(-8px) rotate(2deg); } }
    @keyframes adminTennaVibe {
      from { transform: rotate(-6deg) scale(1); }
      to { transform: rotate(6deg) scale(1.09) translateY(-8px); }
    }
    @keyframes adminTennaShine {
      0% {
        filter:
          drop-shadow(0 0 8px #fff)
          drop-shadow(0 0 18px #00eaff)
          drop-shadow(0 0 26px #ff00de);
      }
      100% {
        filter:
          drop-shadow(0 0 12px #fff)
          drop-shadow(0 0 22px #fff200)
          drop-shadow(0 0 30px #54ff69);
      }
    }

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
  const PARTY_MUSIC_STATE_KEY = 'admin-abuse-music-state';

  function getPartyTrackLabel() {
    const track = settings.musicTracks[partyTrackIndex];
    return `🔊 ${track.title} 🪩`;
  }

  function readPartyMusicState() {
    try {
      return JSON.parse(localStorage.getItem(PARTY_MUSIC_STATE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function savePartyMusicState(isPlaying = false) {
    if (!partyAudio) return;
    try {
      localStorage.setItem(PARTY_MUSIC_STATE_KEY, JSON.stringify({
        trackIndex: partyTrackIndex,
        currentTime: partyAudio.currentTime || 0,
        isPlaying,
        savedAt: Date.now()
      }));
    } catch {
      // Music still works if storage is unavailable.
    }
  }

  function restorePartyMusicState() {
    const saved = readPartyMusicState();
    const savedTrackIndex = Number(saved.trackIndex);
    if (Number.isInteger(savedTrackIndex) && settings.musicTracks[savedTrackIndex]) {
      partyTrackIndex = savedTrackIndex;
    }
    return saved;
  }

  function switchMainButtonForAdminAbuse(layer) {
    const mainButton = document.getElementById('hi');
    if (!mainButton) return;

    mainButton.dataset.adminAbuseOriginalText = mainButton.textContent;
    mainButton.textContent = settings.adminAbuseReloadButtonText;
    mainButton.title = settings.adminAbuseReloadButtonText;
    mainButton.setAttribute('aria-label', settings.adminAbuseReloadButtonText);

    const reloadForAnnouncement = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      try {
        localStorage.removeItem('admin-abuse-last-announcement');
      } catch {
        // Reloading still works if storage is unavailable.
      }
      window.location.reload();
    };

    mainButton.addEventListener('click', reloadForAnnouncement, true);
    mainButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') reloadForAnnouncement(event);
    }, true);

    const pointer = document.createElement('div');
    pointer.className = 'admin-reload-pointer';
    pointer.setAttribute('aria-hidden', 'true');
    pointer.innerHTML = '<span>spam reload button</span> <span class="admin-pointer-arrow">↓</span>';
    layer.appendChild(pointer);

    const positionPointer = () => {
      const buttonBox = mainButton.getBoundingClientRect();
      const pointerBox = pointer.getBoundingClientRect();
      const x = buttonBox.left + buttonBox.width / 2;
      const y = Math.max(12, buttonBox.top - pointerBox.height - 18);

      pointer.style.left = `${Math.min(window.innerWidth - 12, Math.max(12, x))}px`;
      pointer.style.top = `${y}px`;
    };

    requestAnimationFrame(positionPointer);
    window.addEventListener('resize', positionPointer);
    window.addEventListener('scroll', positionPointer, { passive: true });

    if (settings.adminAbuseHomeGif) {
      const tennaDance = document.createElement('img');
      tennaDance.className = 'admin-tenna-dance';
      tennaDance.src = settings.adminAbuseHomeGif;
      tennaDance.alt = 'Dancing TV character';
      layer.appendChild(tennaDance);
    }
  }

  async function startPartyMusic(label) {
    if (!settings.musicTracks.length) return false;
    if (partyAudio && !partyAudio.paused) return true;

    try {
      await partyAudio.play();
      label.dataset.musicState = 'playing';
      label.textContent = getPartyTrackLabel();
      savePartyMusicState(true);
      return true;
    } catch {
      label.dataset.musicState = 'waiting';
      label.textContent = '🔊 TAP FOR MUSIC 🪩';
      return false;
    }
  }

  async function skipPartyMusic(label) {
    if (!settings.musicTracks.length || !partyAudio) return;

    partyTrackIndex = (partyTrackIndex + 1) % settings.musicTracks.length;
    partyAudio.src = settings.musicTracks[partyTrackIndex].file;
    partyAudio.currentTime = 0;
    savePartyMusicState(true);
    await startPartyMusic(label);
  }

  function startParty(layer) {
    if (!settings.adminAbuse) return;
    switchMainButtonForAdminAbuse(layer);
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
    label.title = 'Start music, then click again to skip songs';
    layer.appendChild(label);

    const savedMusicState = restorePartyMusicState();
    partyAudio = document.createElement('audio');
    partyAudio.id = 'admin-party-audio';
    partyAudio.preload = 'auto';
    partyAudio.volume = Math.min(1, Math.max(0, settings.musicVolume));
    partyAudio.src = settings.musicTracks[partyTrackIndex].file;
    layer.appendChild(partyAudio);

    partyAudio.addEventListener('loadedmetadata', () => {
      const savedTime = Number(savedMusicState.currentTime);
      if (Number.isFinite(savedTime) && savedTime > 0 && savedTime < partyAudio.duration) {
        partyAudio.currentTime = savedTime;
      }
    }, { once: true });

    partyAudio.addEventListener('timeupdate', () => savePartyMusicState(!partyAudio.paused));
    partyAudio.addEventListener('pause', () => savePartyMusicState(false));
    window.addEventListener('pagehide', () => savePartyMusicState(!partyAudio.paused));

    partyAudio.addEventListener('ended', async () => {
      partyTrackIndex = (partyTrackIndex + 1) % settings.musicTracks.length;
      partyAudio.src = settings.musicTracks[partyTrackIndex].file;
      savePartyMusicState(true);
      await startPartyMusic(label);
    });

    let musicButtonActivated = false;

    const unlockMusic = async (event) => {
      if (event?.target === label) return;
      if (await startPartyMusic(label)) {
        musicButtonActivated = true;
        document.removeEventListener('pointerdown', unlockMusic, true);
        document.removeEventListener('keydown', unlockMusic, true);
      }
    };

    label.addEventListener('click', async (event) => {
      event.stopPropagation();

      if (!musicButtonActivated) {
        musicButtonActivated = await startPartyMusic(label);
        return;
      }

      await skipPartyMusic(label);
    });
    document.addEventListener('pointerdown', unlockMusic, { capture: true });
    document.addEventListener('keydown', unlockMusic, { capture: true });
    if (savedMusicState.isPlaying) {
      label.textContent = getPartyTrackLabel();
    }

    startPartyMusic(label).then((started) => {
      if (started) musicButtonActivated = true;
    });
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
