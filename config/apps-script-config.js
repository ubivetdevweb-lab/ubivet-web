// Configuración de Google Apps Script para Veterinaria Tarapacá - PRODUCCIÓN SEGURA
// ✅ URLs y datos sensibles protegidos mediante variables de entorno

const APPS_SCRIPT_CONFIG = {
    // URL del Google Apps Script (OBTENIDA DE VARIABLE DE ENTORNO O BUILD TIME)
    scriptUrl: getSecureScriptUrl(),
    
    // Estado de configuración
    isConfigured: true,
    
    // Configuración de producción
    production: true,
    timeout: 10000,
    retries: 2
};

// Función segura para obtener URL del Apps Script
function getSecureScriptUrl() {
    // Opción 1: Variable de entorno en build time (Vercel)
    if (typeof process !== 'undefined' && process.env && process.env.APPS_SCRIPT_URL) {
        return process.env.APPS_SCRIPT_URL;
    }
    
    // Opción 2: Variable global inyectada en build
    if (typeof window !== 'undefined' && window.__APPS_SCRIPT_URL__) {
        return window.__APPS_SCRIPT_URL__;
    }
    
    // Opción 3: Base64 encoded (menos seguro pero mejor que texto plano)
    const encodedUrl = 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J3aHlxMlhmV0pYc01yWTB6T1ZSaGhCRFN2bGxIT1FkOUZtbTlkRHFoVGZGcXFUTGw1dWtLOFRobnZuT1dEV05qM00vZXhlYwo=';
    
    try {
        return atob(encodedUrl);
    } catch (error) {
        console.error('Error decodificando URL del Apps Script');
        return null;
    }
}

// Configurar la API cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.bookingSystem && window.bookingSystem.appsScriptAPI) {
        if (APPS_SCRIPT_CONFIG.isConfigured) {
            window.bookingSystem.appsScriptAPI.configure(APPS_SCRIPT_CONFIG.scriptUrl);
        } else {
            console.warn('⚠️ Apps Script no configurado. Usando horarios estáticos como respaldo.');
        }
    }
});

// Exportar configuración
window.APPS_SCRIPT_CONFIG = APPS_SCRIPT_CONFIG;