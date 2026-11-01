// DAESystemsLabs - Interactive Engine & Visual Effects
// ========================================================

const storeLinks = {
  xtecla: "https://apps.microsoft.com/detail/9pgvhcfj07bx?hl=es-ES&gl=PY",
  kiosco: "https://apps.microsoft.com/detail/9pfjp5vvs9h1?hl=es-ES&gl=AR"
};

// 1. Toast Notification System
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}

// 2. Dynamic Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3. Scroll Progress Bar & Header Glass Effect
const scrollProgressBar = document.getElementById('scrollProgressBar');
const mainHeader = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }

  if (mainHeader) {
    if (scrollTop > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }
}, { passive: true });

// 4. Navigation Scrollspy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.pageYOffset + 120;
  sections.forEach(sec => {
    const sectionHeight = sec.offsetHeight;
    const sectionTop = sec.offsetTop;
    const sectionId = sec.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// 5. Details Accordion Toggle (Smooth Grid Transition)
document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.target);
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    button.innerHTML = isOpen ? 'Cerrar detalles <span>−</span>' : 'Detalles <span>＋</span>';
  });
});

// 6. Microsoft Store Links
document.querySelectorAll('.store-link').forEach(button => {
  button.addEventListener('click', () => {
    const url = storeLinks[button.dataset.app];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToast('El enlace de Microsoft Store estará disponible próximamente.');
    }
  });
});

// 7. Lightbox Modal para capturas
const modal = document.getElementById('screenshotModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(imgSrc, title) {
  if (!imgSrc || imgSrc.endsWith('/') || !modal) return;
  modalImg.src = imgSrc;
  modalCaption.textContent = title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Botones de zoom y clics en capturas
document.querySelectorAll('.app-visual').forEach(visual => {
  const img = visual.querySelector('.app-screenshot');
  const zoomBtn = visual.querySelector('.screenshot-zoom-btn');
  const title = visual.closest('.app-card')?.querySelector('h3')?.textContent || 'Captura de aplicación';

  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (img && img.src) {
        openModal(img.src, title);
      } else {
        showToast('Captura disponible en la carpeta de imágenes.');
      }
    });
  }

  if (img) {
    img.addEventListener('click', () => {
      if (img.classList.contains('active-view') && img.src) {
        openModal(img.src, title);
      }
    });
  }
});

// 8. Visual Mode Bar Switcher (Demo Interactiva vs Captura Real)
document.querySelectorAll('.app-card').forEach(card => {
  const tabs = card.querySelectorAll('.mode-tab');
  const visualFallback = card.querySelector('.visual-fallback');
  const appScreenshot = card.querySelector('.app-screenshot');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const view = tab.dataset.view;
      if (view === 'demo') {
        if (visualFallback) visualFallback.classList.add('active-view');
        if (appScreenshot) appScreenshot.classList.remove('active-view');
      } else if (view === 'screen') {
        if (visualFallback) visualFallback.classList.remove('active-view');
        if (appScreenshot) appScreenshot.classList.add('active-view');
      }
    });
  });
});

// 9. Simulación Interactiva de Xtecla (Macro Engine)
const xteclaMacroBox = document.getElementById('xteclaMacroBox');
const macroRunBtn = document.getElementById('macroRunBtn');
const macroKeyCtrl = document.getElementById('macroKeyCtrl');
const macroKeySpace = document.getElementById('macroKeySpace');
const macroWave = document.getElementById('macroWave');
const macroStatusRow = document.getElementById('macroStatusRow');
const macroStatusText = document.getElementById('macroStatusText');
let macroRunning = false;
let macroCount = 0;

function triggerMacroSimulation(e) {
  if (e) e.stopPropagation();
  if (macroRunning) return;
  macroRunning = true;
  macroCount++;

  // Presionar teclas con animación
  if (macroKeyCtrl) macroKeyCtrl.classList.add('key-pressed');
  if (macroKeySpace) macroKeySpace.classList.add('key-pressed');
  if (macroWave) macroWave.classList.add('wave-active');
  if (macroStatusRow) macroStatusRow.classList.add('status-running');
  if (macroStatusText) macroStatusText.textContent = "⚡ Ejecutando macro...";

  setTimeout(() => {
    if (macroKeyCtrl) macroKeyCtrl.classList.remove('key-pressed');
    if (macroKeySpace) macroKeySpace.classList.remove('key-pressed');
    if (macroWave) macroWave.classList.remove('wave-active');
    
    const elapsed = (0.03 + Math.random() * 0.05).toFixed(2);
    if (macroStatusText) {
      macroStatusText.textContent = `✓ Secuencia exitosa (${elapsed}s) · #${macroCount}`;
    }
    
    // Toast breve con confirmación
    showToast(`⚡ Xtecla: Macro ejecutada con éxito en ${elapsed}s (#${macroCount})`);

    setTimeout(() => {
      macroRunning = false;
    }, 400);
  }, 450);
}

