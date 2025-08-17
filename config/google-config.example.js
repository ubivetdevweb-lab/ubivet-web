// TEMPLATE: Configuración de Google Calendar API para Veterinaria Tarapacá
// INSTRUCCIONES: Duplica este archivo como 'google-config.js' y completa con tus credenciales reales

const GOOGLE_CONFIG = {
    // Tu API Key de Google Cloud Console
    // Obtén tu clave en: https://console.cloud.google.com/apis/credentials
    apiKey: 'TU_API_KEY_DE_GOOGLE_CLOUD',
    
    // ID del calendario de la veterinaria
    // Formato: nombre@gmail.com o calendario_id@group.calendar.google.com
    calendarId: 'tu-calendario@gmail.com',
    
    // Tu Client ID OAuth 2.0 de Google Cloud Console  
    // Formato: xxxxxxxxx-xxxxxx.apps.googleusercontent.com
    clientId: 'TU_CLIENT_ID.apps.googleusercontent.com',
    
    // Permisos necesarios (NO MODIFICAR)
    scopes: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events'
    ]
};

// Aplicar configuración globalmente
window.GOOGLE_CONFIG = GOOGLE_CONFIG;