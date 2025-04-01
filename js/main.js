// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Mouse parallax effect for hero section
    const hero = document.querySelector('.hero-banner');
    const title = document.querySelector('.banner-content h1');
    const text = document.querySelector('.banner-content p');
    const buttons = document.querySelector('.hero-buttons');

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

        title.style.transform = 'translateZ(50px) rotateY(0) rotateX(0)';
        text.style.transform = 'translateZ(30px) rotateY(0) rotateX(0)';
        buttons.style.transform = 'translateZ(20px) rotateY(0) rotateX(0)';
    });

    // Add glitch effect to title
    const titleText = title.textContent;
    title.setAttribute('data-text', titleText);

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