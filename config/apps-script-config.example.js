// TEMPLATE: Configuración de Google Apps Script para Veterinaria Tarapacá
// INSTRUCCIONES: Si necesitas crear un nuevo Apps Script, usa esta plantilla

const APPS_SCRIPT_CONFIG = {
    // URL de tu Google Apps Script deployed
    // Formato: https://script.google.com/macros/s/[SCRIPT_ID]/exec
    scriptUrl: 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec',
    
    // Estado de configuración
    isConfigured: true, // Cambiar a true cuando tengas tu URL
    
    // Configuración adicional
    production: true,
    timeout: 10000, // Timeout en milisegundos
    retries: 2 // Número de reintentos
};

// Configurar la API cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.bookingSystem && window.bookingSystem.appsScriptAPI) {
        if (APPS_SCRIPT_CONFIG.isConfigured) {
            window.bookingSystem.appsScriptAPI.configure(APPS_SCRIPT_CONFIG.scriptUrl);
            console.log('✅ Apps Script API configurada');
        } else {
            console.warn('⚠️ Apps Script no configurado. Usando horarios estáticos como respaldo.');
        }
    }
});

// Exportar configuración
window.APPS_SCRIPT_CONFIG = APPS_SCRIPT_CONFIG;