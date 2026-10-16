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

const closeMobileMenu = () => {
  navLinks.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
};

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('is-open') &&
      !navLinks.contains(e.target) &&
      !burger.contains(e.target)) {
    closeMobileMenu();
  }
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
    closeMobileMenu();
    burger.focus();
  }
});

// ============ Footer: año automático ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Footer: mapa interactivo ============
const mapContainer = document.getElementById('footerMap');

const initMap = () => {
  if (!mapContainer || typeof L === 'undefined') return;

  const map = L.map('footerMap', {
    zoomControl: true,
    attributionControl: true,
    dragging: true,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tap: false,
    touchZoom: false
  }).setView([-34.46, -58.91], 16);

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_4lz6_2_0006c9660640496966753006',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  ).addTo(map);

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-pin"><div class="marker-dot"></div></div>',
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -42]
  });

  const marker = L.marker([-34.46, -58.91], { icon: customIcon }).addTo(map);
  marker.bindPopup(
    '<div class="custom-popup"><strong>Suelo Vial</strong><br>Cuba 665, Pilar<br>Buenos Aires, Argentina</div>'
  ).openPopup();

  map.once('load', () => {
    map.invalidateSize();
  });
};

// Ensure Leaflet is loaded before initializing (handles deferred scripts on hosting)
if (typeof L !== 'undefined') {
  initMap();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const checkLeaflet = setInterval(() => {
      if (typeof L !== 'undefined') {
        clearInterval(checkLeaflet);
        initMap();
      }
    }, 50);
  });
}

// ============ Formulario de contacto ============
// Nota: esto es un stub sin backend. Cuando el cliente defina cómo
// quiere recibir las consultas (mailto, WhatsApp, un form service tipo
// Formspree, o un backend propio), reemplazar este handler.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

const validateField = (field) => {
  const value = field.value.trim();
  const errorId = `${field.id}-error`;
  let errorEl = document.getElementById(errorId);

  if (!value) {
    field.setAttribute('aria-invalid', 'true');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.id = errorId;
      errorEl.className = 'form-error';
      errorEl.textContent = 'Este campo es obligatorio';
      field.parentNode.appendChild(errorEl);
    }
    return false;
  }

  if (field.id === 'contacto' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      field.setAttribute('aria-invalid', 'true');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'form-error';
        errorEl.textContent = 'Ingresá un email o teléfono válido';
        field.parentNode.appendChild(errorEl);
      }
      return false;
    }
  }

  field.removeAttribute('aria-invalid');
  if (errorEl) {
    errorEl.remove();
  }
  return true;
};

form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.hasAttribute('aria-invalid')) {
      validateField(field);
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = form.nombre;
  const contactoVal = form.contacto;
  const mensaje = form.mensaje;

  const isValid = [
    validateField(nombre),
    validateField(contactoVal),
    validateField(mensaje)
  ].every(Boolean);

  if (!isValid) {
    formNote.textContent = 'Por favor completá los campos marcados';
    formNote.style.color = '#E8842C';
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const asunto = encodeURIComponent(`Nueva consulta de ${nombre.value.trim()} - Suelo Vial`);
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre.value.trim()}\n` +
    `Contacto: ${contactoVal.value.trim()}\n\n` +
    `Mensaje:\n${mensaje.value.trim()}`
  );
  const mailtoUrl = `mailto:info@suelovial.com.ar?subject=${asunto}&body=${cuerpo}`;

  formNote.textContent = 'Abriendo tu cliente de correo...';
  formNote.style.color = '#E8842C';
  window.location.href = mailtoUrl;
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

  // Load immediately for smoother playback
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadHeroVideo();
  } else {
    document.addEventListener('DOMContentLoaded', loadHeroVideo, { once: true });
  }
}


// ============ Videos de galería: IntersectionObserver ============

const lazyVideos = document.querySelectorAll('video.lazy-video[data-src]');

if (lazyVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;
        const src = video.dataset.src;
        if (!src) return;

        video.src = src;
        video.load();

        video.addEventListener(
          'canplay',
          () => {
            video.play().catch(() => {});
          },
          { once: true }
        );

        delete video.dataset.src;
        observer.unobserve(video);
      });
    },
    {
      rootMargin: '400px 0px'
    }
  );

  lazyVideos.forEach((video) => {
    videoObserver.observe(video);
  });
}

// ============ Google Ads: conversiones de WhatsApp ============
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;

  let destination;

  try {
    destination = new URL(link.href);
  } catch {
    return;
  }

  if (destination.hostname !== 'wa.me') return;

  if (typeof gtag !== 'function') {
    console.warn('Google Ads no está disponible; no se pudo enviar la conversión.');
    return;
  }

  gtag('event', 'conversion', {
    send_to: 'AW-18449289755/942zCL3AvZ4dEJukp91E'
  });
});
