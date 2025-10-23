// Données des réalisations
const realisationsData = [
    {
        id: 1,
        title: "Centre de Soutien Psychosocial Communautaire",
        excerpt: "Construction et mise en service d'un centre dédié au soutien psychosocial dans la commune de Petite Rivière.",
        overview: `
            <p>Ce projet ambitieux a permis de créer le premier centre de soutien psychosocial permanent dans la région. 
            Le centre offre des services gratuits à la population et sert de référence pour les interventions psychosociales.</p>
        `,
        category: "psychosocial",
        impact: "eleve",
        year: "2023",
        date: "2023-06-15",
        location: "Petite Rivière de l'Artibonite",
        beneficiaries: "500+ personnes",
        duration: "8 mois",
        budget: "50,000 USD",
        objectives: [
            "Créer un espace sécurisé pour le soutien psychosocial",
            "Former 20 agents communautaires",
            "Offrir 500 consultations annuelles"
        ],
        results: [
            { number: "500", label: "Consultations réalisées" },
            { number: "20", label: "Agents formés" },
            { number: "95%", label: "Satisfaction des bénéficiaires" }
        ],
        testimonials: [
            {
                text: "Ce centre a changé ma vie. J'ai pu surmonter mon traumatisme grâce au soutien professionnel.",
                author: "Marie J., Bénéficiaire"
            }
        ],
        image: "images/realisation-1.jpg",
        gallery: ["images/gallery-1-1.jpg", "images/gallery-1-2.jpg"]
    },
    // Ajoutez d'autres réalisations...
];

// Fonction pour afficher les réalisations
function displayRealisationsGrid(realisationsToShow, page = 1) {
    const realisationsPerPage = 6;
    const startIndex = (page - 1) * realisationsPerPage;
    const endIndex = startIndex + realisationsPerPage;
    const paginatedRealisations = realisationsToShow.slice(startIndex, endIndex);
    
    const grid = document.getElementById('realisations-grid');
    grid.innerHTML = '';
    
    paginatedRealisations.forEach(realisation => {
        const realisationCard = createRealisationCard(realisation);
        grid.appendChild(realisationCard);
    });
}

function createRealisationCard(realisation) {
    const card = document.createElement('div');
    card.className = 'realisation-card';
    card.innerHTML = `
        <div class="realisation-image">
            <img src="${realisation.image}" alt="${realisation.title}">
            <div class="realisation-badge">${getImpactLabel(realisation.impact)}</div>
        </div>
        <div class="realisation-content">
            <span class="realisation-category">${getCategoryLabel(realisation.category)}</span>
            <h3 class="realisation-title">${realisation.title}</h3>
            <p class="realisation-excerpt">${realisation.excerpt}</p>
            <div class="realisation-meta">
                <span>${realisation.year}</span>
                <span class="realisation-impact ${getImpactClass(realisation.impact)}">
                    <i class="fas fa-chart-line"></i> ${getImpactLabel(realisation.impact)}
                </span>
            </div>
            <a href="realisation-details.html?id=${realisation.id}" class="details-btn">Voir les détails</a>
        </div>
    `;
    return card;
}

// Fonctions utilitaires
function getCategoryLabel(category) {
    const categories = {
        'psychosocial': 'Santé Psychosociale',
        'education': 'Éducation',
        'economie': 'Économie Sociale',
        'infrastructure': 'Infrastructure',
        'sante': 'Santé Communautaire'
    };
    return categories[category] || 'Réalisation';
}

function getImpactLabel(impact) {
    const impacts = {
        'eleve': 'Impact Élevé',
        'moyen': 'Impact Moyen',
        'local': 'Impact Local'
    };
    return impacts[impact] || 'Impact';
}

function getImpactClass(impact) {
    const classes = {
        'eleve': 'impact-high',
        'moyen': 'impact-medium',
        'local': 'impact-low'
    };
    return classes[impact] || '';
}