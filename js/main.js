document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
        });

        // Close mobile menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Smooth Scrolling için yardımcı fonksiyon
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing fonksiyonu (easeInOutQuart)
        const ease = progress < 0.5
            ? 8 * progress * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;

        window.scrollTo(0, start + (distance * ease));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Tüm anchor linkler için smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            smoothScrollTo(targetPosition, 1200); // 1.2 saniye sürecek
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Mesajınız başarıyla gönderildi!');
        contactForm.reset();
    });
}

// Scroll Animation
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth scroll for scroll indicator
const scrollIndicator = document.querySelector('#scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector('#about');
        const startPosition = window.pageYOffset;
        const targetPosition = targetSection.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 saniye
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function (easeInOutCubic)
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Mouse parallax effect for hero section
    const hero = document.querySelector('.hero-banner');
    const title = document.querySelector('.banner-content h1');
    const text = document.querySelector('.banner-content p');
    const buttons = document.querySelector('.hero-buttons');

    // Only add parallax effect if hero section exists (index page)
    if (hero && title && text && buttons) {
        hero.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        title.style.transform = `translateZ(50px) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        text.style.transform = `translateZ(30px) rotateY(${xAxis * 0.5}deg) rotateX(${-yAxis * 0.5}deg)`;
        buttons.style.transform = `translateZ(20px) rotateY(${xAxis * 0.3}deg) rotateX(${-yAxis * 0.3}deg)`;
    });

        hero.addEventListener('mouseenter', () => {
        hero.style.transition = 'none';
        title.style.transition = 'none';
        text.style.transition = 'none';
        buttons.style.transition = 'none';
    });

        hero.addEventListener('mouseleave', () => {
        hero.style.transition = 'all 0.5s ease';
        title.style.transition = 'all 0.5s ease';
        text.style.transition = 'all 0.5s ease';
        buttons.style.transition = 'all 0.5s ease';

        title.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        text.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        buttons.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        });

        // Add glitch effect to title
        const titleText = title.textContent;
        title.setAttribute('data-text', titleText);
    }

    // Existing smooth scroll code
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

    // Rest of your existing code...
});

