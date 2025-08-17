// API Client para Google Apps Script - Veterinaria Tarapacá
// Conecta el frontend de Vercel con Google Apps Script

class AppsScriptAPI {
    constructor() {
        // URL del Google Apps Script (se actualizará con la URL real)
        this.scriptUrl = 'APPS_SCRIPT_URL_AQUI'; // Reemplazar con tu URL
        this.isConfigured = false;
    }
    
    /**
     * Configurar la URL del Apps Script
     */
    configure(scriptUrl) {
        this.scriptUrl = scriptUrl;
        this.isConfigured = true;
    }
    
    /**
     * Verificar disponibilidad de horarios para una fecha específica
     */
    async checkAvailability(date, consultationType) {
        // Verificar rate limiting si está disponible
        if (window.securityManager && !window.securityManager.canMakeRequest()) {
            throw new Error('Rate limit excedido. Por favor espere un momento.');
        }

        if (!this.isConfigured) {
            console.warn('Apps Script API no configurada. Usando horarios estáticos.');
            return this.getFallbackSlots(date, consultationType);
        }
        
        try {
            // Log seguro (sin exponer URLs)
            if (window.securityManager) {
                window.securityManager.secureLog('Verificando disponibilidad', { 
                    date, 
                    consultationType,
                    scriptUrl: this.scriptUrl 
                });
            } else {
            }
            
            // Usar GET con parámetros para evitar CORS
            const params = new URLSearchParams({
                action: 'checkAvailability',
                date: date,
                consultationType: consultationType
            });
            
            const url = `${this.scriptUrl}?${params.toString()}`;
            
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Error desconocido al verificar disponibilidad');
            }
            
            return result.availableSlots;
            
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            
            // Fallback a horarios estáticos si falla la API
            return this.getFallbackSlots(date, consultationType);
        }
    }
    
    /**
     * Crear nueva cita en Google Calendar
     */
    async createAppointment(appointmentData) {
        if (!this.isConfigured) {
            throw new Error('Apps Script API no configurada. Llama a configure() primero.');
        }
        
        try {
            
            
            // Usar GET con parámetros codificados para evitar CORS
            const params = new URLSearchParams({
                action: 'createAppointment',
                // Codificar datos de la cita como JSON string
                appointmentData: JSON.stringify(appointmentData)
            });
            
            const url = `${this.scriptUrl}?${params.toString()}`;
            
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Error desconocido al crear la cita');
            }
            
            return result;
            
        } catch (error) {
            console.error('Error al crear cita:', error);
            throw error;
        }
    }
    
    /**
     * Horarios estáticos como respaldo si falla la API
     */
    getFallbackSlots(dateString, consultationType) {
        const date = new Date(dateString);
        const dayName = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][date.getDay()];
        
        const schedules = {
            lunes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
            martes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
            miercoles: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
            jueves: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
            viernes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
            sabado: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00'],
            domingo: []
        };
        
        // Filtrar horarios según duración de consulta
        let slots = schedules[dayName] || [];
        
        // No filtrar slots para endocrinología - permitir todos los horarios de 30 min
        // El filtrado de disponibilidad se hace en el backend según citas existentes
        
        return slots;
    }
    
    /**
     * Probar conexión con el Apps Script
     */
    async testConnection() {
        if (!this.isConfigured) {
            throw new Error('Apps Script API no configurada');
        }
        
        try {
            const response = await fetch(this.scriptUrl, {
                method: 'GET'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
            
        } catch (error) {
            console.error('Error al probar conexión:', error);
            throw error;
        }
    }
    
    /**
     * Verificar si la API está configurada
     */
    isReady() {
        return this.isConfigured && this.scriptUrl !== 'APPS_SCRIPT_URL_AQUI';
    }
}

// Exportar para uso global
window.AppsScriptAPI = AppsScriptAPI;