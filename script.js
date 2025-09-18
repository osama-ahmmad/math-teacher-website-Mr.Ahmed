// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');
        document.querySelectorAll('.faq-answer').forEach(item => item.classList.remove('active'));
        if (!isActive) answer.classList.add('active');
    });
});

// Subject Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        const container = accordionItem.closest('.accordion-container');
        if (container) container.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
        if (!isActive) accordionItem.classList.add('active');
    });
});

// Branch Accordion
document.querySelectorAll('.branch-accordion .accordion-header').forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation();
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        const subjectContainer = accordionItem.closest('.accordion-content');
        if (subjectContainer) subjectContainer.querySelectorAll('.branch-accordion .accordion-item').forEach(item => item.classList.remove('active'));
        if (!isActive) accordionItem.classList.add('active');
    });
});

// Video Lessons Accordion
document.querySelectorAll('.video-lessons-accordion .accordion-header').forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation();
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        const subjectContainer = accordionItem.closest('.accordion-content');
        if (subjectContainer) subjectContainer.querySelectorAll('.video-lessons-accordion .accordion-item').forEach(item => item.classList.remove('active'));
        if (!isActive) accordionItem.classList.add('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Contact form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        const whatsappMessage = `مرحباً أستاذ أحمد،\n\nاسمي: ${name}\nرقم الهاتف: ${phone}\n\nالرسالة: ${message}`;
        const whatsappUrl = `https://wa.me/966501234567?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        alert('سيتم توجيهك إلى الواتساب لإرسال رسالتك');
        this.reset();
    });
}

// Loading animation
document.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        setTimeout(() => { this.innerHTML = originalText; }, 1000);
    });
});

// Scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.contact-card, .testimonial-card, .schedule-card, .resources-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Track clicks
function trackClick(element, action) {
    console.log(`Clicked: ${element} - Action: ${action}`);
}
document.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', () => trackClick('grade-button', btn.textContent.trim()));
});
document.querySelectorAll('.whatsapp-link, .group-btn').forEach(link => {
    link.addEventListener('click', () => trackClick('whatsapp-link', 'contact'));
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Print styles
window.addEventListener('beforeprint', () => {
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
});
window.addEventListener('afterprint', () => {
    document.querySelector('.navbar').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
});

// Video Player
function playVideo(subject, videoId) {
    document.querySelectorAll('.video-player-container').forEach(player => player.style.display = 'none');
    const playerContainer = document.getElementById(`video-player-${subject}`);
    const iframe = document.getElementById(`video-iframe-${subject}`);
    if (playerContainer && iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        playerContainer.style.display = 'block';
        playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function closeVideo(subject) {
    const playerContainer = document.getElementById(`video-player-${subject}`);
    const iframe = document.getElementById(`video-iframe-${subject}`);
    if (playerContainer && iframe) {
        playerContainer.style.display = 'none';
        iframe.src = '';
    }
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('.video-player-container') && !e.target.closest('.watch-btn')) {
        document.querySelectorAll('.video-player-container').forEach(player => player.style.display = 'none');
        document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
    }
});

// Password Protection with Expiry
class PasswordProtection {
    constructor() {
        this.passwords = {
            'first-sec': 'first123',
            'second-sec': 'second123',
            'third-sec': 'third123'
        };
        this.expiryTime = 2 * 24 * 60 * 60 * 1000; // يومين
    }

    setAuth(gradeKey) {
        const now = Date.now();
        const item = { value: true, expiry: now + this.expiryTime };
        localStorage.setItem(`auth_${gradeKey}`, JSON.stringify(item));
    }

    isAuth(gradeKey) {
        const itemStr = localStorage.getItem(`auth_${gradeKey}`);
        if (!itemStr) return false;
        const item = JSON.parse(itemStr);
        const now = Date.now();
        if (now > item.expiry) {
            localStorage.removeItem(`auth_${gradeKey}`);
            return false;
        }
        return item.value === true;
    }

    async showPasswordPrompt(gradeKey) {
        const gradeNames = {
            'first-sec': 'الصف الاول الثانوي',
            'second-sec': 'الصف الثاني الثانوي',
            'third-sec': 'الصف الثالث الثانوي'
        };
        const { value: password } = await Swal.fire({
            title: `دخول ${gradeNames[gradeKey]}`,
            input: 'password',
            inputPlaceholder: 'أدخل كلمة المرور',
            showCancelButton: true,
            confirmButtonText: 'دخول',
            confirmButtonColor: '#667eea',
            cancelButtonText: 'إلغاء',
            inputValidator: (value) => { if (!value) return 'يجب إدخال كلمة المرور!'; },
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        return password;
    }

    verifyPassword(gradeKey, password) {
        return password === this.passwords[gradeKey];
    }

    async authenticate(gradeKey) {
        if (this.isAuth(gradeKey)) return true;
        const password = await this.showPasswordPrompt(gradeKey);
        if (password === null) return false;
        if (this.verifyPassword(gradeKey, password)) {
            this.setAuth(gradeKey);
            await Swal.fire({
                icon: 'success',
                title: 'تم الدخول بنجاح!',
                timer: 1500,
                showConfirmButton: false
            });
            return true;
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'كلمة مرور خاطئة!',
                timer: 2000,
                showConfirmButton: false
            });
            return false;
        }
    }

    async protectPage(gradeKey) {
        const isAuth = await this.authenticate(gradeKey);
        if (!isAuth) window.location.href = '/index.html';
    }

    async handleGradeLinkClick(gradeKey, event) {
        event.preventDefault();
        const isAuth = await this.authenticate(gradeKey);
        if (isAuth) window.location.href = `/${gradeKey}/index.html`;
    }
}

const passwordProtection = new PasswordProtection();

// Links handling
document.addEventListener('DOMContentLoaded', function() {
    const firstSecBtns = document.querySelectorAll('a[href*="first-sec"]');
    firstSecBtns.forEach(btn => btn.addEventListener('click', (e) => passwordProtection.handleGradeLinkClick('first-sec', e)));

    const secondSecBtns = document.querySelectorAll('a[href*="second-sec"]');
    secondSecBtns.forEach(btn => btn.addEventListener('click', (e) => passwordProtection.handleGradeLinkClick('second-sec', e)));

    const thirdSecBtns = document.querySelectorAll('a[href*="third-sec"]');
    thirdSecBtns.forEach(btn => btn.addEventListener('click', (e) => passwordProtection.handleGradeLinkClick('third-sec', e)));
});
