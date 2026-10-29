const storeLinks = {
  xtecla: "https://apps.microsoft.com/detail/9pgvhcfj07bx?hl=es-ES&gl=PY",
  kiosco: "https://apps.microsoft.com/detail/9pfjp5vvs9h1?hl=es-ES&gl=AR"
};

const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

document.getElementById('year').textContent = new Date().getFullYear();

// Detalles toggle
document.querySelectorAll('.details-btn').forEach(button => button.addEventListener('click', () => {
  const panel = document.getElementById(button.dataset.target);
  const open = panel.classList.toggle('open');
  button.innerHTML = open ? 'Cerrar detalles <span>−</span>' : 'Detalles <span>＋</span>';
}));

// Store links handler
document.querySelectorAll('.store-link').forEach(button => button.addEventListener('click', () => {
  const url = storeLinks[button.dataset.app];
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    showToast('El enlace de Microsoft Store se agregará cuando lo tengamos.');
  }
}));

// Lightbox modal para capturas
const modal = document.getElementById('screenshotModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(imgSrc, title) {
  if (!imgSrc || imgSrc.endsWith('/')) return;
  modalImg.src = imgSrc;
  modalCaption.textContent = title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

document.querySelectorAll('.app-visual').forEach(visual => {
  const img = visual.querySelector('.app-screenshot');
  const zoomBtn = visual.querySelector('.screenshot-zoom-btn');
  const title = visual.closest('.app-card')?.querySelector('h3')?.textContent || 'Captura de aplicación';

  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (img && img.src && img.style.display !== 'none') {
        openModal(img.src, title);
      } else {
        showToast('Aún no se ha cargado la captura real. Colocá la imagen en la carpeta images/.');
      }
    });
  }

  if (img) {
    img.addEventListener('click', () => {
      if (img.style.display !== 'none' && img.src) {
        openModal(img.src, title);
      }
    });
  }
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Contact email handler
document.querySelector('a[href^="mailto:"]').addEventListener('click', event => {
  // Correo oficial configurado: daesystemslabs@gmail.com
});
