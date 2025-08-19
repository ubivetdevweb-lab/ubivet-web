# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a veterinary clinic website for "Clínica Veterinaria Tarapacá" built as a static website using HTML, CSS, and JavaScript. The site is a single-page application with modern design elements, social media integration, and a complete booking system with email confirmations.

## Project Structure

```
ubivet-web/
├── index.html                      # Main HTML file (single-page application)
├── components/                     # Modular HTML components
│   ├── navigation.html             # Site navigation
│   ├── hero-section.html          # Hero section with app downloads
│   ├── tutores-section.html       # Tutors section with phone mockup
│   ├── vets-section.html          # Veterinarians section with MacBook mockup
│   ├── clinicas-section.html      # Clinics section with MacBook mockup
│   ├── empresas-section.html      # Enterprises section with MacBook mockup
│   ├── about-section.html         # About section
│   └── contact-section.html       # Contact section
├── css/
│   ├── styles.css                 # Custom CSS styles and animations
│   ├── components.css             # Component-specific styles (MacBook, phone mockups)
│   ├── responsive.css             # Responsive design rules
│   ├── mobile-gaming.css          # Mobile layout with gaming-style buttons
│   └── safari-fix.css             # Safari browser fixes
├── js/
│   ├── script.js                  # Main JavaScript with description system
│   ├── component-loader.js        # Modular component loading system
│   ├── components/
│   │   └── carousel.js            # Interactive carousel controller
│   ├── social-feed.js             # Social media feed integration
│   ├── booking-simple.js          # Complete booking system
│   ├── apps-script-api.js         # Google Apps Script API client
│   └── security.js                # Security management system
├── images/                        # Website images and logos
├── assets/                        # Additional graphic assets
├── config/
│   ├── apps-script-config.js      # Apps Script configuration (production)
│   ├── apps-script-config.example.js # Template for developers
│   └── google-config.example.js   # Google API configuration template
├── google-apps-script/
│   ├── Code.gs                    # Google Apps Script backend
│   ├── Code-EmailFixed.gs         # Fixed email functions
│   └── EmailTemplate.html         # Professional email template
├── ERROR_PAGES/                   # Custom error pages (404, 500, 403)
├── DOCUMENTATION/                 # Setup and security docs
└── README.md                      # Project documentation
```

## Technology Stack

- **Frontend Framework**: Vanilla HTML/CSS/JavaScript
- **CSS Framework**: Tailwind CSS (loaded via CDN)
- **Backend**: Google Apps Script + Google Calendar API
- **Email System**: Gmail API integration
- **Security**: Comprehensive client-side security system
- **Font**: Poppins from Google Fonts
- **Icons**: Font Awesome
- **Social Media**: TikTok and Instagram embed scripts

## Development Setup

This is a static website that can be served directly from any web server. No build process or package manager is required.

### Local Development
To run locally, simply open `index.html` in a browser or serve it using any static file server:
- Python: `python -m http.server 8000`
- Node.js: `npx serve .`
- Live Server (VS Code extension)

### Google Apps Script Setup
1. Create Google Apps Script project
2. Enable Gmail API in Services
3. Deploy as web app with public access
4. Update `apps-script-config.js` with deployment URL

## Architecture

### CSS Architecture - Código Organizado ✅

El CSS ha sido completamente reorganizado y optimizado:

#### **📁 Estructura de Archivos CSS**
- **`css/styles.css`** - Estilos base, animaciones, variables CSS (320 líneas)
- **`css/components.css`** - Sistemas completos: MacBook + Phone + Notebook (1,341 líneas) 
- **`css/mobile-gaming.css`** - Sistema gaming móvil y landscape (700 líneas)
- **`css/responsive.css`** - Responsive general del sitio (974 líneas)
- **`css/safari-fix.css`** - Fixes específicos Safari (64 líneas)

