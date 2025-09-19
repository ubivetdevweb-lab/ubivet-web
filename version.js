// Version and cache busting configuration
window.UBIVET_VERSION = {
    app: '1.0.0',
    build: Date.now(),
    components: {
        'navigation': '1.1.0',
        'hero-section': '1.2.0',
        'vets-section': '1.3.0',
        'clinicas-section': '1.2.0',
        'empresas-section': '1.2.0',
        'contact-section': '1.1.0',
        'footer': '1.0.0',
        'about-section': '1.0.0',
        'tutores-section': '1.0.0'
    }
};

// Force cache invalidation on version mismatch
const checkVersion = () => {
    const stored = localStorage.getItem('ubivet_version');
    const current = window.UBIVET_VERSION.build;

    if (stored !== current.toString()) {
        if (window.componentLoader) {
            window.componentLoader.clearCache();
        }
        localStorage.setItem('ubivet_version', current.toString());
        console.log(`🔄 Version updated: ${stored} → ${current}`);
    }
};

// Check version on load
document.addEventListener('DOMContentLoaded', checkVersion);