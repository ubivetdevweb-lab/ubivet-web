/**
 * UbiVet Component Loader
 * Sistema de carga modular para componentes HTML
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.cache = new Map();
    }

    /**
     * Carga un componente HTML desde un archivo
     * @param {string} componentPath - Ruta al archivo del componente
     * @param {string} targetSelector - Selector CSS del elemento donde insertar
     * @param {boolean} replace - Si reemplazar completamente el contenido (default: true)
     */
    async loadComponent(componentPath, targetSelector, replace = true) {
        try {
            // Verificar si ya está en cache
            if (!this.cache.has(componentPath)) {
                const response = await fetch(componentPath);
                if (!response.ok) {
                    throw new Error(`Error loading component: ${response.status}`);
                }
                const html = await response.text();
                this.cache.set(componentPath, html);
            }

            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                throw new Error(`Target element not found: ${targetSelector}`);
            }

            const componentHTML = this.cache.get(componentPath);
            
            if (replace) {
                targetElement.innerHTML = componentHTML;
            } else {
                targetElement.insertAdjacentHTML('beforeend', componentHTML);
            }

            this.loadedComponents.add(componentPath);
            
            // Disparar evento personalizado
            document.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentPath, targetSelector }
            }));

            // Reinicializar carruseles si existe el controlador
            if (window.carouselController) {
                setTimeout(() => {
                    window.carouselController.setupCarousels();
                }, 200);
            }

            return true;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            return false;
        }
    }

    /**
     * Carga múltiples componentes en paralelo
     * @param {Array} components - Array de objetos {path, target, replace}
     */
    async loadComponents(components) {
        const promises = components.map(comp => 
            this.loadComponent(comp.path, comp.target, comp.replace)
        );
        
        const results = await Promise.allSettled(promises);
        return results.map((result, index) => ({
            component: components[index],
            success: result.status === 'fulfilled' && result.value,
            error: result.status === 'rejected' ? result.reason : null
        }));
    }

    /**
     * Carga diferida (lazy loading) de componentes
     * @param {string} componentPath - Ruta al componente
     * @param {string} targetSelector - Selector del objetivo
     * @param {Object} options - Opciones del IntersectionObserver
     */
    lazyLoadComponent(componentPath, targetSelector, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadComponent(componentPath, targetSelector);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            observer.observe(targetElement);
        }
    }

    /**
     * Verifica si un componente está cargado
     * @param {string} componentPath - Ruta del componente
     */
    isLoaded(componentPath) {
        return this.loadedComponents.has(componentPath);
    }

    /**
     * Limpia la cache de componentes
     */
    clearCache() {
        this.cache.clear();
        this.loadedComponents.clear();
    }

    /**
     * Pre-carga componentes críticos
     * @param {Array} componentPaths - Array de rutas de componentes
     */
    async preloadComponents(componentPaths) {
        const promises = componentPaths.map(async (path) => {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const html = await response.text();
                    this.cache.set(path, html);
                }
            } catch (error) {
                console.warn(`Failed to preload component: ${path}`, error);
            }
        });
        
        await Promise.allSettled(promises);
    }
}

// Crear instancia global
const componentLoader = new ComponentLoader();

// Configuración para UbiVet
const UBIVET_COMPONENTS = {
    meta: 'components/head-meta.html',
    navigation: 'components/navigation.html',
    hero: 'components/hero-section.html',
    tutores: 'components/tutores-section.html',
    veterinarios: 'components/vets-section.html',
    clinicas: 'components/clinicas-section.html',
    about: 'components/about-section.html',
    contact: 'components/contact-section.html'
};

// Función de conveniencia para UbiVet
function loadUbivetComponents() {
    return componentLoader.loadComponents([
        { path: UBIVET_COMPONENTS.navigation, target: '#navigation-placeholder' },
        { path: UBIVET_COMPONENTS.hero, target: '#hero-placeholder' },
        { path: UBIVET_COMPONENTS.tutores, target: '#tutores-placeholder' },
        { path: UBIVET_COMPONENTS.veterinarios, target: '#veterinarios-placeholder' },
        { path: UBIVET_COMPONENTS.clinicas, target: '#clinicas-placeholder' },
        { path: UBIVET_COMPONENTS.about, target: '#about-placeholder' },
        { path: UBIVET_COMPONENTS.contact, target: '#contact-placeholder' }
    ]);
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Pre-cargar componentes críticos
    await componentLoader.preloadComponents([
        UBIVET_COMPONENTS.navigation,
        UBIVET_COMPONENTS.hero
    ]);
    
    // Cargar componentes si los placeholders existen
    if (document.querySelector('#navigation-placeholder')) {
        await loadUbivetComponents();
    }
});

// Exportar para uso global
window.componentLoader = componentLoader;
window.loadUbivetComponents = loadUbivetComponents;