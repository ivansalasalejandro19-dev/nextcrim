/* ==========================================
   Next Crim® - Main Script
   ========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* === NAVBAR TOGGLE === */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* === NAVBAR SCROLL EFFECT === */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* === SCROLL REVEAL ANIMATIONS === */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* === COUNTER ANIMATION === */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const max = parseInt(target.getAttribute('data-count'), 10);
        let current = 0;
        const increment = Math.ceil(max / 40);
        const duration = 1500;
        const stepTime = Math.floor(duration / 40);

        const updateCounter = () => {
          current += increment;
          if (current >= max) {
            target.textContent = max;
            return;
          }
          target.textContent = current;
          setTimeout(updateCounter, stepTime);
        };

        updateCounter();
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* === PORTFOLIO MODAL DEMOS === */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-demo]');

  const demos = {
    demo1: {
      title: 'Tienda de Electrodomésticos',
      desc: 'Sitio e-commerce completo con catálogo, carrito de compras y promociones.',
      features: [
        { icon: 'fa-store', title: 'Catálogo', desc: 'Productos organizados por categorías' },
        { icon: 'fa-shopping-cart', title: 'Carrito', desc: 'Carrito de compras funcional' },
        { icon: 'fa-tags', title: 'Promociones', desc: 'Ofertas y descuentos destacados' },
        { icon: 'fa-search', title: 'Buscador', desc: 'Filtros y búsqueda avanzada' },
        { icon: 'fa-credit-card', title: 'Pagos', desc: 'Pasarela de pago integrada' },
        { icon: 'fa-mobile-alt', title: 'Responsive', desc: 'Experiencia en cualquier dispositivo' }
      ]
    },
    demo2: {
      title: 'Servicio Técnico de Celulares',
      desc: 'Plataforma profesional para servicio técnico con agenda de citas y gestión de servicios.',
      features: [
        { icon: 'fa-mobile-alt', title: 'Diagnóstico', desc: 'Evaluación de dispositivos' },
        { icon: 'fa-calendar-check', title: 'Agenda', desc: 'Programación de citas online' },
        { icon: 'fa-tools', title: 'Servicios', desc: 'Catálogo de reparaciones' },
        { icon: 'fa-phone', title: 'Contacto', desc: 'Información y ubicación' },
        { icon: 'fa-clock', title: 'Seguimiento', desc: 'Estado de reparaciones' },
        { icon: 'fa-shield-alt', title: 'Garantía', desc: 'Garantía en servicios' }
      ]
    },
    demo3: {
      title: 'Restaurante / Cafetería',
      desc: 'Sitio web elegante para restaurantes con menú digital y sistema de reservaciones.',
      features: [
        { icon: 'fa-utensils', title: 'Menú', desc: 'Menú digital interactivo' },
        { icon: 'fa-calendar-alt', title: 'Reservas', desc: 'Sistema de reservaciones' },
        { icon: 'fa-tag', title: 'Promociones', desc: 'Ofertas especiales' },
        { icon: 'fa-images', title: 'Galería', desc: 'Galería de platillos' },
        { icon: 'fa-map-marker-alt', title: 'Ubicación', desc: 'Mapa y direcciones' },
        { icon: 'fa-star', title: 'Reseñas', desc: 'Valoraciones de clientes' }
      ]
    },
    demo4: {
      title: 'Inmobiliaria',
      desc: 'Portal inmobiliario con catálogo de propiedades y filtros inteligentes.',
      features: [
        { icon: 'fa-building', title: 'Propiedades', desc: 'Catálogo completo' },
        { icon: 'fa-sliders-h', title: 'Filtros', desc: 'Búsqueda avanzada' },
        { icon: 'fa-image', title: 'Galería', desc: 'Fotos y recorridos virtuales' },
        { icon: 'fa-map-marked-alt', title: 'Mapa', desc: 'Ubicación geográfica' },
        { icon: 'fa-heart', title: 'Favoritos', desc: 'Guardar propiedades' },
        { icon: 'fa-envelope', title: 'Contacto', desc: 'Formulario de contacto' }
      ]
    },
    demo5: {
      title: 'Gimnasio / Centro Fitness',
      desc: 'Sistema completo con membresías, registro de socios y control de acceso.',
      features: [
        { icon: 'fa-dumbbell', title: 'Membresías', desc: 'Planes mensuales y anuales' },
        { icon: 'fa-users', title: 'Socios', desc: 'Registro y perfiles de socios' },
        { icon: 'fa-calendar-check', title: 'Clases', desc: 'Agenda y reserva de clases' },
        { icon: 'fa-chart-line', title: 'Progreso', desc: 'Seguimiento de entrenamiento' },
        { icon: 'fa-credit-card', title: 'Pagos', desc: 'Cobro automático de cuotas' },
        { icon: 'fa-clock', title: 'Acceso', desc: 'Control horario de ingreso' }
      ]
    },
    demo6: {
      title: 'Clínica / Consultorio Médico',
      desc: 'Plataforma para gestión de turnos, historias clínicas y perfiles médicos.',
      features: [
        { icon: 'fa-stethoscope', title: 'Turnos', desc: 'Reserva online de consultas' },
        { icon: 'fa-user-md', title: 'Doctores', desc: 'Perfiles profesionales' },
        { icon: 'fa-file-medical', title: 'Historias', desc: 'Historia clínica digital' },
        { icon: 'fa-syringe', title: 'Servicios', desc: 'Catálogo de prestaciones' },
        { icon: 'fa-clock', title: 'Horarios', desc: 'Gestión de disponibilidad' },
        { icon: 'fa-bell', title: 'Recordatorios', desc: 'Notificaciones de turnos' }
      ]
    }
  };

  const openModal = (demoId) => {
    const demo = demos[demoId];
    if (!demo) return;

    const featuresHtml = demo.features.map(f => `
      <div class="modal-demo-card">
        <i class="fas ${f.icon}"></i>
        <h4>${f.title}</h4>
        <p>${f.desc}</p>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <div class="modal-demo">
        <div class="modal-demo-header">
          <h2>${demo.title}</h2>
          <p>${demo.desc}</p>
        </div>
        <div class="modal-demo-grid">
          ${featuresHtml}
        </div>
        <div style="text-align:center; display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
          <a href="https://wa.me/541136773248?text=Hola%20Next%20Crim!%20Quiero%20un%20proyecto%20similar%20a%20${encodeURIComponent(demo.title)}" target="_blank" class="modal-demo-cta" style="text-decoration:none; background:linear-gradient(135deg,#25D366,#128C7E)">
            <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
          </a>
          <button class="modal-demo-cta" onclick="document.getElementById('modalClose').click()" style="background:linear-gradient(135deg,#7c3aed,#6d28d9)">
            <i class="fas fa-paper-plane"></i> Solicitar proyecto similar
          </button>
        </div>
        <div class="modal-demo-footer">
          * Demo visual representativo. El diseño final se adapta a las necesidades de tu negocio.
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const ctaBtn = modalBody.querySelector('.modal-demo-cta');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const modalTriggers = document.querySelectorAll('.modal-trigger');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const demoId = btn.getAttribute('data-demo');
      openModal(demoId);
    });
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* === SMOOTH ANCHOR SCROLLING (fallback) === */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});