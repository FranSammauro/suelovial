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
  const whatsappUrl = `https://wa.me/5490000000000?text=${encodeURIComponent(texto)}`;

  formNote.textContent = 'Te abrimos WhatsApp para enviar tu consulta...';
  window.open(whatsappUrl, '_blank');
  form.reset();
});
