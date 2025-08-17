// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.mobile-overlay');
    let isMenuOpen = false;

    function openMenu() {
        navMenu.classList.remove('hidden');
        // Forzar reflow para que la transición funcione
        void navMenu.offsetWidth;
        navMenu.classList.remove('-translate-x-full');
        navMenu.classList.add('translate-x-0');
        overlay.classList.remove('hidden');
        overlay.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
        // Hamburger animación
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        isMenuOpen = true;
    }

    function closeMenu() {
        navMenu.classList.remove('translate-x-0');
        navMenu.classList.add('-translate-x-full');
        setTimeout(() => {
            navMenu.classList.add('hidden');
        }, 300);
        overlay.classList.add('hidden');
        overlay.classList.remove('opacity-100');
        document.body.style.overflow = '';
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        isMenuOpen = false;
    }

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer click en un enlace
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    closeMenu();
                }
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Form Submission Handler (solo si existe)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Simulate form submission
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        this.reset();
    });
}

// CTA Button Handler (solo si existe)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Scroll to booking form
        document.querySelector('#form-step-1').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

// Enhanced Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-2xl', 'bg-white');
        navbar.classList.remove('bg-white/95');
    } else {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('shadow-2xl', 'bg-white');
    }
});

// Simplified scroll animations - removed problematic fade-in-up
// Only animate specific service cards, not everything
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Only run animation once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Only animate specific service cards, not hero or titles
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('#servicios .group');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
});

// Variables globales del carrusel - Inicializadas inmediatamente
var currentCarouselSlide = 0;
var carouselSlides = null;
var carouselIndicators = null;
var carouselAutoPlay = null;
var carouselInitialized = false;

// Función para obtener elementos del carrusel de forma segura
function getCarouselElements() {
    if (!carouselSlides || !carouselIndicators) {
        carouselSlides = document.querySelectorAll('#installations-carousel .carousel-slide');
        carouselIndicators = document.querySelectorAll('#installations-carousel .installations-indicator');
        console.log(`📊 Elementos obtenidos: ${carouselSlides.length} slides, ${carouselIndicators.length} indicadores`);
    }
    return {
        slides: carouselSlides,
        indicators: carouselIndicators
    };
}

// Funciones globales del carrusel (llamadas desde onclick)
function carouselNext() {
    console.log('🔄 carouselNext() llamada');
    const elements = getCarouselElements();
    if (elements.slides.length === 0) {
        console.error('❌ No hay slides disponibles');
        return;
    }
    currentCarouselSlide = (currentCarouselSlide + 1) % elements.slides.length;
    updateCarouselDisplay();
}

function carouselPrev() {
    console.log('🔄 carouselPrev() llamada');
    const elements = getCarouselElements();
    if (elements.slides.length === 0) {
        console.error('❌ No hay slides disponibles');
        return;
    }
    currentCarouselSlide = (currentCarouselSlide - 1 + elements.slides.length) % elements.slides.length;
    updateCarouselDisplay();
}

function carouselGoTo(slideIndex) {
    console.log(`🔄 carouselGoTo(${slideIndex}) llamada`);
    const elements = getCarouselElements();
    if (elements.slides.length === 0) {
        console.error('❌ No hay slides disponibles');
        return;
    }
    if (slideIndex >= 0 && slideIndex < elements.slides.length) {
        currentCarouselSlide = slideIndex;
        updateCarouselDisplay();
    }
}

// Función para inicializar datos del carrusel
function initCarouselData() {
    const elements = getCarouselElements();
    carouselInitialized = true;
    console.log(`📊 Carrusel inicializado: ${elements.slides.length} slides, ${elements.indicators.length} indicadores`);
}

// Función para actualizar la visualización
function updateCarouselDisplay() {
    console.log(`🖼️ Actualizando display - slide: ${currentCarouselSlide}`);
    
    const elements = getCarouselElements();
    
    // Actualizar slides
    elements.slides.forEach((slide, index) => {
        const translateValue = (index - currentCarouselSlide) * 100;
        slide.style.transform = `translateX(${translateValue}%)`;
        slide.style.transition = 'transform 0.5s ease-in-out';
    });
    
    // Actualizar indicadores
    elements.indicators.forEach((indicator, index) => {
        if (index === currentCarouselSlide) {
            indicator.style.backgroundColor = '#ff9500';
            indicator.style.transform = 'scale(1.3)';
        } else {
            indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            indicator.style.transform = 'scale(1)';
        }
        indicator.style.transition = 'all 0.3s ease';
    });
    
    // Reiniciar auto-play
    restartCarouselAutoPlay();
}

// Función para auto-play
function startCarouselAutoPlay() {
    if (carouselAutoPlay) {
        clearInterval(carouselAutoPlay);
    }
    carouselAutoPlay = setInterval(() => {
        carouselNext();
    }, 4000);
    console.log('▶️ Auto-play iniciado');
}

function restartCarouselAutoPlay() {
    startCarouselAutoPlay();
}

function stopCarouselAutoPlay() {
    if (carouselAutoPlay) {
        clearInterval(carouselAutoPlay);
        carouselAutoPlay = null;
        console.log('⏸️ Auto-play detenido');
    }
}

// Inicialización del carrusel
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🚀 Inicializando carrusel de instalaciones...');
        initCarouselData();
        
        const elements = getCarouselElements();
        if (elements.slides.length > 0) {
            updateCarouselDisplay();
            startCarouselAutoPlay();
            
            // Pausar auto-play al hacer hover
            const carouselContainer = document.getElementById('installations-carousel');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', stopCarouselAutoPlay);
                carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
            }
            
            console.log('✅ Carrusel completamente inicializado');
        } else {
            console.error('❌ No se encontraron slides del carrusel');
        }
    }, 200);
});