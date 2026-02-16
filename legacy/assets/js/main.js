// Hero Slider
document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.getElementById('heroSliderDots');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    let currentHeroSlide = 0;

    if (heroSlides.length > 0 && heroDots) {
        // Create dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'hero-slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToHeroSlide(index));
            heroDots.appendChild(dot);
        });

        const dots = heroDots.querySelectorAll('.hero-slider-dot');

        function updateHeroSlider() {
            heroSlides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentHeroSlide);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentHeroSlide);
            });
        }

        function goToHeroSlide(index) {
            currentHeroSlide = index;
            updateHeroSlider();
        }

        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            updateHeroSlider();
        }

        function prevHeroSlide() {
            currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
            updateHeroSlider();
        }

        if (heroNextBtn) heroNextBtn.addEventListener('click', nextHeroSlide);
        if (heroPrevBtn) heroPrevBtn.addEventListener('click', prevHeroSlide);

        // Auto-play slider
        let heroAutoPlay = setInterval(nextHeroSlide, 5000);

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(heroAutoPlay));
            heroSection.addEventListener('mouseleave', () => {
                heroAutoPlay = setInterval(nextHeroSlide, 5000);
            });
        }

        // Touch/swipe support
        let heroStartX = 0;
        let heroStartY = 0;
        let heroIsDragging = false;

        if (heroSection) {
            heroSection.addEventListener('touchstart', (e) => {
                heroStartX = e.touches[0].clientX;
                heroStartY = e.touches[0].clientY;
                heroIsDragging = true;
                clearInterval(heroAutoPlay);
            }, { passive: true }); // Use passive listener for better performance

            heroSection.addEventListener('touchmove', (e) => {
                if (!heroIsDragging) return;

                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = heroStartX - currentX;
                const diffY = heroStartY - currentY;

                // Only prevent default if horizontal swipe is dominant
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }
            }, { passive: false }); // Non-passive to allow preventDefault

            heroSection.addEventListener('touchend', (e) => {
                if (!heroIsDragging) return;
                heroIsDragging = false;
                const endX = e.changedTouches[0].clientX;
                const diff = heroStartX - endX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextHeroSlide();
                    } else {
                        prevHeroSlide();
                    }
                }

                heroAutoPlay = setInterval(nextHeroSlide, 5000);
            });
        }
    }
});

// Header scroll effect
const mainHeader = document.querySelector('.main-header');
if (mainHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

const menuClose = document.getElementById('menuClose');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling with pack parameter handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const hashIndex = href.indexOf('#');
        const questionIndex = href.indexOf('?');

        if (hashIndex !== -1) {
            e.preventDefault();
            const hash = href.substring(hashIndex + 1, questionIndex !== -1 ? questionIndex : href.length);
            const target = document.querySelector('#' + hash);

            if (target) {
                // Extract pack or service parameter if present
                if (questionIndex !== -1) {
                    const params = new URLSearchParams(href.substring(questionIndex + 1));
                    const pack = params.get('pack');
                    const service = params.get('service');

                    // Store pack or service in sessionStorage for after scroll
                    if (pack) {
                        sessionStorage.setItem('selectedPack', pack);
                    }
                    if (service) {
                        sessionStorage.setItem('selectedService', service);
                    }
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Wait for scroll to complete, then set pack or service
                setTimeout(() => {
                    const storedPack = sessionStorage.getItem('selectedPack');
                    const storedService = sessionStorage.getItem('selectedService');
                    if (storedPack) {
                        setPackInForm(storedPack);
                        sessionStorage.removeItem('selectedPack');
                    }
                    if (storedService) {
                        setServiceInForm(storedService);
                        sessionStorage.removeItem('selectedService');
                    }
                }, 800);
            }
        }
    });
});

// Function to set pack in form
function setPackInForm(packValue) {
    const servicePackSelect = document.getElementById('service_pack');
    if (servicePackSelect) {
        // Find the option in the pack optgroup that matches the pack number
        // The packValue is like "pack_1", "pack_2", etc.
        const packOptgroup = servicePackSelect.querySelector('optgroup[label*="Pack"]') ||
            servicePackSelect.querySelector('optgroup[label*="pack"]') ||
            servicePackSelect.querySelector('optgroup[label*="حزمة"]');

        if (packOptgroup) {
            const options = packOptgroup.querySelectorAll('option');
            // Find option by index (pack_1 = first option, pack_2 = second, etc.)
            const packIndex = parseInt(packValue.replace('pack_', '')) - 1;

            if (options[packIndex]) {
                servicePackSelect.value = options[packIndex].value;
                // Trigger change event
                servicePackSelect.dispatchEvent(new Event('change', { bubbles: true }));

                // Add visual feedback
                servicePackSelect.style.borderColor = 'var(--primary-color)';
                servicePackSelect.style.boxShadow = '0 0 0 3px rgba(26, 95, 122, 0.2)';
                servicePackSelect.style.transition = 'all 0.3s';
                servicePackSelect.style.backgroundColor = '#f0f8ff';

                // Scroll to select if needed
                servicePackSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    servicePackSelect.style.borderColor = '';
                    servicePackSelect.style.boxShadow = '';
                    servicePackSelect.style.backgroundColor = '';
                }, 3000);
            }
        }
    }
}

