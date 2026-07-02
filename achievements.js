(function () {
  const STORAGE_KEY = 'rouAchievements';
  const TOAST_ID = 'rouAchievementToast';
  const toastQueue = [];
  let toastShowing = false;

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function ensureToast() {
    if (!document.getElementById('rouAchievementStyles')) {
      const style = document.createElement('style');
      style.id = 'rouAchievementStyles';
      style.textContent = `
        #${TOAST_ID} {
          position: fixed; top: 24px; left: 50%; z-index: 100000;
          display: flex; align-items: center; gap: 14px; min-width: 270px;
          box-sizing: border-box; padding: 14px 20px; color: white;
          font: 16px/1.25 Arial, sans-serif;
          background: linear-gradient(135deg, #28231b, #111);
          border: 2px solid #f5b700; border-radius: 14px;
          box-shadow: 0 12px 38px rgba(0,0,0,.45), 0 0 22px rgba(245,183,0,.28);
          opacity: 0; pointer-events: none; transform: translate(-50%, -140%);
          transition: opacity 220ms ease, transform 350ms cubic-bezier(.2,.9,.3,1.2);
        }
        #${TOAST_ID}.show { opacity: 1; transform: translate(-50%, 0); }
        #${TOAST_ID} .rou-trophy { font-size: 2.3rem; }
        #${TOAST_ID} span, #${TOAST_ID} strong { display: block; }
        #${TOAST_ID} span { margin-bottom: 2px; color: #f5ce55; font-size: .76rem;
          font-weight: bold; letter-spacing: .12em; text-transform: uppercase; }
      `;
      document.head.appendChild(style);
    }

    let toast = document.getElementById(TOAST_ID);
    if (!toast) {
      toast = document.createElement('div');
      toast.id = TOAST_ID;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<div class="rou-trophy">🏆</div><div><span>Achievement unlocked</span><strong></strong></div>';
      document.body.appendChild(toast);
    }
    return toast;
  }

  function show(name) {
    toastQueue.push(name);
    showNextToast();
  }

  function showNextToast() {
    if (toastShowing || !toastQueue.length) return;
    toastShowing = true;
    const name = toastQueue.shift();
    const toast = ensureToast();
    toast.querySelector('strong').textContent = name;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    window.setTimeout(() => {
      toast.classList.remove('show');
      window.setTimeout(() => {
        toastShowing = false;
        showNextToast();
      }, 300);
    }, 2200);
  }

  function unlock(id, name) {
    const achievements = getAll();
    if (achievements[id]) return false;
    achievements[id] = { unlockedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    show(name);
    return true;
  }

  window.ROUAchievements = { getAll, show, unlock };
})();
