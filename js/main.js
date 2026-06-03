// ===============================================
// NORTHEYES ELECTRICAL SERVICES - MAIN JAVASCRIPT
// ===============================================

// ===============================================
// STICKY HEADER ON SCROLL
// ===============================================

const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===============================================
// HAMBURGER MENU TOGGLE
// ===============================================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.mobile-menu a, .nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
});

// ===============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===============================================

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

// ===============================================
// SCROLL-TRIGGERED FADE-IN ANIMATION
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-animate elements
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// ===============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ===============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset previous states
        clearFormErrors();
        const successMessage = document.querySelector('.form-success');
        if (successMessage) {
            successMessage.classList.remove('show');
        }

        // Get form values
        const fullName = document.getElementById('fullName');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const serviceType = document.getElementById('serviceType');
        const message = document.getElementById('message');

        let isValid = true;

        // Validation
        if (!fullName.value.trim()) {
            showError(fullName, 'Full name is required');
            isValid = false;
        }

        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!serviceType.value) {
            showError(serviceType, 'Please select a service type');
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            if (successMessage) {
                successMessage.classList.add('show');
            }
            // Reset form
            contactForm.reset();
            // Scroll to success message
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// Helper: Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper: Validate phone
function validatePhone(phone) {
    // Allow various phone formats
    const re = /^[\d\-\+\(\)\s]{10,}$/;
    return re.test(phone);
}

// Helper: Show form error
function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// Helper: Clear form errors
function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('input.error, textarea.error, select.error').forEach(input => {
        input.classList.remove('error');
    });
}

// ===============================================
// GALLERY & LIGHTBOX
// ===============================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        closeLightbox();
    });
}

// Close lightbox when clicking outside image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Prevent multiple click submissions
function preventDoubleSubmit(button) {
    button.disabled = true;
    setTimeout(() => {
        button.disabled = false;
    }, 2000);
}

console.log('Northeyes Electrical - Website Loaded Successfully');
