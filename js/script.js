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

console.log('UbiVet JavaScript loaded successfully');