#### **🧹 Limpieza Realizada**
- **Eliminado código duplicado** - Se removieron +500 líneas redundantes
- **Reorganizada estructura** - Tabla de contenidos clara en cada archivo
- **Comentarios descriptivos** - Secciones bien documentadas
- **Media queries consolidadas** - Mejor organización responsive
- **Backups creados** - `components-backup.css` y `mobile-gaming-backup.css`

#### **📋 Tabla de Contenidos CSS**

**components.css:**
1. Variables y Configuración Base
2. Estilos Base del MacBook
3. Sistema de Contenido del MacBook
4. Sistema Responsive - Desktop
5. Sistema Responsive - Tablet
6. Sistema Responsive - Móvil Portrait
7. Sistema Responsive - Móvil Landscape
8. Animaciones y Efectos (floating phones, breathing, etc.)
9. Sistema Phone Mockup (Dynamic Island, botones físicos)
9.1. Estilos de Botones Críticos (on-dark-bg, efectos hover)
10. Sistema Notebook Legacy (frame PNG, posicionamiento)
11. Utilidades y Helpers (optimización rendimiento)

**mobile-gaming.css:**
1. Reset Desktop - Layout Original
2. Sistema Mobile Gaming - Layout Compacto
3. Secciones Específicas - Veterinarios
4. Secciones Específicas - Clínicas
5. Secciones Específicas - Empresas
6. Área de Descripción Gaming
7. Optimizaciones Landscape Móvil
8. Utilidades y Helpers

### Single Page Application with Modular Architecture
The website is structured as a single-page application with the following main sections:
- **Navigation**: Fixed header with smooth scrolling and mobile hamburger menu
- **Hero section** (#inicio): App download buttons and floating phone mockups
- **Tutores section** (#tutores): Phone mockup with interactive carousel
- **Veterinarios section** (#veterinarios): MacBook Air mockup with professional interface
- **Clínicas section** (#clinicas): MacBook Air mockup with business features
- **Empresas section** (#empresas): MacBook Air mockup with corporate solutions
- **About section** (#about): Team and company information
- **Contact section** (#contacto): Contact forms and information
- **Booking section** (#agenda): Complete appointment system (legacy)

### Booking System Features
- **Multi-step form**: Tutor info → Service selection → Date/time selection
- **Real-time availability**: Integrated with Google Calendar
- **Professional interface**: RedSalud-style design
- **Email confirmations**: Automatic professional emails
- **Mobile optimized**: Touch-friendly with compressed time slots
- **Security integrated**: Input validation and sanitization

### CSS Architecture
- Custom CSS variables for brand colors (vet-orange, vet-brown, etc.)
- Tailwind utility classes for layout and styling
- Custom animations (float, fade-in-up) defined in styles.css
- Responsive design with mobile-first approach
- Security-optimized scrollbars and interactions

### JavaScript Modules
- `script.js`: Main navigation, smooth scrolling, and **mobile description system**
- `component-loader.js`: **Modular component loading system** with caching and auto-initialization
- `components/carousel.js`: **Interactive carousel controller** for mockup sections
- `social-feed.js`: TikTok and Instagram feed integration using embeds
- `booking-simple.js`: Complete booking system with calendar integration
- `apps-script-api.js`: Google Apps Script communication with rate limiting
- `security.js`: Comprehensive security management system

### Security System
- **Input Sanitization**: All user inputs cleaned automatically
- **Rate Limiting**: 10 requests per minute protection
- **XSS Protection**: Content Security Policy + input filtering
- **Data Obfuscation**: Sensitive URLs encoded in Base64
- **Console Protection**: Disabled in production
- **DevTools Detection**: Monitoring for development tools
- **Secure Logging**: Sensitive data masked in logs

### Key Components
- **Modular Component System**: HTML components loaded dynamically with `component-loader.js`
- **Interactive Mockups**: MacBook Air and phone mockups with realistic 3D effects
- **Carousel System**: Interactive content switching with button navigation
- **Mobile Description System**: Dynamic content updates for mobile users
- **Gaming-Style Mobile Layout**: Compact square buttons (50x50px) for mobile interaction
- **Responsive MacBook Design**: Consistent scaling and proportions across all sections
- **Navigation**: Fixed header with smooth scrolling navigation and mobile hamburger menu
- **Booking System**: Multi-step appointment scheduling with Google Calendar
- **Email System**: Professional confirmation emails with clinic branding
- **Social Feed Manager**: Class-based approach for managing social media embeds
- **Security Manager**: Comprehensive protection against common attacks

## Modern UI/UX Features (Recent Updates)

### MacBook Air Mockups
**Professional Design System:**
- **Realistic proportions**: 16:10 aspect ratio matching real MacBook Air
- **Aluminum styling**: Gradient backgrounds and metallic effects
- **3D transforms**: Subtle rotation (rotateX 5deg) and floating animations
- **Consistent sizing**: Max-width 32rem with responsive scaling
- **Performance optimized**: CSS transforms and GPU acceleration

**Implementation:**
- Used in veterinarios, clínicas, and empresas sections
- `.laptop-mockup` and `.laptop` CSS classes
- Responsive behavior across all screen sizes
- `aspect-ratio: 16/10` prevents stretching

### Gaming-Style Mobile Layout
**Mobile-First Button Design:**
- **Compact navigation**: 50x50px square buttons arranged around MacBook
- **Button positioning**: Above and below mockup for optimal thumb reach
- **Gaming aesthetic**: Modern, touch-friendly interface
- **Responsive grid**: Flexbox layout adapting to screen sizes

**CSS Implementation:**
```css
section#veterinarios .order-2.lg\:order-1 .phone-nav-button {
    min-height: 50px !important;
    max-height: 50px !important;
    width: 50px !important;
}
```

### Interactive Carousel System
**Dynamic Content Switching:**
- **Button-driven navigation**: Click buttons to change mockup content
- **Smooth transitions**: CSS transitions between content states
- **Auto-initialization**: Automatic setup when components load
- **Cross-section support**: Works in tutores, veterinarios, clínicas, empresas

**JavaScript Controller:**
- `CarouselController` class in `carousel.js`
- Automatic detection of content areas and navigation buttons
- Event delegation for performance
- Debug utilities for development

### Mobile Description System
**Context-Aware Content:**
- **Dynamic updates**: Description changes based on selected button
- **Icon synchronization**: SVG icons update with content
- **Smooth animations**: Scale effects during transitions
- **Section detection**: Automatic section identification (tutores, vets, clinics, empresas)

**Data Structure:**
```javascript
const descriptions = {
    'empItem1': {
        title: 'Convenios corporativos',
        description: 'Ofrece atención veterinaria...',
        icon: `<path stroke-linecap="round"...>`
    }
};
```

### Section-Specific Design Systems

#### Tutores Section (Light Background)
- **Phone mockup**: Realistic iPhone-style design
- **Button style**: Standard light theme with teal accents
- **Content**: Real app interface screenshots
- **Target audience**: Pet owners and individual users

#### Veterinarios Section (Teal Background)
- **MacBook mockup**: Professional laptop interface
- **Button style**: White background with `on-dark-bg` class for contrast
- **Content**: Professional tools and scheduling features
- **Target audience**: Individual veterinarians and professionals

#### Clínicas Section (White Background) 
- **MacBook mockup**: Business-focused interface
- **Button style**: Standard light theme
- **Content**: Business management and client acquisition tools
- **Target audience**: Clinic owners and veterinary businesses

#### Empresas Section (Teal Background)
- **MacBook mockup**: Corporate interface design
- **Button style**: White background with `on-dark-bg` class for contrast
- **Content**: Corporate benefits and HR solutions
- **Target audience**: Companies and HR departments

### Responsive Design Philosophy

**Mobile-First Approach:**
- Gaming-style compact buttons for touch interfaces
- Optimized thumb zones for one-handed use
- Simplified layouts with clear hierarchy
- Performance-optimized interactions

**Desktop Enhancement:**
- Full feature sets with detailed descriptions
- Hover effects and micro-interactions
- Professional business aesthetics
- High-fidelity mockup presentations

**Cross-Platform Consistency:**
- Identical content across all devices
- Consistent branding and color schemes
- Unified component architecture
- Seamless responsive transitions

## Accessibility & Contrast Standards

### Button States System
**Active Button Styling:**
- **Light backgrounds**: `background: rgba(78, 205, 196, 0.1)` with teal border
- **Dark backgrounds**: `background: rgba(255, 255, 255, 0.95)` with white background
- **Controlled by**: `.on-dark-bg` class for proper contrast

**Implementation Example:**
```css
.phone-nav-button.active {
    background: rgba(78, 205, 196, 0.1);
    border-color: #4ECDC4 !important;
}

.phone-nav-button.active.on-dark-bg {
    background: rgba(255, 255, 255, 0.95) !important;
    border-color: #4ECDC4 !important;
}
```

### Mobile Description Contrast
**Section-Specific Styling:**
- **Standard sections**: White background with dark text
- **Teal sections** (empresas): Enhanced contrast with white background over teal
- **Icon backgrounds**: Teal with white icons for optimal visibility

**Critical CSS:**
```css
section#empresas .description-area {
    background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%) !important;
    color: #1f2937 !important;
}

section#empresas .description-area h4 {
    color: #1f2937 !important;
}

section#empresas .description-area p {
    color: #4b5563 !important;
}
```

## Email Confirmation System

### Setup Requirements
1. **Gmail API Enabled**: In Google Apps Script → Services → Gmail API
2. **Email Functions**: Use fixed versions from `Code-EmailFixed.gs`
3. **Testing**: Execute `testEmailFixed` with real email

### Email Template Features
- Professional HTML design with clinic branding
- Orange/brown color scheme matching website
- Complete appointment details and instructions
- WhatsApp contact integration
- Mobile-responsive design
- Automatic sending after appointment creation

### Safe Email Function Updates
**IMPORTANT**: Only replace these 3 functions in Google Apps Script, don't replace entire file:

1. **sendConfirmationEmail()** - Main email sending function
2. **createEmailTemplate()** - HTML template generator  
3. **testEmailFixed()** - Testing function (add new)

**DO NOT** replace other functions as it will break the booking system.

### Email Troubleshooting
**Common Issues & Solutions:**

1. **Gmail API not enabled**:
   - Solution: Apps Script → Services → ➕ → Gmail API → Add

2. **Email test failing**:
   - Check: Gmail API in Services list
   - Update: Email address in testEmailFixed function
   - Verify: Proper authorization when running test

3. **Email functions to replace safely**:
   ```javascript
   // Replace ONLY these 3 functions:
   function sendConfirmationEmail(appointmentData, consultation, startDateTime) {
     // Use fixed version from Code-EmailFixed.gs
   }
   
   function createEmailTemplate(data) {
     // Use simplified template from Code-EmailFixed.gs  
   }
   
   function testEmailFixed() {
     // Add this new testing function
   }
   ```

4. **Testing procedure**:
   - Change email in testEmailFixed to real address
   - Execute testEmailFixed function
   - Authorize Gmail permissions if prompted
   - Check execution logs for success/error
   - Verify email received in inbox

## Customization Notes

### Brand Colors
- Primary Orange: `#ff9500` (vet-orange)
- Light Orange: `#ffb347` (vet-orange-light)
- Brown: `#8B4513` (vet-brown)
- Gray: `#f8f9fa` (vet-gray)

### Booking System Configuration
- **Clinic Hours**: Monday-Friday 10:30-19:00, Saturday 10:30-14:00, Sunday closed
- **Consultation Types**: General (30 min), Endocrinology (60 min)
- **Calendar Integration**: Real-time sync with Google Calendar
- **Professional**: Dra. Javiera Solis Larenas

### Social Media Integration
The `SocialFeedManager` class in `social-feed.js` handles embedding TikTok videos and Instagram posts. Currently configured for manual embed management but includes API integration options.

## File Modification Guidelines

### Core Files
- **index.html**: Main content structure and sections
- **css/styles.css**: Custom animations and brand-specific styling
- **js/script.js**: Navigation behavior and interactive elements
- **js/booking-simple.js**: Booking system logic (handle with care)
- **js/security.js**: Security system (production-critical)

### Configuration Files
- **config/apps-script-config.js**: Production Apps Script URL (functional)
- **config/google-config.example.js**: Template for API credentials
- **google-apps-script/Code.gs**: Backend logic (modify carefully)

### Development Files
- Templates and examples provided for safe development
- Documentation files for setup and troubleshooting
- Error pages for production deployment

## Security Considerations

### Production Security Level: HIGH
- **Transport**: HTTPS + HSTS forced
- **Headers**: Complete CSP + security headers
- **Validation**: Input sanitization + Chilean phone validation  
- **Rate Limiting**: Client-side protection active
- **Data Protection**: URLs obfuscated, sensitive data masked
- **Monitoring**: CSP violations + security events tracked

### Sensitive Files (.gitignore protected)
- Debug logs and development files
- Private configuration templates
- Workspace and IDE configurations
- Any files containing credentials

## Vercel Optimizations

This project has been optimized for deployment on Vercel with the following enhancements:

### Performance Optimizations
- **Resource Loading**: Critical CSS and fonts preloaded, non-critical resources loaded asynchronously
- **Lazy Loading**: Instagram embeds load only when the section becomes visible
- **JavaScript Optimization**: Scripts deferred and social media scripts loaded on-demand
- **Caching Headers**: Configured in `vercel.json` for optimal asset caching
- **GPU Acceleration**: Animations optimized with CSS transforms and will-change properties

### SEO Enhancements
- **Meta Tags**: Comprehensive Open Graph, Twitter Card, and SEO meta tags
- **Structured Data**: JSON-LD schema markup for local business
- **Sitemap**: XML sitemap with proper priorities and change frequencies
- **Robots.txt**: Search engine crawler directives
- **Canonical URLs**: Proper canonical link structure

### Security Headers (Enhanced)
- **Content-Security-Policy**: Complete XSS protection
- **Strict-Transport-Security**: HTTPS enforcement
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Blocks unnecessary browser APIs

### Local SEO Optimizations

This project has been heavily optimized for local search in Iquique, Chile:

#### **Geographic Targeting**
- **Primary Location**: Iquique, Región de Tarapacá, Chile
- **GPS Coordinates**: -20.2208, -70.1431 (precise location)
- **Service Area**: 50km radius from Iquique
- **Address**: Avenida Salvador Allende #3638, Iquique

#### **Local Keywords Strategy**
- **Primary**: "veterinaria iquique", "veterinario iquique"
- **Secondary**: "clínica veterinaria iquique", "mascotas iquique"
- **Long-tail**: "dra javiera solis iquique", "emergencias veterinarias iquique"
- **Regional**: "veterinaria región tarapacá", "salvador allende iquique"

## Production Deployment

### Status: PRODUCTION READY ✅
- **Booking System**: Fully functional with Google Calendar integration
- **Email Confirmations**: Professional automated emails
- **Security**: High-level protection implemented
- **Performance**: Optimized for Vercel deployment
- **SEO**: Local search optimized for Iquique

### Deployment Checklist
- ✅ Google Apps Script deployed and functional
- ✅ Gmail API enabled for email confirmations
- ✅ Security headers configured in vercel.json
- ✅ Error pages created and tested
- ✅ Local SEO meta tags implemented
- ✅ Performance optimizations active

### Post-Deployment
- Monitor booking system functionality
- Track email delivery success rates
- Review security logs for any violations
- Monitor Core Web Vitals performance

## Troubleshooting

### Booking System Issues
1. Check Google Apps Script deployment status
2. Verify Calendar API permissions
3. Test with `testBasico()` function in Apps Script

### Email System Issues  
1. Ensure Gmail API is enabled in Services
2. Use fixed email functions from `Code-EmailFixed.gs`
3. Test with `testEmailFixed()` function
4. Check email delivery in Gmail sent folder

### Security Concerns
- All sensitive data is protected via .gitignore
- URLs are obfuscated in production
- Rate limiting prevents abuse
- CSP headers block malicious scripts

## Important Notes

### ⚠️ Critical Functions - Handle with Care
- **booking-simple.js**: Core booking logic, test thoroughly after changes
- **apps-script-api.js**: Calendar integration, changes affect booking
- **security.js**: Production security, modifications need careful testing
- **component-loader.js**: Core modular loading system, affects entire site
- **carousel.js**: Interactive functionality across multiple sections

### ✅ Safe to Modify
- Component HTML files in `/components/` directory
- CSS styling in all CSS files (with testing)
- Mobile responsive rules in `mobile-gaming.css`
- Email templates (following provided structure)
- Documentation and configuration examples

### 🔧 Development vs Production
- Use templates (.example files) for development
- Production URLs and configurations are functional
- Security system adapts based on environment detection
- Component loading optimized for production caching

## Development Best Practices (Updated)

### Component Architecture
**Modular HTML Components:**
- Each section is a separate HTML file in `/components/`
- Use `component-loader.js` for dynamic loading
- Consistent naming: `section-name.html`
- Auto-initialization with `loadUbivetComponents()`

### CSS Organization
**File Structure:**
- `styles.css`: Base styles and animations
- `components.css`: Component-specific styles (mockups, carousels)
- `responsive.css`: General responsive rules
- `mobile-gaming.css`: Mobile-specific gaming layout
- `safari-fix.css`: Browser compatibility fixes

### JavaScript Architecture
**Event-Driven System:**
- Use event delegation for performance
- Component loading triggers automatic carousel setup
- Description system auto-detects section context
- Debug utilities available for development

### Mobile-First Responsive Design
**Key Principles:**
1. **Gaming-style mobile layout**: 50x50px compact buttons
2. **Section-specific responsive rules**: Each section has custom mobile behavior
3. **Contrast-aware styling**: Automatic light/dark theme detection
4. **Performance optimization**: CSS transforms and GPU acceleration

### MacBook Mockup System
**Implementation Standards:**
- **Aspect ratio**: Always maintain 16:10 ratio
- **Max-width**: 32rem for consistent sizing
- **Transform origin**: Center for proper scaling
- **Animation**: Subtle floating effect with `laptopFloat` keyframes

**CSS Pattern:**
```css
.laptop-mockup {
    max-width: 32rem !important;
    perspective: 1200px;
}

.laptop {
    transform: rotateX(5deg);
    animation: laptopFloat 6s ease-in-out infinite;
}

.laptop__screen {
    aspect-ratio: 16/10;
    margin: 0 3% 2px 1%;
}
```

### Button State Management
**Contrast System:**
- Use `.on-dark-bg` class for teal background sections
- Automatic JavaScript section detection
- Consistent active states across all sections
- Mobile and desktop compatibility

**Testing Checklist:**
1. ✅ Button contrast on all backgrounds
2. ✅ Mobile description updates correctly  
3. ✅ Carousel navigation functional
4. ✅ Responsive layouts work across devices
5. ✅ Component loading completes successfully
- Production URLs and configurations are functional
- Security system adapts based on environment detection

## Contact Information

**Clínica Veterinaria Tarapacá**
- **Address**: Av. Salvador Allende #3638, Iquique, Chile  
- **Phone**: +56 9 5322 3402
- **Director**: Dra. Javiera Solis Larenas
- **Services**: General Consultation, Endocrinology

---

**This is a complete, production-ready veterinary clinic website with advanced booking capabilities and professional email confirmations.**