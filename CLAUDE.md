# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a veterinary clinic website for "Clínica Veterinaria Tarapacá" built as a static website using HTML, CSS, and JavaScript. The site is a single-page application with modern design elements, social media integration, and a complete booking system with email confirmations.

## Project Structure

```
veterinaria tarapaca/
├── index.html                      # Main HTML file (single-page application)
├── css/
│   └── styles.css                 # Custom CSS styles and animations
├── js/
│   ├── script.js                  # Main JavaScript for navigation and interactions
│   ├── social-feed.js             # Social media feed integration (TikTok/Instagram)
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

### Single Page Application with Booking System
The website is structured as a single-page application with the following main sections:
- Header with navigation
- Hero section (#inicio) with clinic front photo
- Services section (#servicios)
- Team section (#equipo) 
- **Booking section (#agenda)** - Complete appointment system
- TikTok feed (#tiktok)
- Instagram feed (#instagram)
- Contact section (#contacto)

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
- `script.js`: Handles mobile navigation, menu toggles, and smooth scrolling
- `social-feed.js`: Manages TikTok and Instagram feed integration using embeds
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
- **Navigation**: Fixed header with smooth scrolling navigation and mobile hamburger menu
- **Booking System**: Multi-step appointment scheduling with Google Calendar
- **Email System**: Professional confirmation emails with clinic branding
- **Social Feed Manager**: Class-based approach for managing social media embeds
- **Security Manager**: Comprehensive protection against common attacks
- **Responsive Design**: Mobile-first with custom breakpoints

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

### ✅ Safe to Modify
- Templates and styling in CSS/HTML
- Email templates (following provided structure)
- Documentation and configuration examples

### 🔧 Development vs Production
- Use templates (.example files) for development
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