/* ============================================
   PROFESSIONAL ACADEMIC WEBSITE V5 - JAVASCRIPT
   Apple Liquid Glass Theme
   ============================================ */

(function() {
    'use strict';

    // ========== INITIALIZATION ==========
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollEffects();
        initIntersectionObserver();
        initSmoothScroll();
    });

    // ========== NAVIGATION ==========
    function initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                    
                    // Smooth scroll to section
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    updateActiveNav(targetId);
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
    }

    function updateActiveNav(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            updateActiveNav(`#${current}`);
        }
    }

    // ========== SCROLL EFFECTS ==========
    function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.scrollY;

            // Add scrolled class for styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        }, 100));
    }

    // ========== INTERSECTION OBSERVER ==========
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all glass cards
        const elementsToObserve = document.querySelectorAll(
            '.glass-card, .journey-block, .research-card, .project-card'
        );

        elementsToObserve.forEach((element, index) => {
            // Stagger the animation delay
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // ========== SMOOTH SCROLL ==========
    function initSmoothScroll() {
        // Add smooth scroll behavior to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or already handled by nav
                if (href === '#' || this.classList.contains('nav-link')) {
                    return;
                }
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== UTILITY FUNCTIONS ==========
    
    // Throttle function to limit execution rate
    function throttle(func, wait) {
        let timeout;
        let previous = 0;
        
        return function() {
            const now = Date.now();
            const remaining = wait - (now - previous);
            const context = this;
            const args = arguments;
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(function() {
                    previous = Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, remaining);
            }
        };
    }

    // ========== PERFORMANCE OPTIMIZATION ==========
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize-specific logic here if needed
            updateNavOnScroll();
        }, 250);
    });

    // ========== ACCESSIBILITY ENHANCEMENTS ==========
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
            }
        }
    });

    // ========== CARD HOVER EFFECTS ==========
    
    // Add subtle parallax effect to glass cards on mouse move
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ========== LOADING PERFORMANCE ==========
    
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== PRINT OPTIMIZATION ==========
    
    // Handle print events
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections for printing
        document.querySelectorAll('.glass-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    });

    // ========== ANALYTICS & TRACKING (Optional) ==========
    
    // Track section visibility
    function trackSectionView(sectionId) {
        // Placeholder for analytics tracking
        console.log('Section viewed:', sectionId);
    }

    // ========== SCROLL TO TOP ==========
    
    // Add scroll to top functionality (optional)
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 0, 0, 0.06);
            color: #0071e3;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 999;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', throttle(function() {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.pointerEvents = 'all';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.pointerEvents = 'none';
            }
        }, 100));
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Initialize scroll to top button
    createScrollToTop();

    // ========== CONSOLE MESSAGE ==========
    console.log('%cAcademic Portfolio V5', 'font-size: 20px; font-weight: bold; color: #0071e3;');
    console.log('%cApple Liquid Glass Theme', 'font-size: 14px; color: #6e6e73;');
    console.log('%cDesigned for professional academic presentation', 'font-size: 12px; color: #86868b;');

})();
