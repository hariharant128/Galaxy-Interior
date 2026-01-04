/**
 * Galaxy Interior - Premium Interior Design Agency
 * Main JavaScript File with Motion.dev Animations
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMenu();
    initSmoothScroll();
    initHeroAnimations();
    initScrollAnimations();
    initContactForm();
    initWorksPageAnimations();
});

/**
 * Navbar Module
 * Handles navbar scroll behavior and styling
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    if (!navbar) return;
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Full Screen Menu Module
 * Handles hamburger menu toggle and animations
 */
function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const body = document.body;
    
    if (!hamburger || !fullscreenMenu) return;
    
    // Toggle menu function
    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        // Animate menu links
        if (isActive && typeof Motion !== 'undefined') {
            menuLinks.forEach((link, index) => {
                Motion.animate(link, 
                    { 
                        opacity: [0, 1], 
                        y: [40, 0] 
                    }, 
                    { 
                        duration: 0.6, 
                        delay: 0.1 + (index * 0.08),
                        easing: [0.16, 1, 0.3, 1]
                    }
                );
            });
        }
    };
    
    // Close menu function
    const closeMenu = () => {
        hamburger.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    };
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Smooth Scroll Module
 * Handles smooth scrolling to anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Hero Animations Module
 * Handles entrance animations for hero section
 */
function initHeroAnimations() {
    const heroTagline = document.querySelector('.hero-tagline');
    const titleLines = document.querySelectorAll('.title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    // Check if Motion is available
    if (typeof Motion === 'undefined') {
        console.warn('Motion.dev not loaded');
        // Fallback: show elements without animation
        document.querySelectorAll('.hero-tagline, .title-line, .hero-subtitle, .hero-cta, .hero-scroll-indicator').forEach(el => {
            if (el) el.style.opacity = '1';
        });
        return;
    }
    
    // Animation sequence
    const animateHero = async () => {
        // Animate tagline
        if (heroTagline) {
            Motion.animate(heroTagline, 
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.8, delay: 0.3, easing: [0.16, 1, 0.3, 1] }
            );
        }
        
        // Animate title lines
        titleLines.forEach((line, index) => {
            Motion.animate(line,
                { opacity: [0, 1], y: [60, 0] },
                { 
                    duration: 1, 
                    delay: 0.5 + (index * 0.15),
                    easing: [0.16, 1, 0.3, 1]
                }
            );
        });
        
        // Animate subtitle
        if (heroSubtitle) {
            Motion.animate(heroSubtitle,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.8, delay: 1.1, easing: [0.16, 1, 0.3, 1] }
            );
        }
        
        // Animate CTA
        if (heroCta) {
            Motion.animate(heroCta,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.8, delay: 1.3, easing: [0.16, 1, 0.3, 1] }
            );
        }
        
        // Animate scroll indicator
        if (scrollIndicator) {
            Motion.animate(scrollIndicator,
                { opacity: [0, 1] },
                { duration: 0.8, delay: 1.6, easing: [0.16, 1, 0.3, 1] }
            );
        }
    };
    
    // Start animations
    animateHero();
}

/**
 * Scroll Animations Module
 * Handles reveal animations on scroll using Intersection Observer
 */
