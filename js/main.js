const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    burger.classList.toggle('toggle');
    
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    
    const newsData = [
        {
            title: "Atelier sur la santé mentale",
            date: "15 octobre 2023",
            excerpt: "Nous organisons un atelier sur la gestion du stress et de l'anxiété.",
            image: "pictures/news1.jpg"
        },
        {
            title: "Nouveau programme éducatif",
            date: "5 octobre 2023",
            excerpt: "Lancement de notre nouveau programme d'alphabétisation pour adultes.",
            image: "pictures/SE.png"
        },
        {
            title: "Projet d'économie solidaire",
            date: "28 septembre 2023",
            excerpt: "Démarrage d'un nouveau projet d'artisanat local avec 20 participants.",
            image: "pictures/news3.jpg"
        }
    ];

    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-content">
                <p class="news-date">${news.date}</p>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="#" class="btn-small">Lire plus</a>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
    });

    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        console.log('Formulaire soumis:', { name, email, message });
        alert('Merci pour votre message. Nous vous contacterons bientôt!');
        contactForm.reset();
    });
}