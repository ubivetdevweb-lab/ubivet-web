// Sistema de Seguridad para Veterinaria Tarapacá
// Protección contra ataques comunes y validación de entrada

class SecurityManager {
    constructor() {
        this.initSecurityMeasures();
        this.setupCSPViolationReporting();
        this.enableRateLimiting();
    }

    // Inicializar medidas de seguridad básicas
    initSecurityMeasures() {
        // Prevenir console access en producción
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            this.disableConsoleInProduction();
        }

        // Detectar herramientas de desarrollo
        this.detectDevTools();

        // Limpiar datos sensibles del DOM
        this.cleanSensitiveData();
    }

    // Desactivar console en producción
    disableConsoleInProduction() {
        const noop = () => {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 
                        'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
        
        methods.forEach(method => {
            if (console[method]) {
                console[method] = noop;
            }
        });
    }

    // Detectar herramientas de desarrollo abiertas
    detectDevTools() {
        let devtools = {open: false, orientation: null};
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || 
                window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.onDevToolsOpen();
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    // Acción cuando se detectan dev tools (opcional)
    onDevToolsOpen() {
        // En producción, podrías registrar esto o tomar alguna acción
        // Por ahora solo lo documentamos
    }

    // Limpiar datos sensibles del DOM
    cleanSensitiveData() {
        // Remover comentarios HTML que puedan contener información
        const removeComments = (node) => {
            if (node.nodeType === Node.COMMENT_NODE) {
                node.remove();
            } else {
                for (let child of [...node.childNodes]) {
                    removeComments(child);
                }
            }
        };
        
        setTimeout(() => removeComments(document.body), 1000);
    }

    // Configurar reporte de violaciones CSP
    setupCSPViolationReporting() {
        document.addEventListener('securitypolicyviolation', (e) => {
            console.warn('CSP Violation:', e.violatedDirective, e.blockedURI);
            // En producción podrías enviar esto a un servicio de logging
        });
    }

    // Rate limiting básico para requests
    enableRateLimiting() {
        this.requestCount = 0;
        this.requestWindow = 60000; // 1 minuto
        this.maxRequests = 10; // máximo 10 requests por minuto
        
        setInterval(() => {
            this.requestCount = 0;
        }, this.requestWindow);
    }

    // Verificar si se puede hacer un request (rate limiting)
    canMakeRequest() {
        if (this.requestCount >= this.maxRequests) {
            console.warn('Rate limit exceeded');
            return false;
        }
        this.requestCount++;
        return true;
    }

    // Sanitizar entrada de usuario
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>]/g, '') // Remover < y >
            .replace(/javascript:/gi, '') // Remover javascript:
            .replace(/on\w+=/gi, '') // Remover eventos onclick, onload, etc
            .replace(/data:/gi, '') // Remover data URLs
            .trim()
            .substring(0, 500); // Limitar longitud
    }

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar teléfono chileno
    isValidChileanPhone(phone) {
        const phoneRegex = /^(\+56|56)?[2-9]\d{7,8}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    // Validar datos del formulario
    validateFormData(formData) {
        const errors = [];
        
        // Validar nombre del tutor
        if (!formData.tutorName || formData.tutorName.length < 2) {
            errors.push('Nombre del tutor requerido (mínimo 2 caracteres)');
        }
        
        // Validar email
        if (formData.tutorEmail && !this.isValidEmail(formData.tutorEmail)) {
            errors.push('Email inválido');
        }
        
        // Validar teléfono
        if (!formData.tutorPhone || !this.isValidChileanPhone(formData.tutorPhone)) {
            errors.push('Teléfono chileno válido requerido');
        }
        
        // Validar nombre de mascota
        if (!formData.petName || formData.petName.length < 1) {
            errors.push('Nombre de la mascota requerido');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Limpiar URL de Apps Script de logs
    obfuscateScriptUrl(url) {
        if (!url) return url;
        return url.replace(/AKfyc[a-zA-Z0-9_-]+/, 'AKfyc***HIDDEN***');
    }

    // Función para logging seguro
    secureLog(message, data = {}) {
        const cleanData = {...data};
        
        // Remover información sensible de los logs
        if (cleanData.scriptUrl) {
            cleanData.scriptUrl = this.obfuscateScriptUrl(cleanData.scriptUrl);
        }
        
        if (cleanData.email) {
            cleanData.email = cleanData.email.replace(/(.{1,3}).*@/, '$1***@');
        }
        
        if (cleanData.phone) {
            cleanData.phone = cleanData.phone.replace(/\d(?=\d{4})/g, '*');
        }
        
        console.log(`[SECURE] ${message}`, cleanData);
    }
}

// Inicializar sistema de seguridad
document.addEventListener('DOMContentLoaded', () => {
    window.securityManager = new SecurityManager();
    
    // Añadir validación a formularios existentes
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Aquí puedes añadir validación adicional si es necesaria
        });
    });
});

// Exportar para uso global
window.SecurityManager = SecurityManager;