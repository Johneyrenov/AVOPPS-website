// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les composants
    initNavigation();
    initCounters();
    initAnimations();
    initVideoModals();
    initShareFunctionality();
    initParallaxEffect();
    initMobileMenu();
});

// Menu mobile
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (burger && navLinks && navOverlay) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
            navOverlay.classList.toggle('active');
            burger.classList.toggle('toggle');
            
            // Animation des lignes du burger
            const lines = burger.querySelectorAll('div');
            lines.forEach(line => line.classList.toggle('active'));
        });
        
        // Fermer le menu en cliquant sur l'overlay
        navOverlay.addEventListener('click', function() {
            navLinks.classList.remove('nav-active');
            navOverlay.classList.remove('active');
            burger.classList.remove('toggle');
            burger.querySelectorAll('div').forEach(line => line.classList.remove('active'));
        });
    }
}

// Navigation entre projets
function initNavigation() {
    const prevBtn = document.getElementById('prev-realisation');
    const nextBtn = document.getElementById('next-realisation');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulation de navigation - à adapter avec vos données réelles
            showNavigationFeedback('Précédent');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulation de navigation - à adapter avec vos données réelles
            showNavigationFeedback('Suivant');
        });
    }
}

// Compteurs animés
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                animateCounter(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
        
        // Animation visuelle
        element.classList.add('count-up');
    }, 40);
}

// Animations au scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .objective-card, .partner-card, .video-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
        
        // Fallback si l'IntersectionObserver n'est pas supporté
        setTimeout(() => {
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
                element.classList.add('loaded');
            }
        }, 500);
    });
}

// Modales vidéo
function initVideoModals() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoUrl = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openVideoModal(videoUrl);
        });
    });
}

function openVideoModal(url) {
    // Créer une modale simple pour les vidéos Facebook
    // Note: Pour une intégration complète, vous devrez utiliser l'API Facebook
    window.open(url, '_blank');
}

// Alternative: fonction pour ouvrir directement dans un nouvel onglet
function openVideo(url) {
    window.open(url, '_blank');
}

// Fonctionnalité de partage
function initShareFunctionality() {
    const shareBtn = document.querySelector('.share-btn');
    
    if (shareBtn && navigator.share) {
        shareBtn.addEventListener('click', shareRealisation);
    } else if (shareBtn) {
        shareBtn.addEventListener('click', fallbackShare);
    }
}

function shareRealisation() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Découvrez cette réalisation impressionnante de AVOPPS',
            url: window.location.href
        })
        .then(() => console.log('Partage réussi'))
        .catch((error) => console.log('Erreur de partage:', error));
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copier le lien dans le presse-papier
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Afficher un message de confirmation
    showNotification('Lien copié dans le presse-papier !');
}

// Effet parallax
function initParallaxEffect() {
    const heroImage = document.querySelector('.realisation-image img');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Feedback visuel pour la navigation
function showNavigationFeedback(direction) {
    const feedback = document.createElement('div');
    feedback.textContent = `Chargement du projet ${direction.toLowerCase()}...`;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-green);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
        // Ici, vous ajouteriez la logique de chargement réel du projet
        // window.location.href = 'url-du-projet-' + direction.toLowerCase();
    }, 1500);
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS pour les animations du menu mobile (à ajouter dans le CSS)
const mobileMenuCSS = `
.nav-links.nav-active {
    display: flex !important;
    flex-direction: column;
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    padding: 20px;
    z-index: 999;
}

.nav-overlay.active {
    display: block;
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: calc(100vh - 100px);
    background: rgba(0,0,0,0.5);
    z-index: 998;
}

.burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.burger.toggle .line2 {
    opacity: 0;
}

.burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

// Injecter le CSS pour le menu mobile
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Gestion du chargement des images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Fallback pour les images déjà chargées
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Optimisation des performances
let ticking = false;

function updateOnScroll() {
    // Mettre à jour les éléments qui nécessitent un scroll
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });