/* ============================================
   AVOPPS — Main Script
   ============================================ */

/* ------- Burger / Mobile Nav ------- */
const burger      = document.getElementById('burger');
const navLinks    = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function closeNav() {
  navLinks?.classList.remove('active');
  burger?.classList.remove('toggle');
  navBackdrop?.classList.remove('active');
}

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    navBackdrop?.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

navBackdrop?.addEventListener('click', closeNav);

/* ------- Header scroll effect ------- */
const header = document.getElementById('mainHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ------- Scroll animations (IntersectionObserver) ------- */
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  animateObserver.observe(el);
});

/* ------- Stats counter ------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      entry.target.querySelectorAll('.stat-item').forEach(item => {
        item.classList.add('visible');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const statsBand = document.getElementById('statsBand');
if (statsBand) statsObserver.observe(statsBand);

/* ------- News / Réalisations cards ------- */
document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  if (!newsContainer) return;

  const newsData = [
    {
      title: "Appui psychosocial aux familles déplacées",
      date: "2024 – 2025",
      excerpt: "En partenariat avec KPLL (Konbit Pou Lapè Lakay), AVOPPS a apporté un soutien direct à 100 parents déplacés en raison de l'insécurité dans l'Artibonite, dont un repas chaud remis lors de la fête des Pères.",
      image: "pictures/Prise_en_charge.jpg",
      link: "realisation-psychosocial.html"
    },
    {
      title: "Orientation professionnelle et Génie scolaire",
      date: "2013 – 2025",
      excerpt: "Chaque année, 100 jeunes bénéficient d'une formation en orientation professionnelle. Plus de 20 écoles participent au concours du Génie scolaire de Petite Rivière de l'Artibonite.",
      image: "pictures/Programme_éducation4.jpg",
      link: "realisation-education1.html"
    },
    {
      title: "Projet ATECPRA",
      date: "2021 – 2022",
      excerpt: "30 petits commerçants formés en marketing, gestion financière et protection de l'environnement. 11 d'entre eux ont reçu un appui financier de 24 000 gourdes, grâce au financement de l'Union européenne via le consortium TPFA.",
      image: "pictures/AService_économie1.jpg",
      link: "actualite-details-2.html"
    }
  ];

  newsData.forEach((news, i) => {
    const card = document.createElement('div');
    card.className = 'news-card fade-up';
    card.style.setProperty('--i', i);

    card.innerHTML = `
      <div class="news-image">
        <img src="${news.image}" alt="${news.title}" loading="lazy">
      </div>
      <div class="news-content">
        <p class="news-date">${news.date}</p>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <a href="${news.link}" class="btn-small">Lire plus <i class="fas fa-arrow-right"></i></a>
      </div>
    `;

    newsContainer.appendChild(card);
    animateObserver.observe(card);
  });
});

/* ------- Back to top ------- */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ------- Contact form ------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    const msgEl = document.querySelector('.form-message');

    if (!name || !email || !message) {
      if (msgEl) { msgEl.className = 'form-message error'; msgEl.textContent = 'Veuillez remplir tous les champs obligatoires.'; }
      return;
    }

    if (msgEl) { msgEl.className = 'form-message success'; msgEl.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous contacterons bientôt.'; }
    contactForm.reset();
  });
}
