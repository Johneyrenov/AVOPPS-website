// ===== PARTICLES ANIMATION =====
class ParticlesAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 100 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 10000;
        this.particles = [];
        
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(46, 139, 87, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(46, 139, 87, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x += Math.cos(angle) * force * 2;
                particle.y += Math.sin(angle) * force * 2;
            }
            
            // Bounce off walls
            if (particle.x <= 0 || particle.x >= this.canvas.width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= this.canvas.height) particle.speedY *= -1;
        });
    }
    
    animate() {
        this.drawParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// ===== PROGRESS ANIMATION =====
class ProgressAnimator {
    constructor() {
        this.animated = false;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    animateProgressCircles() {
        const progressCircles = document.querySelectorAll('.circle-progress');
        
        progressCircles.forEach(circle => {
            const value = parseInt(circle.dataset.value);
            const progressRing = circle.querySelector('.progress-ring-circle');
            const statNumber = circle.querySelector('.stat-number');
            
            // Animate progress ring
            const circumference = 2 * Math.PI * 52;
            const offset = circumference - (value / 100) * circumference;
            
            progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRing.style.strokeDashoffset = circumference;
            
            setTimeout(() => {
                progressRing.style.transition = 'stroke-dashoffset 2s ease-in-out';
                progressRing.style.strokeDashoffset = offset;
            }, 500);
            
            // Animate counter
            this.animateCounter(statNumber, value);
        });
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, stepTime);
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateProgressCircles();
                }
            });
        }, { threshold: 0.5 });
        
        const heroSection = document.querySelector('.cinematic-hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }
}

// ===== CATEGORY NAVIGATION =====
class CategoryNavigation {
    constructor() {
        this.currentCategory = 'psychosocial';
        this.init();
    }
    
    init() {
        this.setupCategoryNav();
        this.setupScrollSpy();
    }
    
    setupCategoryNav() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.dataset.category;
                this.switchCategory(category);
            });
        });
    }
    
    switchCategory(category) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.category-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');
        
        this.currentCategory = category;
        
        // Scroll to section
        const section = document.getElementById(category);
        const offset = 100;
        const sectionTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('.category-section');
        const navItems = document.querySelectorAll('.nav-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const category = entry.target.id;
                    
                    // Update navigation
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.dataset.category === category) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// ===== CARD ANIMATIONS =====
class CardAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCardHoverEffects();
        this.setupScrollAnimations();
    }
    
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.realisation-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setupScrollAnimations() {
        const cards = document.querySelectorAll('.realisation-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// ===== HEADER SCROLL EFFECT =====
class HeaderScroll {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticlesAnimation();
    new ProgressAnimator();
    new CategoryNavigation();
    new CardAnimations();
    new HeaderScroll();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Smooth scrolling for anchor links
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