function initScrollAnimations() {
    // Check if Motion is available
    if (typeof Motion === 'undefined') {
        // Fallback: show all elements
        document.querySelectorAll('.about-content, .about-images, .service-card, .work-card, .contact-info, .contact-form-wrapper').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }
    
    // Configure observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // Animation configurations for different elements
    const animations = {
        fadeUp: {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            options: { duration: 0.8, easing: [0.16, 1, 0.3, 1] }
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            options: { duration: 0.8, easing: [0.16, 1, 0.3, 1] }
        },
        scaleIn: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            options: { duration: 0.8, easing: [0.16, 1, 0.3, 1] }
        }
    };
    
    // Create observer callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeUp';
                const delay = parseFloat(element.dataset.delay) || 0;
                const config = animations[animationType];
                
                Motion.animate(element,
                    { 
                        opacity: [config.initial.opacity, config.animate.opacity],
                        y: config.initial.y !== undefined ? [config.initial.y, config.animate.y || 0] : undefined,
                        scale: config.initial.scale !== undefined ? [config.initial.scale, config.animate.scale] : undefined
                    },
                    { 
                        ...config.options,
                        delay: delay
                    }
                );
                
                observer.unobserve(element);
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // About section
    const aboutContent = document.querySelector('.about-content');
    const aboutImages = document.querySelector('.about-images');
    
    if (aboutContent) {
        aboutContent.dataset.animation = 'fadeUp';
        observer.observe(aboutContent);
    }
    
    if (aboutImages) {
        aboutImages.dataset.animation = 'fadeUp';
        aboutImages.dataset.delay = '0.2';
        observer.observe(aboutImages);
    }
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.dataset.animation = 'fadeUp';
        card.dataset.delay = (index * 0.1).toString();
        observer.observe(card);
    });
    
    // Work cards
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.dataset.animation = 'fadeUp';
        card.dataset.delay = ((index % 2) * 0.15).toString();
        observer.observe(card);
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-wrapper');
    
    if (contactInfo) {
        contactInfo.dataset.animation = 'fadeUp';
        observer.observe(contactInfo);
    }
    
    if (contactForm) {
        contactForm.dataset.animation = 'fadeUp';
        contactForm.dataset.delay = '0.2';
        observer.observe(contactForm);
    }
    
    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.dataset.animation = 'fadeUp';
        observer.observe(header);
    });
    
    // Section intros
    const sectionIntros = document.querySelectorAll('.section-intro');
    sectionIntros.forEach(intro => {
        intro.dataset.animation = 'fadeUp';
        intro.dataset.delay = '0.1';
        observer.observe(intro);
    });
}

/**
 * Contact Form Module
 * Handles form submission and validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Input focus animations
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (typeof Motion !== 'undefined') {
                Motion.animate(input,
                    { borderColor: ['#404040', '#ffffff'] },
                    { duration: 0.3 }
                );
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value && typeof Motion !== 'undefined') {
                Motion.animate(input,
                    { borderColor: ['#ffffff', '#404040'] },
                    { duration: 0.3 }
                );
            }
        });
    });
}

/**
 * Works Page Animations Module
 * Handles animations specific to the works.html page
 */
function initWorksPageAnimations() {
    const pageTagline = document.querySelector('.page-tagline');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    const ctaTitle = document.querySelector('.cta-title');
    const ctaText = document.querySelector('.cta-text');
    const ctaButton = document.querySelector('.cta-button');
    
    if (!pageTitle) return; // Not on works page
    
    // Check if Motion is available
    if (typeof Motion === 'undefined') {
        // Fallback
        [pageTagline, pageTitle, pageSubtitle].forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        });
        return;
    }
    
    // Page header animations
    if (pageTagline) {
        Motion.animate(pageTagline,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.8, delay: 0.2, easing: [0.16, 1, 0.3, 1] }
        );
    }
    
    if (pageTitle) {
        Motion.animate(pageTitle,
            { opacity: [0, 1], y: [40, 0] },
            { duration: 1, delay: 0.4, easing: [0.16, 1, 0.3, 1] }
        );
    }
    
    if (pageSubtitle) {
        Motion.animate(pageSubtitle,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.8, delay: 0.6, easing: [0.16, 1, 0.3, 1] }
        );
    }
    
    // CTA section animations with observer
    if (ctaTitle || ctaText || ctaButton) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (ctaTitle) {
                        Motion.animate(ctaTitle,
                            { opacity: [0, 1], y: [30, 0] },
                            { duration: 0.8, delay: 0.1, easing: [0.16, 1, 0.3, 1] }
                        );
                    }
                    
                    if (ctaText) {
                        Motion.animate(ctaText,
                            { opacity: [0, 1], y: [20, 0] },
                            { duration: 0.8, delay: 0.2, easing: [0.16, 1, 0.3, 1] }
                        );
                    }
                    
                    if (ctaButton) {
                        Motion.animate(ctaButton,
                            { opacity: [0, 1], y: [20, 0] },
                            { duration: 0.8, delay: 0.3, easing: [0.16, 1, 0.3, 1] }
                        );
                    }
                    
                    ctaObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const ctaSection = document.querySelector('.works-cta-section');
        if (ctaSection) {
            ctaObserver.observe(ctaSection);
        }
    }
}

/**
 * Parallax Effect (Optional Enhancement)
 * Adds subtle parallax to hero background
 */
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    
    if (!heroBg) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        
        heroBg.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
}

// Initialize parallax
initParallax();

/**
 * Cursor Effect (Optional Enhancement)
 * Adds custom cursor for interactive elements
 */
function initCustomCursor() {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyles = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease, opacity 0.15s ease;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: rgba(255, 255, 255, 0.8);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Uncomment to enable custom cursor
// initCustomCursor();
