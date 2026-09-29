const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('nav.links');
toggle.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.cssText += open ? '' : 'position:absolute;top:100px;left:0;right:0;background:#fbf8f1;flex-direction:column;padding:20px 32px;gap:18px;border-bottom:1px solid rgba(32,31,26,0.12);';
});

// Navegación interna
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.getAttribute('data-target');
    const target = document.querySelector(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.getComputedStyle(links).position === 'absolute') {
      links.style.display = 'none';
    }
  });
});

// --- SCROLL REVEAL ANIMATION ---
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Staggered animation effect
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); 
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// --- PRODUCT MODALS ---


const productSpecs = {
  'Maíz Fino': {
    title: 'Maíz Fino',
    description: 'Molienda fina y homogénea para una integración perfecta en la alimentación animal.',
    benefits: [
      'Mezcla más homogénea con otros ingredientes.',
      'Alta eficiencia energética en raciones formuladas.',
      'Ideal para diversas etapas de producción.'
    ],
    applications: ['🐔 Aves', '🐣 Pollos', '🥚 Gallinas', '🐇 Conejos', '🐖 Porcinos', '🐄 Ganado'],
    idealFor: 'Fabricantes que buscan precisión y uniformidad.',
    presentation: 'A granel / sacos',
    molienda: 'Fina',
    image: 'assets/img/productos/maiz-fino.png'
  },
  'Maíz Mediano': {
    title: 'Maíz Mediano',
    description: 'El equilibrio ideal entre tamaño de partícula y versatilidad de uso.',
    benefits: [
      'Textura equilibrada para múltiples sistemas.',
      'Fácil incorporación en mezclas estándar.',
      'Versatilidad para diversas formulaciones.'
    ],
    applications: ['🐔 Aves', '🐣 Pollos', '🥚 Gallinas', '🐇 Conejos', '🐖 Porcinos', '🐄 Bovinos'],
    idealFor: 'Productores que buscan una opción versátil.',
    presentation: 'A granel / sacos',
    molienda: 'Mediana',
    image: 'assets/img/productos/maiz-mediano.png'
  },
  'Maíz Grueso': {
    title: 'Maíz Grueso',
    description: 'Molienda de mayor granulometría para requerimientos específicos.',
    benefits: [
      'Tamaño adecuado para moliendas gruesas.',
      'Adaptable a necesidades nutricionales específicas.',
      'Opción versátil para ganadería intensiva.'
    ],
    applications: ['🐔 Aves', '🐇 Conejos', '🐖 Porcinos', '🐄 Bovinos', '🐐 Caprinos'],
    idealFor: 'Formuladores que requieren mayor grano.',
    presentation: 'A granel / sacos',
    molienda: 'Gruesa',
    image: 'assets/img/productos/maiz-grueso.png'
  },
  'Alimento balanceado': {
    title: 'Alimento Balanceado',
    description: 'Nutrición formulada para maximizar el crecimiento y productividad animal.',
    benefits: [
      'Materias primas seleccionadas de alta calidad.',
      'Suministro optimizado por especie y etapa.',
      'Orientado a alta productividad avícola y pecuaria.'
    ],
    
    note: 'Composición ajustada según fórmula y etapa productiva.',
    presentation: 'Sacos / disponibilidad',
    type: 'Alimento formulado',
    image: 'assets/img/productos/alimento-balanceado.png'
  }
};

const modal = document.getElementById('product-modal');
const modalData = document.getElementById('modal-data');
const modalBg = document.querySelector('.modal-bg-image');
const modalClose = document.querySelector('.modal-close');

function openProductModal(productName) {
  const data = productSpecs[productName];
  if (!data) return;

  // Background image
  modalBg.style.backgroundImage = `url(${data.image})`;

  // Content
  let contentHtml = `
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-desc">${data.description}</p>
    
    <div class="modal-section">
      <h3 class="section-label">Beneficios</h3>
      <ul class="benefits-list">${data.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
  `;

  if (data.applications) {
    contentHtml += `
      <div class="modal-section">
        <h3 class="section-label">Aplicaciones</h3>
        <div class="modal-apps">${data.applications.join(' <span class="app-sep">•</span> ')}</div>
      </div>
      <p class="modal-ideal"><strong class="ideal-tag">Ideal para:</strong> ${data.idealFor}</p>
      <div class="modal-meta">
        <span class="meta-item"><strong class="meta-label">Presentación:</strong> ${data.presentation}</span>
        <span class="meta-item"><strong class="meta-label">Molienda:</strong> ${data.molienda}</span>
      </div>
    `;
  } else if (data.lines) {
    contentHtml += `
      <div class="modal-section">
        <h3 class="section-label">Líneas de aplicación</h3>
        <div class="modal-lines">
          ${Object.entries(data.lines).map(([line, items]) => `
            <div class="line-item">
              <strong class="line-title">${line}</strong>
              <ul class="benefits-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          `).join('')}
        </div>
      </div>
      <p class="modal-note"><strong class="note-label">Importante:</strong> ${data.note}</p>
      <div class="modal-meta">
        <span class="meta-item"><strong class="meta-label">Presentación:</strong> ${data.presentation}</span>
        <span class="meta-item"><strong class="meta-label">Tipo:</strong> ${data.type}</span>
      </div>
    `;
  }

  modalData.innerHTML = `
    <img src="${data.image}" class="modal-product-img" alt="${data.title}">
    <div class="modal-text-content">
      ${contentHtml}
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Link buttons to modal
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // The product name is in the previous <h3> sibling of the parent container
    const card = btn.closest('.product-card, .product-wide');
    const title = card.querySelector('h3').innerText.trim();
    openProductModal(title);
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

document.querySelector('.modal-overlay').addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});
