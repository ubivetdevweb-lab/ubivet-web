/**
 * Ubivet Carousel Controller
 * Maneja las transiciones de los carruseles interactivos de mockups
 */

class CarouselController {
    constructor() {
        this.carousels = new Map();
        this.initialized = false;
    }

    /**
     * Inicializa todos los carruseles en la página
     */
    init() {
        if (this.initialized) {
            console.log('Carruseles ya inicializados, saltando...');
            return;
        }

        // Solo una vez cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupCarousels();
                this.initialized = true;
            });
        } else {
            this.setupCarousels();
            this.initialized = true;
        }
    }

    /**
     * Configura todos los carruseles encontrados en la página
     */
    setupCarousels() {
        // Limpiar carruseles existentes para evitar duplicaciones
        this.carousels.clear();

        // Buscar todos los contenedores de contenido de carrusel
        const phoneContainers = document.querySelectorAll('.phone-content-area');
        const laptopContainers = document.querySelectorAll('.laptop-content-area');

        phoneContainers.forEach((container, index) => {
            const carouselId = `phone-carousel-${index}`;
            // Solo configurar si no existe ya
            if (!this.carousels.has(carouselId)) {
                this.setupCarousel(container, carouselId);
            }
        });

        laptopContainers.forEach((container, index) => {
            const carouselId = `laptop-carousel-${index}`;
            // Solo configurar si no existe ya
            if (!this.carousels.has(carouselId)) {
                this.setupCarousel(container, carouselId);
            }
        });

        console.log(`🎠 Carruseles configurados: ${this.carousels.size}`);
    }

    /**
     * Configura un carrusel individual
     */
    setupCarousel(container, carouselId) {
        const contents = container.querySelectorAll('.content');
        const buttons = this.findCarouselButtons(container);

        if (contents.length === 0 || buttons.length === 0) {
            console.warn(`Carrusel ${carouselId}: No se encontraron contenidos o botones`);
            return;
        }

        // Guardar referencia del carrusel
        this.carousels.set(carouselId, {
            container,
            contents: Array.from(contents),
            buttons: Array.from(buttons),
            currentIndex: 0
        });

        // Inicializar estado
        this.initializeCarouselState(carouselId);
        
        // Configurar event listeners
        this.setupCarouselListeners(carouselId);

        console.log(`Carrusel ${carouselId} configurado con ${contents.length} contenidos y ${buttons.length} botones`);
    }

    /**
     * Encuentra los botones asociados a un carrusel
     */
    findCarouselButtons(container) {
        // Buscar en el contenedor padre
        const section = container.closest('section');
        if (!section) return [];

        return section.querySelectorAll('.phone-nav-button[data-destination]');
    }

    /**
     * Inicializa el estado del carrusel
     */
    initializeCarouselState(carouselId) {
        const carousel = this.carousels.get(carouselId);
        if (!carousel) return;

        // Ocultar todos los contenidos excepto el primero
        carousel.contents.forEach((content, index) => {
            content.classList.remove('show', 'hide');
            if (index === 0) {
                content.classList.add('show');
            } else {
                content.classList.add('hide');
            }
        });

        // Activar el primer botón
        carousel.buttons.forEach((button, index) => {
            button.classList.remove('active');
            if (index === 0) {
                button.classList.add('active');
            }
        });
    }

    /**
     * Configura los event listeners del carrusel
     */
    setupCarouselListeners(carouselId) {
        const carousel = this.carousels.get(carouselId);
        if (!carousel) return;

        carousel.buttons.forEach((button, buttonIndex) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                const targetId = button.dataset.destination;
                if (!targetId) return;

                // Encontrar el índice del contenido objetivo
                const targetIndex = carousel.contents.findIndex(content => 
                    content.id === targetId
                );

                if (targetIndex !== -1) {
                    this.showContent(carouselId, targetIndex);
                }
            });
        });
    }

    /**
     * Muestra un contenido específico del carrusel
     */
    showContent(carouselId, targetIndex) {
        const carousel = this.carousels.get(carouselId);
        if (!carousel || targetIndex < 0 || targetIndex >= carousel.contents.length) {
            return;
        }

        // Actualizar botones activos
        carousel.buttons.forEach((button, index) => {
            button.classList.remove('active');
            
            // Buscar el botón que corresponde al contenido objetivo
            const targetContent = carousel.contents[targetIndex];
            if (targetContent && button.dataset.destination === targetContent.id) {
                button.classList.add('active');
            }
        });

        // Ocultar todos los contenidos
        carousel.contents.forEach(content => {
            content.classList.remove('show');
            content.classList.add('hide');
        });

        // Mostrar el contenido objetivo con delay para transición suave
        setTimeout(() => {
            const targetContent = carousel.contents[targetIndex];
            if (targetContent) {
                targetContent.classList.remove('hide');
                targetContent.classList.add('show');
            }
        }, 100);

        // Actualizar índice actual
        carousel.currentIndex = targetIndex;
    }

    /**
     * Reinicializa todos los carruseles (útil después de cargar componentes)
     */
    reinitialize() {
        // Debounce para evitar spam de reinicializaciones
        if (this.reinitializeTimeout) {
            clearTimeout(this.reinitializeTimeout);
        }

        this.reinitializeTimeout = setTimeout(() => {
            console.log('🔄 Reinicializando carruseles...');
            this.carousels.clear();
            this.initialized = false;
            this.setupCarousels();
            this.initialized = true;
        }, 100);
    }

    /**
     * Obtiene información de debug de un carrusel
     */
    getCarouselInfo(carouselId) {
        const carousel = this.carousels.get(carouselId);
        if (!carousel) return null;

        return {
            id: carouselId,
            contentsCount: carousel.contents.length,
            buttonsCount: carousel.buttons.length,
            currentIndex: carousel.currentIndex,
            contentIds: carousel.contents.map(c => c.id),
            buttonDestinations: carousel.buttons.map(b => b.dataset.destination)
        };
    }
}

// Crear instancia global
window.carouselController = new CarouselController();

// Auto-inicialización
window.carouselController.init();

// Reinicializar cuando se cargen componentes
document.addEventListener('componentLoaded', () => {
    setTimeout(() => {
        window.carouselController.reinitialize();
    }, 500);
});

// Exportar para uso manual
window.initCarousels = () => window.carouselController.reinitialize();