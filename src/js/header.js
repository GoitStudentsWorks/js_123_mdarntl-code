(function () {
  const btn = document.querySelector('.header-btn');
  const menu = document.querySelector('.header-menu');

  if (!btn || !menu) return;

  const useEl = btn.querySelector('use');
  const spriteBase = './img/sprite.svg';
  const ICON_OPEN = '#icon-exit';
  const ICON_CLOSE = '#icon-menu-burger';

  let overlay = null;
  let originalParent = menu.parentNode;
  let originalNextSibling = menu.nextSibling;

  function setIcon(id) {
    if (!useEl) return;
    const path = spriteBase + id;
    useEl.setAttribute('href', path);
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);
  }

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'header-overlay';
    // Додаємо стилі
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: '#060307',
      zIndex: '999',
      overflow: 'auto',
      display: 'none',
    });
    document.body.appendChild(overlay);

    // Закриття при кліку на посилання в меню
    menu.addEventListener('click', e => {
      if (e.target.closest('a[href^="#"]')) {
        closeOverlay();
      }
    });
  }

  function openOverlay() {
    if (!overlay) createOverlay();

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    overlay.appendChild(menu); // Переміщуємо меню в оверлей

    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    setIcon(ICON_OPEN);
    document.addEventListener('keydown', onKeyDown);
  }

  function closeOverlay() {
    if (!overlay || overlay.style.display === 'none') return;

    overlay.style.display = 'none';
    document.body.style.overflow = '';

    // Повертаємо меню на місце в DOM
    originalParent.insertBefore(menu, originalNextSibling);

    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    setIcon(ICON_CLOSE);
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeOverlay();
  }

  // Головний обробник події
  btn.addEventListener('click', e => {
    e.preventDefault();
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeOverlay();
    } else {
      openOverlay();
    }
  });
})();
