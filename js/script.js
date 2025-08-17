// UbiVet Website JavaScript
// Mobile Navigation & General functionality

// Mobile Navigation Toggle - Actualizado para componentes
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que los componentes se carguen
    setTimeout(initializeMobileMenu, 1000);
    initializeSmoothScrolling();
    initializeContactForm();
});

// También reinicializar cuando se cargan componentes
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.componentPath.includes('navigation')) {
        setTimeout(initializeMobileMenu, 100);
    }
});

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');
    let isMenuOpen = false;

    function openMenu() {
        if (sidebar) {
            // Remover la clase que oculta el sidebar
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
            
            // Mostrar overlay si existe
            if (overlay) {
                overlay.classList.remove('hidden');
                overlay.classList.add('opacity-100');
            }
            
            // Prevenir scroll en body
            document.body.style.overflow = 'hidden';
            isMenuOpen = true;
            
            console.log('Menu opened'); // Debug
        }
    }

    function closeMenu() {
        if (sidebar) {
            // Ocultar el sidebar
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
            
            // Ocultar overlay si existe
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('opacity-100');
            }
            
            // Restaurar scroll en body
            document.body.style.overflow = '';
            isMenuOpen = false;
            
            console.log('Menu closed'); // Debug
        }
    }

    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked, isOpen:', isMenuOpen); // Debug
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu close clicked'); // Debug
            closeMenu();
        });
    }

    // Cerrar menú al hacer click en overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer click en links de navegación
    const navLinks = sidebar ? sidebar.querySelectorAll('a[href^="#"]') : [];
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu'); // Debug
            closeMenu();
        });
    });

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    console.log('Mobile menu initialized:', {
        menuToggle: !!menuToggle,
        menuClose: !!menuClose,
        sidebar: !!sidebar,
        overlay: !!overlay
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    // Usar event delegation para manejar links dinámicos
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Contact Form Handler
function initializeContactForm() {
    // Usar event delegation para formulario dinámico
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form')) {
            handleContactForm(e);
        }
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Mostrar mensaje de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler para cerrar menú en desktop
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth >= 768) {
        const sidebar = document.getElementById('sidebar-menu');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
            document.body.style.overflow = '';
        }
    }
}, 250));

// Sistema de descripción dinámica para móviles
function initializeDynamicDescription() {
    const descriptions = {
        // Tutores section
        'tutorItem1': {
            title: 'Pantalla Principal',
            description: 'Vista general de la app UbiVet con acceso a todas las funciones.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h8m-8 4h4"></path>`
        },
        'tutorItem2': {
            title: 'Perfil Personalizado',
            description: 'Mantén actualizado el historial médico de tu mascota.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>`
        },
        'tutorItem3': {
            title: 'Agenda Citas',
            description: 'Encuentra veterinarios a domicilio y programa citas con facilidad.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`
        },
        'tutorItem4': {
            title: 'Encuentra Clínicas',
            description: 'Localiza clínicas veterinarias cercanas con horarios y servicios.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>`
        },
        'tutorItem5': {
            title: 'Membresía Premium',
            description: 'Accede a descuentos exclusivos y ayuda a fundaciones locales.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>`
        },
        'tutorItem6': {
            title: 'SOS Emergencias',
            description: 'Encuentra clínicas abiertas para emergencias 24/7.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.498 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"></path>`
        }
    };

    function updateDescription(destination, section = 'tutores') {
        const descArea = document.getElementById(`${section}-description`);
        const descIcon = document.getElementById(`${section}-desc-icon`);
        const descTitle = document.getElementById(`${section}-desc-title`);
        const descText = document.getElementById(`${section}-desc-text`);
        
        if (descArea && descriptions[destination]) {
            const info = descriptions[destination];
            
            // Actualizar contenido
            if (descTitle) descTitle.textContent = info.title;
            if (descText) descText.textContent = info.description;
            
            // Actualizar icono
            if (descIcon) {
                const svg = descIcon.querySelector('svg');
                if (svg) {
                    svg.innerHTML = info.icon;
                }
            }
            
            // Efecto de actualización
            descArea.style.transform = 'scale(0.98)';
            setTimeout(() => {
                descArea.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Event delegation para manejar clicks en botones del carrusel
    document.addEventListener('click', function(e) {
        if (e.target.matches('.phone-nav-button') || e.target.closest('.phone-nav-button')) {
            const button = e.target.matches('.phone-nav-button') ? e.target : e.target.closest('.phone-nav-button');
            const destination = button.getAttribute('data-destination');
            
            if (destination) {
                // Determinar sección basada en el destination
                let section = 'tutores';
                if (destination.includes('vet')) section = 'veterinarios';
                if (destination.includes('clinic')) section = 'clinicas';
                
                // Remover clase active de otros botones en la misma sección
                const sectionButtons = button.closest('.responsive-button-grid').querySelectorAll('.phone-nav-button');
                sectionButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                button.classList.add('active');
                
                updateDescription(destination, section);
            }
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar después de que los componentes se carguen
    setTimeout(initializeDynamicDescription, 1500);
});

// También inicializar cuando se cargan componentes
document.addEventListener('componentLoaded', function(event) {
    setTimeout(initializeDynamicDescription, 100);
});

console.log('UbiVet JavaScript loaded successfully');