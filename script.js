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
  // Modal functionality
  const modal = document.getElementById('reservasModal');
  const openReservasBtn = document.getElementById('openReservas');
  const closeModalBtn = document.querySelector('.modal__close');
  
  // Open modal
  if (openReservasBtn) {
    openReservasBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  
  // Close modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  function openModal() {
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Enable scrolling
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
      
      // Validate phone number (basic validation)
      const phoneRegex = /^[0-9+\-\s()]{10,}$/;
      if (!phoneRegex.test(bookingData.telefono)) {
        showFormStatus('Por favor, ingresa un número de teléfono válido', 'error');
        return;
      }
      
      try {
        // Show loading state
        showFormStatus('Procesando tu reserva...', 'loading');
        
        // Simulate API call (replace with your actual backend endpoint)
        await simulateBooking(bookingData);
        
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