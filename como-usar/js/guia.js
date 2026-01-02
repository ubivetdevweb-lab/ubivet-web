/**
 * UBIVET - GUÍA DE USO
 * JavaScript para navegación y interactividad
 */

// ===== TAB SWITCHING =====
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab and content
    const selectedButton = document.getElementById(`tab-${tabName}`);
    const selectedContent = document.getElementById(`content-${tabName}`);

    if (selectedButton && selectedContent) {
        selectedButton.classList.add('active');
        selectedContent.classList.add('active');

        // Scroll to top smoothly on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }

        // Update URL without reload (for sharing)
        if (history.pushState) {
            const newUrl = `${window.location.pathname}?tab=${tabName}`;
            history.pushState({ tab: tabName }, '', newUrl);
        }

        // Log analytics event (if you have analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'tab_switch', {
                'tab_name': tabName
            });
        }
    }
}

// ===== FAQ TOGGLE =====
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');

    // Close all other FAQs (accordion behavior)
    document.querySelectorAll('.faq-question').forEach(btn => {
        if (btn !== button) {
            btn.classList.remove('active');
            btn.closest('.faq-item').querySelector('.faq-answer').classList.remove('active');
        }
    });

    // Toggle current FAQ
    if (isActive) {
        button.classList.remove('active');
        answer.classList.remove('active');
    } else {
        button.classList.add('active');
        answer.classList.add('active');

        // Scroll to question on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                button.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    }

    // Log analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_toggle', {
            'question': button.textContent.trim(),
            'action': isActive ? 'close' : 'open'
        });
    }
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Guía Ubivet inicializada');

    // Check for tab parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');

    if (tabParam && ['tutores', 'veterinarios', 'clinicas'].includes(tabParam)) {
        switchTab(tabParam);
    } else {
        // Default to tutores tab
        switchTab('tutores');
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.tab) {
            switchTab(event.state.tab);
        }
    });

    // Add smooth scroll to internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy load images if needed (optimization)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Track scroll depth for analytics
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments
            if (typeof gtag !== 'undefined' && [25, 50, 75, 100].includes(maxScroll)) {
                gtag('event', 'scroll_depth', {
                    'percent': maxScroll
                });
            }
        }
    }, 1000));
});

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to clipboard (useful for sharing links)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('¡Enlace copiado!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('¡Enlace copiado!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Simple toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        animation: slideUp 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Add CSS animation for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }
`;
document.head.appendChild(style);

// ===== SHARE FUNCTIONALITY =====
function shareGuide(tabName) {
    const shareData = {
        title: 'Cómo usar Ubivet',
        text: `Aprende a usar Ubivet - Guía para ${tabName}`,
        url: `${window.location.origin}${window.location.pathname}?tab=${tabName}`
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch(err => console.log('Error sharing:', err));
    } else {
        copyToClipboard(shareData.url);
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Arrow keys for tab navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const tabs = ['tutores', 'veterinarios', 'clinicas'];
        const activeTabBtn = document.querySelector('.tab-button.active');
        if (!activeTabBtn) return;

        const currentIndex = tabs.findIndex(tab =>
            activeTabBtn.id === `tab-${tab}`
        );

        if (currentIndex === -1) return;

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }

        switchTab(tabs[newIndex]);
        document.getElementById(`tab-${tabs[newIndex]}`).focus();
    }
});

// ===== MOBILE MENU ENHANCEMENT =====
if (window.innerWidth < 768) {
    // Add touch-friendly enhancements for mobile
    document.querySelectorAll('.step-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn('Long task detected:', entry);
            }
        }
    });

    observer.observe({ entryTypes: ['longtask'] });
}

// ===== EXPORT FOR CONSOLE DEBUGGING =====
window.ubivetGuide = {
    switchTab,
    toggleFaq,
    shareGuide,
    copyToClipboard,
    version: '1.0.0'
};

console.log('💡 Debug helpers available: window.ubivetGuide');
