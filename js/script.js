// UbiVet Website JavaScript
// Mobile Navigation & General functionality

// Mobile Navigation Toggle - Actualizado para componentes y Safari
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que los componentes se carguen - más tiempo para Safari
    setTimeout(initializeMobileMenu, 1500);
    initializeSmoothScrolling();
    initializeContactForm();
});

// Para Safari en iOS - evento adicional
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
        setTimeout(initializeMobileMenu, 500);
    }
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
            // Forzar display para Safari
            sidebar.style.display = 'block';
            
            // Usar setTimeout para Safari
            setTimeout(() => {
                sidebar.classList.remove('-translate-x-full');
                sidebar.classList.add('translate-x-0');
                sidebar.style.transform = 'translateX(0)';
            }, 10);
            
            // Mostrar overlay si existe
            if (overlay) {
                overlay.style.display = 'block';
                overlay.classList.remove('hidden');
                overlay.classList.add('opacity-100');
            }
            
            // Prevenir scroll en body - Safari compatible
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            
            isMenuOpen = true;
            
            console.log('Menu opened'); // Debug
        }
    }

    function closeMenu() {
        if (sidebar) {
            // Ocultar el sidebar
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
            sidebar.style.transform = 'translateX(-100%)';
            
            // Ocultar después de animación
            setTimeout(() => {
                sidebar.style.display = 'none';
            }, 300);
            
            // Ocultar overlay si existe
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('opacity-100');
                overlay.style.display = 'none';
            }
            
            // Restaurar scroll en body - Safari compatible
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            isMenuOpen = false;
            
            console.log('Menu closed'); // Debug
        }
    }

    // Event listeners - Compatible con Safari
    if (menuToggle) {
        // Click y Touch para mejor compatibilidad
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked, isOpen:', isMenuOpen); // Debug
            if (!isMenuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        
        // Touch events para iOS Safari
        menuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle touched, isOpen:', isMenuOpen); // Debug
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
            e.stopPropagation();
            console.log('Menu close clicked'); // Debug
            closeMenu();
        });
        
        menuClose.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu close touched'); // Debug
            closeMenu();
        });
    }

    // Cerrar menú al hacer click en overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
        overlay.addEventListener('touchend', closeMenu);
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
            title: 'Localiza y explora clínicas',
            description: 'Cerca de tu hogar, con detalles completos de horarios y servicios.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h8m-8 4h4"></path>`
        },
        'tutorItem2': {
            title: 'Encuentra fácilmente tiendas',
            description: 'Para mascotas, servicios de peluquería y mucho más, todo en un solo lugar.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>`
        },
        'tutorItem3': {
            title: 'Crea perfiles para tus mascotas',
            description: 'Donde podrás almacenar información vital como historiales médicos, vacunas, y más.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`
        },
        'tutorItem4': {
            title: 'Tu veterinario de confianza',
            description: 'Ahora más accesible que nunca! UbiVet te conecta directamente con veterinarios disponibles para atenderte en la comodidad de tu hogar.',
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
        },
        
        // Veterinarios section
        'vetItem1': {
            title: 'Agenda citas de forma sencilla',
            description: 'Con nuestra app, puedes gestionar tus citas de manera fácil y eficiente.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`
        },
        'vetItem2': {
            title: 'Accede al perfil completo',
            description: 'De tus pacientes con todo su historial médico y tratamientos.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`
        },
        'vetItem3': {
            title: 'Servicios a domicilio',
            description: 'Presta servicios a domicilio, cuando estés disponible.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>`
        },
        'vetItem4': {
            title: 'Red de profesionales',
            description: 'Forma parte de nuestra red de veterinarios a domicilio acreditados.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`
        },
        
        // Clínicas section
        'clinicItem1': {
            title: 'Atrae más clientes',
            description: 'Ya que los tutores de mascotas podrán encontrar tu clínica fácilmente con nuestra funcionalidad de mapas.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>`
        },
        'clinicItem2': {
            title: 'Crea un perfil completo',
            description: 'Donde podrás mostrar toda tu información, desde los servicios que ofreces hasta tus horarios de atención.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>`
        },
        'clinicItem3': {
            title: 'Plan de Marketing',
            description: 'Contrata nuestro plan de marketing y publica promociones y beneficios para nuestros suscriptores.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>`
        },
        'clinicItem4': {
            title: 'Panel de Control',
            description: 'Monitorea estadísticas y gestiona tu clínica integralmente.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`
        },
        'empItem1': {
            title: 'Convenios corporativos',
            description: 'Ofrece atención veterinaria como beneficio corporativo para las mascotas de tus empleados.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>`
        },
        'empItem2': {
            title: 'Reportes y estadísticas',
            description: 'Obtén métricas detalladas del uso y satisfacción del beneficio en tiempo real.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`
        },
        'empItem3': {
            title: 'Planes flexibles',
            description: 'Tarifas preferenciales y opciones de pago adaptadas a las necesidades de tu empresa.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>`
        },
        'empItem4': {
            title: 'Bienestar corporativo',
            description: 'Mejora el clima laboral ofreciendo cuidado veterinario como beneficio único y diferenciador.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>`
        },
        'empItem5': {
            title: 'Soporte dedicado',
            description: 'Account manager exclusivo y soporte 24/7 para implementación y gestión del programa.',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>`
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
                if (destination.includes('emp')) section = 'empresas';
                
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