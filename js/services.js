document.addEventListener('DOMContentLoaded', function() {
    // Navigation entre services
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceSections = document.querySelectorAll('.service-section');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens et sections
            serviceLinks.forEach(l => l.classList.remove('active'));
            serviceSections.forEach(s => s.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Afficher la section correspondante
            const target = this.getAttribute('data-service');
            document.getElementById(target).classList.add('active');
            
            // Faire défiler jusqu'à la section
            document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Slider de témoignages
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentTestimonial = 0;
    
    // Créer les points indicateurs
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentTestimonial);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonial();
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotation des témoignages
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause l'auto-rotation quand on interagit
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Accordéon des programmes
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Fermer tous les autres items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'item actuel
            item.classList.toggle('active');
        });
    });
    
    // Onglets des initiatives
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Ajouter la classe active au bouton et panel cliqués
            btn.classList.add('active');
            document.querySelector(`.tab-panel[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.service-stats');
    
    function animateStats() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current);
                }, 20);
            });
            
            // Ne pas réanimer après la première fois
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Vérifier au chargement si la section est déjà visible
});