if (xteclaMacroBox) xteclaMacroBox.addEventListener('click', triggerMacroSimulation);
if (macroRunBtn) macroRunBtn.addEventListener('click', triggerMacroSimulation);

// 10. Simulación Interactiva de KioscoApp (Caja & Ventas en Vivo)
const kioskSaleBtn = document.getElementById('kioskSaleBtn');
const kioskSalesTotal = document.getElementById('kioskSalesTotal');
const kioskSalesCount = document.getElementById('kioskSalesCount');
const kioskStockPill = document.getElementById('kioskStockPill');
let currentTotal = 145200;
let currentSales = 24;

if (kioskSaleBtn) {
  kioskSaleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const saleAmount = 2500;
    currentTotal += saleAmount;
    currentSales += 1;

    // Crear badge flotante con la venta
    const badge = document.createElement('span');
    badge.className = 'float-sale-badge';
    badge.textContent = `+$${saleAmount.toLocaleString('es-AR')} 🛒`;
    
    const cardContent = kioskSaleBtn.closest('.cover-content');
    if (cardContent) {
      cardContent.appendChild(badge);
      setTimeout(() => badge.remove(), 1000);
    }

    // Actualizar números en pantalla con animación
    if (kioskSalesTotal) {
      kioskSalesTotal.style.transform = 'scale(1.08)';
      kioskSalesTotal.style.color = '#70f58b';
      kioskSalesTotal.textContent = `$ ${currentTotal.toLocaleString('es-AR')}`;
      setTimeout(() => {
        kioskSalesTotal.style.transform = '';
        kioskSalesTotal.style.color = '';
      }, 300);
    }

    if (kioskSalesCount) {
      kioskSalesCount.textContent = currentSales;
    }

    if (kioskStockPill) {
      kioskStockPill.textContent = '📦 Stock actualizado';
      kioskStockPill.style.color = '#70f58b';
      setTimeout(() => {
        kioskStockPill.textContent = '📦 Stock OK';
        kioskStockPill.style.color = '';
      }, 1500);
    }

    showToast(`🛒 KioscoApp: Venta de $2.500 registrada. Total: $${currentTotal.toLocaleString('es-AR')}`);
  });
}

// 11. Simulación Interactiva de AlacartaApp (Plato 3D & Notificación)
const alacartaVisual = document.getElementById('alacartaVisual');
const alacartaPlate = document.getElementById('alacartaPlate');
const notifyAlacartaBtn = document.getElementById('notifyAlacartaBtn');

if (alacartaVisual && alacartaPlate) {
  alacartaVisual.addEventListener('mousemove', (e) => {
    const rect = alacartaVisual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / 8).toFixed(1);
    const rotY = (x / 8).toFixed(1);
    alacartaPlate.style.transform = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
  });

  alacartaVisual.addEventListener('mouseleave', () => {
    alacartaPlate.style.transform = '';
  });
}

if (notifyAlacartaBtn) {
  notifyAlacartaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifyAlacartaBtn.textContent = '✓ ¡Registrado!';
    notifyAlacartaBtn.style.background = '#00e638';
    notifyAlacartaBtn.style.color = '#071108';
    showToast('✨ ¡Gracias por tu interés! Te avisaremos cuando AlacartaApp esté disponible.');
  });
}

// 12. Hero Workspace Interactivo
const heroAppWindow = document.getElementById('heroAppWindow');
const heroArt = document.querySelector('.hero-art');
const heroCardAuto = document.getElementById('heroCardAuto');
const heroCardGest = document.getElementById('heroCardGest');
const heroAutoLabel = document.getElementById('heroAutoLabel');
const heroAutoCheck = document.getElementById('heroAutoCheck');
const heroGestLabel = document.getElementById('heroGestLabel');
const heroGestCheck = document.getElementById('heroGestCheck');

let autoActive = true;
if (heroCardAuto) {
  heroCardAuto.addEventListener('click', () => {
    autoActive = !autoActive;
    if (autoActive) {
      heroCardAuto.classList.add('card-active');
      heroAutoLabel.textContent = "12 macros activas · En ejecución";
      heroAutoCheck.textContent = "✓";
      heroAutoCheck.style.color = "#70f58b";
      showToast('Automatización DAE: Macros activas y sincronizadas');
    } else {
      heroCardAuto.classList.remove('card-active');
      heroAutoLabel.textContent = "Pausado · Clic para reactivar";
      heroAutoCheck.textContent = "⏸";
      heroAutoCheck.style.color = "#ffd8c9";
      showToast('Automatización DAE: Sistema en pausa temporal');
    }
  });
}