// Function to set service in form
function setServiceInForm(serviceValue) {
    const servicePackSelect = document.getElementById('service_pack');
    if (servicePackSelect) {
        // Find the first optgroup (which should be the services group)
        const optgroups = servicePackSelect.querySelectorAll('optgroup');
        let serviceOptgroup = null;

        // The first optgroup is usually the services group
        if (optgroups.length > 0) {
            serviceOptgroup = optgroups[0];
        }

        if (serviceOptgroup) {
            const options = serviceOptgroup.querySelectorAll('option');
            // Find option by index (service_1 = first option, service_2 = second, etc.)
            const serviceIndex = parseInt(serviceValue.replace('service_', '')) - 1;

            if (options[serviceIndex]) {
                servicePackSelect.value = options[serviceIndex].value;
                // Trigger change event
                servicePackSelect.dispatchEvent(new Event('change', { bubbles: true }));

                // Add visual feedback
                servicePackSelect.style.borderColor = 'var(--primary-color)';
                servicePackSelect.style.boxShadow = '0 0 0 3px rgba(26, 95, 122, 0.2)';
                servicePackSelect.style.transition = 'all 0.3s';
                servicePackSelect.style.backgroundColor = '#f0f8ff';

                // Scroll to select if needed
                servicePackSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    servicePackSelect.style.borderColor = '';
                    servicePackSelect.style.boxShadow = '';
                    servicePackSelect.style.backgroundColor = '';
                }, 3000);
            }
        }
    }
}

// Check URL on page load for pack or service parameter
document.addEventListener('DOMContentLoaded', () => {
    // Check hash for pack or service parameter
    const hash = window.location.hash;
    if (hash && hash.includes('?')) {
        const hashParts = hash.split('?');
        const params = new URLSearchParams(hashParts[1]);
        const pack = params.get('pack');
        const service = params.get('service');

        if (pack) {
            // Wait a bit for the form to be ready
            setTimeout(() => {
                setPackInForm(pack);
            }, 500);
        }
        if (service) {
            setTimeout(() => {
                setServiceInForm(service);
            }, 500);
        }
    }

    // Also check regular query string
    const urlParams = new URLSearchParams(window.location.search);
    const pack = urlParams.get('pack');
    const service = urlParams.get('service');
    if (pack) {
        setTimeout(() => {
            setPackInForm(pack);
        }, 500);
    }
    if (service) {
        setTimeout(() => {
            setServiceInForm(service);
        }, 500);
    }
});

// Show/Hide messages
document.addEventListener('DOMContentLoaded', () => {
    // Check for success/error messages in URL
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const error = urlParams.get('error');

    if (message || error) {
        const messageDiv = document.createElement('div');
        messageDiv.className = error ? 'alert alert-error' : 'alert alert-success';
        messageDiv.textContent = message || error;
        document.body.insertBefore(messageDiv, document.body.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });

        // Email validation
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#dc3545';
            }
        }

        if (!isValid) {
            e.preventDefault();
            alert('Veuillez remplir tous les champs correctement.');
        }
    });
}

// Scroll to top functionality
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s;
`;
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Animate counter if it's a stats box
            const counter = entry.target.querySelector('.stats-counter');
            if (counter) {
                animateCounter(counter);
            }

            // Don't observe again once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            // Add + sign when animation completes
            element.textContent = formatNumber(target) + '+';
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepDuration);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate on scroll elements
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Animate quote-about-wrapper and its children
    const quoteAboutWrapper = document.querySelector('.quote-about-wrapper');
    if (quoteAboutWrapper) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Animate children
                    const quoteColumn = entry.target.querySelector('.quote-column');
                    const aboutColumn = entry.target.querySelector('.about-column');
                    if (quoteColumn) quoteColumn.classList.add('animated');
                    if (aboutColumn) aboutColumn.classList.add('animated');
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        quoteObserver.observe(quoteAboutWrapper);
    }

    // Animate cards with staggered effect
    const cardElements = document.querySelectorAll('.service-card, .tarif-card, .testimonial-card, .team-card, .step-item, .contact-item');
    cardElements.forEach((el, index) => {
        observer.observe(el);
    });

    // Animate hero elements immediately (no scroll needed)
    const heroTitle = document.querySelector('.hero-text h1');
    const heroText = document.querySelector('.hero-text p');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('animated'), 100);
    }
    if (heroText) {
        setTimeout(() => heroText.classList.add('animated'), 300);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('animated'), 500);
    }
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('212')) {
                value = '+' + value;
            } else if (!value.startsWith('+')) {
                value = '+212' + value;
            }
        }
        e.target.value = value;
    });
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function updateSlider() {
        if (slides.length === 0) return;
        const slideWidth = slides[0].offsetWidth;
        slider.scrollTo({
            left: currentSlide * slideWidth,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Update on resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Initialize slider position
    updateSlider();

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-play slider
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        clearInterval(autoPlayInterval);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        // Only prevent default if horizontal swipe is dominant
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (e.cancelable) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        autoPlayInterval = setInterval(nextSlide, 5000);
    });
});
