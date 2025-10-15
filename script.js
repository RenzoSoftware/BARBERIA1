// Smooth scrolling for navigation links (exclude reservas modal link)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// WhatsApp button functionality and Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Navbar móvil (toggle hamburguesa)
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navBackdrop = document.getElementById('navBackdrop');
  const navModal = document.getElementById('navModal');
  const openReservasMobile = document.getElementById('openReservasMobile');
  const openTestimoniosMobile = document.getElementById('openTestimoniosMobile');

  function closeNav() {
    if (nav) nav.classList.remove('nav--open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('show');
    const anyModalOpen = document.querySelector('.modal.show');
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
  }

  function openNav() {
    if (nav) nav.classList.add('nav--open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // En móvil, el botón abre/cierra el modal del menú
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const isModalOpen = navModal && navModal.classList.contains('show');
      if (isModalOpen) {
        closeModal(navModal);
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        openModal(navModal);
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  // Cerrar menú modal al seleccionar un enlace
  if (navModal) {
    navModal.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function() {
        closeModal(navModal);
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeNav();
      if (navModal && navModal.classList.contains('show')) {
        closeModal(navModal);
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Modal functionality
  const modal = document.getElementById('reservasModal');
  const openReservasBtn = document.getElementById('openReservas');
  // Vincular el botón de cierre específicamente al modal de reservas
  const closeModalBtn = modal ? modal.querySelector('.modal__close') : null;

  // Testimonios modal
  const testimoniosModal = document.getElementById('testimoniosModal');
  const openTestimoniosNav = document.getElementById('openTestimonios');
  const openTestimoniosSection = document.getElementById('openTestimoniosSection');
  
  // Open modal
  if (openReservasBtn) {
    openReservasBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  if (openReservasMobile) {
    openReservasMobile.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal(navModal);
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
      openModal();
    });
  }
  if (openTestimoniosNav) {
    openTestimoniosNav.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(testimoniosModal);
    });
  }
  if (openTestimoniosMobile) {
    openTestimoniosMobile.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal(navModal);
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
      openModal(testimoniosModal);
    });
  }
  if (openTestimoniosSection) {
    openTestimoniosSection.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(testimoniosModal);
    });
  }
  
  // Close modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
    // Accesible: cerrar con Enter/Espacio cuando tiene foco
    closeModalBtn.setAttribute('role', 'button');
    closeModalBtn.setAttribute('tabindex', '0');
    closeModalBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
      }
    });
  }

  // Delegación de eventos: cerrar cualquier modal al pulsar su .modal__close
  document.addEventListener('click', function(e) {
    const closeEl = e.target.closest('.modal__close');
    if (closeEl) {
      const modalEl = closeEl.closest('.modal');
      if (modalEl) {
        closeModal(modalEl);
      }
    }
  });
  // Cerrar modal de testimonios
  const closeTestimoniosBtn = testimoniosModal ? testimoniosModal.querySelector('.modal__close') : null;
  if (closeTestimoniosBtn) {
    closeTestimoniosBtn.addEventListener('click', function() { closeModal(testimoniosModal); });
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) { closeModal(); }
    });
  }
  if (testimoniosModal) {
    testimoniosModal.addEventListener('click', function(e) {
      if (e.target === testimoniosModal) { closeModal(testimoniosModal); }
    });
  }
  if (navModal) {
    navModal.addEventListener('click', function(e) {
      if (e.target === navModal) {
        closeModal(navModal);
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('show')) closeModal();
      if (testimoniosModal && testimoniosModal.classList.contains('show')) closeModal(testimoniosModal);
      if (navModal && navModal.classList.contains('show')) {
        closeModal(navModal);
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  function openModal(targetModal) {
    const m = targetModal || modal;
    if (m) {
      m.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeModal(targetModal) {
    const m = targetModal || modal;
    if (m) {
      m.classList.remove('show');
      // Si hay menú móvil abierto, mantener bloqueo de scroll; de lo contrario, liberar
      const isNavOpen = nav && nav.classList.contains('nav--open');
      document.body.style.overflow = isNavOpen ? 'hidden' : '';
    }
  }

  const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
  
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const phone = this.getAttribute('data-phone');
      const bookingLink = window.location.origin + window.location.pathname + '#reservas';
      const message = encodeURIComponent(
        '¡Bienvenido a Barbería Elite! Para reservar una cita rápida, usa nuestro sistema: ' + 
        bookingLink + 
        '. Si tu consulta es sobre otra cosa, responde aquí.'
      );
      const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      e.preventDefault();
    });
  });

  // Booking form functionality
  const bookingForm = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');
  const dateInput = document.getElementById('fecha');
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) dateInput.min = today;
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(bookingForm);
      const bookingData = Object.fromEntries(formData.entries());
      
      // Validate form
      if (!bookingData.nombre || !bookingData.telefono || !bookingData.servicio || !bookingData.fecha || !bookingData.hora) {
        showFormStatus('Por favor, completa todos los campos obligatorios', 'error');
        return;
      }
      
      const digits = String(bookingData.telefono).replace(/\D/g, '');
      const isValidPeruMobile =
        (digits.length === 9 && digits.startsWith('9')) ||
        (digits.length === 11 && digits.startsWith('51') && digits[2] === '9');
      if (!isValidPeruMobile) {
        showFormStatus('Por favor, ingresa un teléfono móvil válido (9 dígitos) o con código +51.', 'error');
        return;
      }
      
      try {
        // Show loading state
        showFormStatus('Procesando tu reserva...', 'loading');

        const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        let responseData;
        if (isLocal) {
          // Local: mantener simulación para desarrollo
          responseData = await simulateBooking(bookingData);
        } else {
          // Producción: enviar a backend
          const res = await fetch('/api/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
          });
          responseData = await res.json();
          if (!res.ok || !responseData.ok) {
            throw new Error(responseData.error || 'Error al enviar la reserva');
          }
        }

        // Show success message
        showFormStatus('¡Reserva confirmada! Te contactaremos pronto para confirmar.', 'success');

        // Send WhatsApp notification to business
        sendWhatsAppNotification(bookingData);

        // Reset form
        bookingForm.reset();

      } catch (error) {
        showFormStatus('Error al procesar la reserva. Por favor, intenta nuevamente.', 'error');
        console.error('Booking error:', error);
      }
    });
  }
  
  function showFormStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = 'form__status';
      if (type) {
        formStatus.classList.add(type);
      }
      
      // Auto-hide success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form__status';
        }, 5000);
      }
    }
  }
  
  function simulateBooking(data) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        console.log('Booking data:', data);
        resolve(data);
      }, 1500);
    });
  }
  
  function sendWhatsAppNotification(bookingData) {
    const businessPhone = '51923342724'; // Replace with your business WhatsApp number
    const message = encodeURIComponent(
      `📅 *Nueva Reserva*\n\n` +
      `*Cliente:* ${bookingData.nombre}\n` +
      `*Teléfono:* ${bookingData.telefono}\n` +
      `*Email:* ${bookingData.email || 'No proporcionado'}\n` +
      `*Servicio:* ${getServiceName(bookingData.servicio)}\n` +
      `*Fecha:* ${formatDate(bookingData.fecha)}\n` +
      `*Hora:* ${bookingData.hora}\n` +
      `*Notas:* ${bookingData.mensaje || 'Ninguna'}`
    );
    
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${message}`;
    
    // Open WhatsApp in new tab (optional - you might want to handle this differently)
    window.open(whatsappUrl, '_blank');
  }
  
  function getServiceName(serviceKey) {
    const services = {
      'corte-clasico': 'Corte clásico',
      'degradado-fade': 'Degradado / Fade',
      'afeitado-navaja': 'Afeitado con navaja',
      'diseno-barba': 'Diseño de barba'
    };
    return services[serviceKey] || serviceKey;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});