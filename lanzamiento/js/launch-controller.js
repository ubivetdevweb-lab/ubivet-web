/**
 * LAUNCH CONTROLLER
 *
 * Manages the display of countdown vs launch page based on:
 * 1. Current date vs launch date
 * 2. URL preview parameter for development
 *
 * Usage:
 * - /lanzamiento → Shows automatically based on date
 * - /lanzamiento?preview=countdown → Forces countdown view
 * - /lanzamiento?preview=launch → Forces launch view
 */

class LaunchController {
    constructor(config = {}) {
        this.config = {
            launchDate: config.launchDate || '2026-01-25T00:00:00',
            countdownComponent: config.countdownComponent || 'components/countdown.html',
            launchComponent: config.launchComponent || 'components/launch.html',
            container: config.container || '#component-container',
            debug: config.debug || false
        };

        this.container = null;
        this.previewIndicator = null;
        this.currentView = null;
    }

    /**
     * Initialize the controller
     */
    init() {
        this.log('🚀 Launch Controller Initialized');
        this.log('Launch Date:', this.config.launchDate);

        // Get DOM elements
        this.container = document.querySelector(this.config.container);
        this.previewIndicator = document.getElementById('previewIndicator');

        if (!this.container) {
            this.error('Container not found:', this.config.container);
            return;
        }

        // Determine which view to show
        const view = this.determineView();
        this.log('View to show:', view);

        // Load the appropriate component
        this.loadComponent(view);
    }

    /**
     * Determine which view to show based on date and URL params
     */
    determineView() {
        // Check for preview parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const previewMode = urlParams.get('preview');

        if (previewMode) {
            this.log('Preview mode detected:', previewMode);
            this.showPreviewIndicator(previewMode);

            if (previewMode === 'countdown') {
                return 'countdown';
            } else if (previewMode === 'launch') {
                return 'launch';
            }
        }

        // Check current date vs launch date
        const now = new Date();
        const launchDate = new Date(this.config.launchDate);

        this.log('Current date:', now);
        this.log('Launch date:', launchDate);

        if (now >= launchDate) {
            return 'launch';
        } else {
            return 'countdown';
        }
    }

    /**
     * Load the appropriate component
     */
    async loadComponent(view) {
        this.currentView = view;
        this.log('Loading component:', view);

        // Add loading class
        this.container.classList.add('loading');

        try {
            const componentPath = view === 'countdown'
                ? this.config.countdownComponent
                : this.config.launchComponent;

            this.log('Fetching:', componentPath);

            const response = await fetch(componentPath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();

            // Small delay for smooth transition
            await this.delay(300);

            // Insert content
            this.container.innerHTML = html;

            // Remove loading class
            this.container.classList.remove('loading');

            this.log('✅ Component loaded successfully');

            // Execute any scripts in the loaded content
            this.executeScripts();

        } catch (error) {
            this.error('Failed to load component:', error);
            this.showError();
        }
    }

    /**
     * Execute scripts from loaded component
     */
    executeScripts() {
        const scripts = this.container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');

            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }

            // Replace old script with new one to execute it
            script.parentNode.replaceChild(newScript, script);
        });
    }

    /**
     * Show preview mode indicator
     */
    showPreviewIndicator(mode) {
        if (this.previewIndicator) {
            const modeText = mode === 'countdown' ? 'Cuenta Regresiva' : 'Landing';
            document.getElementById('previewMode').textContent = modeText;
            this.previewIndicator.classList.add('show');
        }
    }

    /**
     * Show error message
     */
    showError() {
        this.container.innerHTML = `
            <div style="
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 2rem;
            ">
                <div>
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.8;"></i>
                    <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 1rem 0;">
                        Error al cargar el contenido
                    </h2>
                    <p style="font-size: 1rem; opacity: 0.9; margin: 0 0 2rem 0;">
                        Por favor, intenta recargar la página
                    </p>
                    <button onclick="location.reload()" style="
                        background: rgba(255, 255, 255, 0.2);
                        border: 2px solid white;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 50px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        <i class="fas fa-redo"></i> Recargar
                    </button>
                </div>
            </div>
        `;
        this.container.classList.remove('loading');
    }

    /**
     * Utility: Delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Utility: Logging
     */
    log(...args) {
        if (this.config.debug || window.location.hostname === 'localhost') {
            console.log('[LaunchController]', ...args);
        }
    }

    error(...args) {
        console.error('[LaunchController]', ...args);
    }

    /**
     * Public method: Switch view manually (for testing)
     */
    switchView(view) {
        if (view !== 'countdown' && view !== 'launch') {
            this.error('Invalid view:', view);
            return;
        }

        this.log('Switching to view:', view);
        this.loadComponent(view);
    }

    /**
     * Public method: Get current view
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Public method: Get time until launch
     */
    getTimeUntilLaunch() {
        const now = new Date();
        const launchDate = new Date(this.config.launchDate);
        const diff = launchDate - now;

        if (diff < 0) {
            return null; // Launch has passed
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            total: diff
        };
    }

    /**
     * Public method: Check if launch date has passed
     */
    hasLaunched() {
        const now = new Date();
        const launchDate = new Date(this.config.launchDate);
        return now >= launchDate;
    }
}

/**
 * Development Helper Functions
 * Available in console for testing
 */

// Make controller globally accessible for debugging
window.LaunchController = LaunchController;

// Helper function to switch views from console
window.switchToCountdown = function() {
    const params = new URLSearchParams(window.location.search);
    params.set('preview', 'countdown');
    window.location.search = params.toString();
};

window.switchToLaunch = function() {
    const params = new URLSearchParams(window.location.search);
    params.set('preview', 'launch');
    window.location.search = params.toString();
};

window.clearPreview = function() {
    window.location.href = window.location.pathname;
};

// Log available helper functions
if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    console.log(`
%c🚀 Launch Controller - Development Mode

Available helper functions:
- switchToCountdown()  → Force countdown view
- switchToLaunch()     → Force launch view
- clearPreview()       → Clear preview mode

URL Preview Modes:
- ?preview=countdown   → Show countdown component
- ?preview=launch      → Show launch component

`, 'background: #667eea; color: white; padding: 10px; border-radius: 5px; font-weight: bold;');
}
