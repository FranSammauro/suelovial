// ============ Nav: estado al hacer scroll ============
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ============ Nav: menú mobile ============
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ============ Footer: año automático ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Formulario de contacto ============
// Nota: esto es un stub sin backend. Cuando el cliente defina cómo
// quiere recibir las consultas (mailto, WhatsApp, un form service tipo
// Formspree, o un backend propio), reemplazar este handler.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const contactoVal = form.contacto.value.trim();
  const mensaje = form.mensaje.value.trim();

  const texto = `Hola, soy ${nombre} (${contactoVal}). ${mensaje}`;
  const whatsappUrl = `https://wa.me/5491137758907?text=${encodeURIComponent(texto)}`;

  formNote.textContent = 'Te abrimos WhatsApp para enviar tu consulta...';
  window.open(whatsappUrl, '_blank');
  form.reset();
});

// ============ Videos: carga diferida ============

const heroVideo = document.querySelector('[data-hero-video]');

if (heroVideo) {
  const loadHeroVideo = () => {
    if (heroVideo.dataset.loaded) return;

    heroVideo.dataset.loaded = 'true';
    heroVideo.preload = 'auto';
    heroVideo.load();

    heroVideo.play().catch(() => {});
  };

  // Esperamos a que el navegador termine el primer render.
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadHeroVideo, { timeout: 1500 });
  } else {
    window.setTimeout(loadHeroVideo, 1000);
  }
}


// ============ Videos de galería: IntersectionObserver ============

const lazyVideos = document.querySelectorAll(
  'video[data-src], video source[data-src]'
);

if (lazyVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (element.tagName === 'VIDEO') {
          const src = element.dataset.src;
          if (!src) return;

          element.src = src;
          element.load();

          element.addEventListener(
            'canplay',
            () => {
              element.play().catch(() => {});
            },
            { once: true }
          );

          delete element.dataset.src;
          observer.unobserve(element);
        } else if (element.tagName === 'SOURCE') {
          const src = element.dataset.src;
          if (!src) return;

          element.src = src;
          const video = element.parentElement;
          if (video) {
            video.load();

            video.addEventListener(
              'canplay',
              () => {
                video.play().catch(() => {});
              },
              { once: true }
            );
          }

          delete element.dataset.src;
          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: '400px 0px'
    }
  );

  lazyVideos.forEach((element) => {
    videoObserver.observe(element);
  });
}