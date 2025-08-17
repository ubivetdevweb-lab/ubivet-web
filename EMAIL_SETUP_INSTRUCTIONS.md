# 📧 Instrucciones: Configuración Email de Confirmación

## 🎯 OBJETIVO
Activar el envío automático de emails de confirmación cuando se agenda una cita.

## ⚙️ CONFIGURACIÓN EN GOOGLE APPS SCRIPT

### **Paso 1: Habilitar Gmail API** (2 minutos)

1. **Abrir Google Apps Script**:
   - Ve a [script.google.com](https://script.google.com)
   - Abre tu proyecto "Veterinaria Tarapacá"

2. **Habilitar Gmail API**:
   - En el panel izquierdo, clic en **"Servicios"** ➕
   - Buscar **"Gmail API"**
   - Hacer clic en **"Agregar"**
   - ✅ Gmail API estará disponible

### **Paso 2: Actualizar el Código** (1 minuto)

1. **Copiar código nuevo**:
   - Abrir archivo `google-apps-script/Code.gs` del repositorio
   - **Reemplazar completamente** el contenido del Apps Script
   - El nuevo código incluye las funciones de email

2. **Guardar**:
   - Ctrl+S o botón "Guardar"
   - ✅ Código actualizado

### **Paso 3: Testing** (2 minutos)

1. **Probar email**:
   - En Apps Script, seleccionar función `testEmailConfirmation`
   - **ANTES DE EJECUTAR**: Cambiar el email de prueba:
     ```javascript
     email: 'test@ejemplo.com' // ← Cambiar por tu email real
     ```
   - Clic en **"Ejecutar"**

2. **Autorizar permisos**:
   - Primera vez pedirá autorización
   - Clic **"Autorizar"**
   - Seleccionar tu cuenta Gmail
   - Clic **"Permitir"**

3. **Verificar resultado**:
   - Revisar **"Logs"** para ver si dice "Email enviado exitosamente"
   - Revisar tu bandeja de entrada
   - ✅ Deberías recibir un email profesional

## 📧 **CÓMO FUNCIONA**

### **Flujo Automático**:
```
Usuario agenda cita → Apps Script crea evento → Automáticamente envía email → Usuario recibe confirmación
```

### **Template del Email**:
- ✅ Header profesional con logo y colores de marca
- ✅ Badge "CITA CONFIRMADA" verde
- ✅ Detalles completos de la cita (fecha, hora, tipo, duración)
- ✅ Información de la mascota
- ✅ Ubicación con link de WhatsApp
- ✅ Instrucciones importantes (llegar 10 min antes, etc.)
- ✅ Footer con datos de contacto

### **Datos Incluidos**:
- Nombre del tutor
- Fecha y hora de la cita (en español)
- Tipo de consulta y duración
- Nombre y datos de la mascota
- Información del profesional
- Ubicación y teléfono de la clínica

## 🔧 **CONFIGURACIÓN ADICIONAL (OPCIONAL)**

### **Email de la Clínica**:
Por defecto usa el Gmail asociado al Apps Script. Si quieres cambiar:

```javascript
// En la función sendConfirmationEmail, línea ~513:
replyTo: 'tucorreo@tudominio.com' // Cambiar aquí
```

### **Personalizar Mensajes**:
```javascript
// En la función createEmailTemplate puedes modificar:
- Textos de bienvenida
- Instrucciones específicas
- Información de contacto
- Colores y diseño
```

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### **Error: "Gmail API no habilitada"**
- **Solución**: Repetir Paso 1, asegurarse de agregar Gmail API

### **Error: "No autorizado"**
- **Solución**: Ejecutar `testEmailConfirmation` y autorizar permisos

### **Email no llega**:
- ✅ Verificar que el email del tutor sea válido
- ✅ Revisar spam/promociones
- ✅ Verificar logs del Apps Script

### **Error de formato**:
- ✅ Verificar que los datos del formulario estén completos
- ✅ Revisar logs para ver qué campos faltan

## 📊 **LÍMITES Y RESTRICCIONES**

- **Gmail API Gratis**: 100 emails/día
- **Suficiente para**: Una clínica veterinaria típica
- **Si necesitas más**: Configurar con servicio de email profesional

## ✅ **TESTING COMPLETO**

### **Probar con cita real**:
1. Ir al sitio web
2. Agendar una cita de prueba con tu email
3. Verificar que llegue el email de confirmación
4. Verificar que se cree el evento en Google Calendar
5. ✅ Todo funcionando

## 🎯 **RESULTADO FINAL**

Una vez configurado:
- ✅ **Automático**: Cada cita envía email sin intervención
- ✅ **Profesional**: Email con diseño de marca
- ✅ **Completo**: Toda la información necesaria
- ✅ **Confiable**: Usando Gmail API de Google

**¡El sistema estará listo para producción!** 🚀

---

## 📞 **SOPORTE TÉCNICO**

Si tienes problemas:
1. Revisar los logs en Apps Script
2. Verificar que Gmail API esté habilitado
3. Confirmar permisos autorizados
4. Probar con `testEmailConfirmation`

**Email de confirmación = +95% profesionalismo percibido por clientes** 📈