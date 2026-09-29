const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const year = document.getElementById('year');

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, {passive:true});

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  navToggle.querySelectorAll('span')[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
  navToggle.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
  navToggle.querySelectorAll('span')[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
});

document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded','false');
    navToggle.querySelectorAll('span')[0].style.transform = '';
    navToggle.querySelectorAll('span')[1].style.opacity = '1';
    navToggle.querySelectorAll('span')[2].style.transform = '';
  });
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

year.textContent = new Date().getFullYear();

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const message = [
    'Hola Constructora Anedu, deseo solicitar información/cotización.',
    `Nombre: ${data.get('nombre') || ''}`,
    `Empresa: ${data.get('empresa') || 'No indicada'}`,
    `Servicio: ${data.get('servicio') || ''}`,
    `Mensaje: ${data.get('mensaje') || 'No indicado'}`
  ].join('\n');
  window.open(`https://wa.me/51994880367?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if(!id || id === '#') return;
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