let gestActive = true;
if (heroCardGest) {
  heroCardGest.addEventListener('click', () => {
    gestActive = !gestActive;
    heroCardGest.classList.toggle('card-active');
    heroGestCheck.style.transform = 'scale(1.4)';
    setTimeout(() => heroGestCheck.style.transform = '', 200);
    showToast('Gestión DAE: Base de datos y stock 100% sincronizados');
  });
}

// Hero 3D Tilt Effect
if (heroArt && heroAppWindow) {
  heroArt.addEventListener('mousemove', (e) => {
    const rect = heroArt.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 10).toFixed(2);
    const rotateY = (x / 10).toFixed(2);
    heroAppWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-14px) rotate(-3deg)`;
  });

  heroArt.addEventListener('mouseleave', () => {
    heroAppWindow.style.transform = '';
  });
}

// 13. Card Spotlight Border & 3D Tilt Glare
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (-(y - centerY) / 30).toFixed(2);
    const tiltY = ((x - centerX) / 30).toFixed(2);
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
  });
});

// 14. Button Click Wave Effect (Ripple)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn, .mode-tab, .kiosk-sale-btn, .macro-run-pill, .btn-notify-alacarta');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add('btn-ripple');

  const prevRipple = btn.querySelector('.btn-ripple');
  if (prevRipple) prevRipple.remove();

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
});

// 15. Canvas de Partículas en el Hero (Cosmic Mesh)
const canvas = document.getElementById('heroParticles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;
  let mouseX = -9999, mouseY = -9999;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 230, 56, ' : 'rgba(139, 92, 246, ';
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Repulsión suave con el cursor
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        this.x -= (dx / dist) * 1.5;
        this.y -= (dy / dist) * 1.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const heroSection = document.getElementById('inicio');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    heroSection.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });
  }

  let animationFrameId;
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Conectar partículas cercanas con líneas finas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = `rgba(0, 230, 56, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// 16. Cursor Aura ambiental sutil para pantallas con mouse
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  let cx = -999, cy = -999;
  let targetX = -999, targetY = -999;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  function updateCursor() {
    cx += (targetX - cx) * 0.12;
    cy += (targetY - cy) * 0.12;
    cursorGlow.style.left = `${cx}px`;
    cursorGlow.style.top = `${cy}px`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();
}

// 17. Scroll Reveal Animation con IntersectionObserver
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
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

// 18. Contador animado de estadísticas en "Sobre nosotros"
const statCounters = document.querySelectorAll('.stat-counter');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      statCounters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const prefix = counter.dataset.prefix || '';
        const suffix = counter.dataset.suffix || '';
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing: easeOutCubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(ease * target);

          if (target < 10 && prefix) {
            counter.textContent = `${prefix}${currentVal}${suffix}`;
          } else {
            counter.textContent = `${currentVal}${suffix}`;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = `${prefix ? prefix : ''}${target}${suffix}`;
          }
        }
        requestAnimationFrame(updateCount);
      });
    }
  });
}, { threshold: 0.25 });

const aboutSection = document.getElementById('nosotros');
if (aboutSection) counterObserver.observe(aboutSection);

// 19. Typewriter Effect
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

  let typeSpeed = isDeleting ? 40 : 85;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2400; // Pausa al final de la palabra
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 450; // Pausa antes de escribir la siguiente
  }

  setTimeout(typeEffect, typeSpeed);
}
setTimeout(typeEffect, 1200);

// 20. Menú Móvil
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

// 21. Infinite Code Typing Stream in Terminal Widget
const terminalStream = document.getElementById('terminalCodeStream');
const codeSnippets = [
  "> loading Xtecla.engine...",
  "> registering global hotkeys [Ctrl+Shift+A]...",
  "> KioscoApp POS: sync SQLite local DB [OK]",
  "> evaluating Lua script event hooks...",
  "> macro sequence recorded (14 steps, 85ms)",
  "> Microsoft Store license verification: PRO active",
  "> optimizing memory allocation [GPU/CPU fallback]",
  "> DAE telemetry: zero bloatware verified ✓",
  "> listening for user input events..."
];

if (terminalStream) {
  let snippetIdx = 0;
  function streamCode() {
    const codeEl = document.createElement('code');
    codeEl.textContent = codeSnippets[snippetIdx];
    terminalStream.appendChild(codeEl);

    // Keep max 4 lines visible
    if (terminalStream.children.length > 4) {
      terminalStream.removeChild(terminalStream.firstChild);
    }

    snippetIdx = (snippetIdx + 1) % codeSnippets.length;
    setTimeout(streamCode, 1800);
  }
  setTimeout(streamCode, 1000);
}
