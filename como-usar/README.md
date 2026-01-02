# 📚 Guía de Uso Ubivet

Sistema de instructivos paso a paso optimizado para móviles con secciones separadas para cada tipo de usuario.

## 🎯 Características

✅ **Mobile-First Design** - Optimizado al 100% para dispositivos móviles
✅ **3 Secciones Independientes** - Tutores, Veterinarios y Clínicas
✅ **Sistema de Tabs** - Navegación intuitiva entre secciones
✅ **Paso a Paso Visual** - Cards numeradas con iconos y descripciones
✅ **FAQ Interactivo** - Acordeones con preguntas frecuentes
✅ **Totalmente Responsive** - Se adapta a cualquier tamaño de pantalla
✅ **SEO Friendly** - URLs con parámetros compartibles
✅ **Accesibilidad** - Navegación por teclado y screen readers

## 📁 Estructura

```
como-usar/
├── index.html              # Página principal
├── css/
│   └── guia.css           # Estilos mobile-first
├── js/
│   └── guia.js            # Interactividad y navegación
├── images/                # Screenshots (TODO: agregar)
└── README.md              # Esta documentación
```

## 🌐 URLs Accesibles

**Principal:**
```
https://tudominio.com/como-usar
```

**Con tabs específicos:**
```
https://tudominio.com/como-usar?tab=tutores
https://tudominio.com/como-usar?tab=veterinarios
https://tudominio.com/como-usar?tab=clinicas
```

## 🎨 Sistema de Tabs

### Tutores (Por defecto)
- **7 pasos** para usar la app móvil
- Descarga e instalación
- Registro y configuración
- Mapa de emergencias (feature principal - GRATIS)
- Buscador por servicios (membresía)
- Veterinarios a domicilio (membresía)
- Verificación QR
- **3 FAQs**

### Veterinarios
- **6 pasos** para registrarse y ofrecer servicios
- Creación de perfil profesional
- Certificaciones y acreditaciones
- Definir aranceles
- Recepción de solicitudes por email (feature principal)
- Coordinación directa con clientes
- Verificación QR
- **3 FAQs**
- **CTA**: Registro en app.ubivet.cl (100% gratis)

### Clínicas
- **6 pasos** para registrar clínica
- Registro de datos comerciales
- Configuración de horarios
- Listado de servicios
- Aparecer en mapa de emergencias (feature principal)
- Gestión de agenda (opcional)
- Captación de nuevos clientes
- **3 FAQs**
- **CTA**: Registro en app.ubivet.cl

## 💻 Características Técnicas

### Mobile-First CSS
- Variables CSS para mantenimiento fácil
- Flexbox para layouts flexibles
- Touch targets optimizados (min 48px)
- Animaciones GPU-accelerated
- Smooth scroll nativo
- `prefers-reduced-motion` para accesibilidad

### JavaScript Features
- **Tab switching** con URL sync
- **FAQ acordeón** con one-at-a-time behavior
- **Lazy loading** de imágenes
- **Scroll tracking** para analytics
- **Keyboard navigation** (flechas izq/der)
- **Share API** nativo (mobile)
- **Toast notifications** para feedback
- **Performance monitoring**

### Optimizaciones Móviles
- Touch-friendly buttons (min-height: 80px)
- Tap highlight removal
- Scroll to top al cambiar tab
- Scroll to question al abrir FAQ
- Touch effects en cards
- Reducción de animaciones en touch devices

## 🛠️ Desarrollo Local

### Servidor:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve . -p 8000
```

### Acceder:
```
http://localhost:8000/como-usar
http://localhost:8000/como-usar?tab=tutores
http://localhost:8000/como-usar?tab=veterinarios
http://localhost:8000/como-usar?tab=clinicas
```

## 📸 Screenshots (TODO)

Agregar screenshots reales de la app en:
- `/como-usar/images/tutores/`
- `/como-usar/images/veterinarios/`
- `/como-usar/images/clinicas/`

Reemplazar `.screenshot-placeholder` con:
```html
<img src="images/tutores/step-1.png" alt="Descripción" class="step-screenshot">
```

## 🎯 Personalización

### Agregar nuevo paso:
```html
<div class="step-card">
    <div class="step-number">8</div>
    <div class="step-content">
        <h3 class="step-title">
            <i class="fas fa-icon text-vet-teal mr-3"></i>
            Título del paso
        </h3>
        <p class="step-description">
            Descripción detallada del paso.
        </p>
    </div>
</div>
```

### Agregar FAQ:
```html
<div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
        <span>¿Tu pregunta aquí?</span>
        <i class="fas fa-chevron-down"></i>
    </button>
    <div class="faq-answer">
        <p>Tu respuesta detallada aquí.</p>
    </div>
</div>
```

### Destacar paso importante:
Agrega clase `.highlighted` al step-card:
```html
<div class="step-card highlighted">
    ...
</div>
```

## 📊 Analytics (Opcional)

El código está preparado para Google Analytics. Eventos trackeados:

```javascript
// Tab switches
gtag('event', 'tab_switch', { tab_name: 'tutores' });

// FAQ interactions
gtag('event', 'faq_toggle', {
    question: '¿Pregunta?',
    action: 'open'
});

// Scroll depth
gtag('event', 'scroll_depth', { percent: 50 });
```

Para activar, incluir Google Analytics en `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔧 Debug Helpers

Abrir consola del navegador:

```javascript
// Cambiar tab programáticamente
ubivetGuide.switchTab('veterinarios')

// Copiar URL al clipboard
ubivetGuide.copyToClipboard(window.location.href)

// Compartir (en móvil con Share API)
ubivetGuide.shareGuide('tutores')

// Ver versión
ubivetGuide.version
```

## ✅ Checklist Pre-Deploy

- [ ] Agregar screenshots reales de la app
- [ ] Revisar todos los enlaces (CTAs, footer)
- [ ] Probar en Safari iOS
- [ ] Probar en Chrome Android
- [ ] Verificar que todos los íconos cargan
- [ ] Comprobar responsive en todos los breakpoints
- [ ] Testear navegación por teclado
- [ ] Validar accesibilidad con Lighthouse
- [ ] Configurar Analytics (opcional)
- [ ] Probar compartir en móvil
- [ ] Verificar que las FAQs funcionan
- [ ] Testear todos los tabs
- [ ] Revisar ortografía y gramática

## 🚀 Deploy a Producción

### Vercel (Automático)
El sitio se desplegará automáticamente en:
```
https://tudominio.com/como-usar
```

### Netlify / GitHub Pages
Compatible sin configuración adicional. Solo sube la carpeta.

## 📝 Notas

- **Prioridad móvil**: 70% del tráfico viene de móviles
- **Paso 4 de Tutores**: Es el feature estrella (mapa gratis)
- **Paso 4 de Veterinarios**: Sistema de solicitudes por email
- **Paso 4 de Clínicas**: Aparecer en el mapa
- **FAQs**: Responden las 3 preguntas más comunes por perfil

## 🎨 Paleta de Colores

```css
--vet-teal: #4ECDC4        /* Primary */
--vet-teal-light: #7EDDD7  /* Light */
--vet-teal-dark: #2BB8B1   /* Dark */
```

## 📞 Soporte

Para dudas o mejoras:
- Email: jsolis@ubivet.cl
- WhatsApp: +569 8810 8227

---

**Creado para Ubivet** 🐾
*Sistema de instructivos mobile-first con máxima optimización*
