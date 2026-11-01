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

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
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
}

// Scroll Reveal Animation with IntersectionObserver
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.app-card, .section-heading, .about-inner, .contact-section').forEach(el => {
  el.classList.add('reveal-item');
  observer.observe(el);
});

// Typewriter / Word rotation effect
const words = ["hechas para vos.", "automatizá tus tareas.", "potenciá tu negocio."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeEffect() {
  if (!typewriterEl) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2200; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400; // Pause before next word
  }

  setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 1200);

// Hero Art Parallax / Tilt Effect on Mouse Move
const heroArt = document.querySelector('.hero-art');
const appWindow = document.querySelector('.app-window');

if (heroArt && appWindow) {
  heroArt.addEventListener('mousemove', (e) => {
    const rect = heroArt.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 15).toFixed(2);
    const rotateY = (x / 15).toFixed(2);
    appWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) rotate(-2deg)`;
  });

  heroArt.addEventListener('mouseleave', () => {
    appWindow.style.transform = '';
  });
}
