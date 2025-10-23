document.addEventListener('DOMContentLoaded', function() {
    // Données des ressources (en pratique, vous pourriez les charger depuis une API)
    const resourcesData = [
        {
            id: 1,
            title: "Guide de gestion du stress",
            description: "Un guide complet avec des techniques pour gérer le stress au quotidien.",
            category: "psychosocial",
            type: "document",
            date: "2023-10-15",
            downloads: 124,
            image: "images/resource-1.jpg"
        },
        {
            id: 2,
            title: "Techniques de communication non-violente",
            description: "Vidéo explicative sur les principes de la communication non-violente en situation de conflit.",
            category: "psychosocial",
            type: "video",
            date: "2023-09-28",
            views: 356,
            image: "images/resource-2.jpg"
        },
        {
            id: 3,
            title: "Manuel d'alphabétisation pour adultes",
            description: "Document pédagogique pour les formateurs en alphabétisation des adultes.",
            category: "education",
            type: "document",
            date: "2023-10-05",
            downloads: 89,
            image: "images/resource-3.jpg"
        },
        {
            id: 4,
            title: "Atelier sur l'estime de soi",
            description: "Enregistrement complet de notre atelier sur le développement de l'estime de soi.",
            category: "psychosocial",
            type: "video",
            date: "2023-09-15",
            views: 215,
            image: "images/resource-4.jpg"
        },
        {
            id: 5,
            title: "Guide pour créer une entreprise sociale",
            description: "Étapes pratiques pour monter un projet d'économie sociale et solidaire.",
            category: "economie",
            type: "document",
            date: "2023-08-20",
            downloads: 76,
            image: "images/resource-5.jpg"
        },
        {
            id: 6,
            title: "L'importance de l'éducation communautaire",
            description: "Article de réflexion sur le rôle de l'éducation dans le développement communautaire.",
            category: "education",
            type: "article",
            date: "2023-10-01",
            views: 142,
            image: "images/resource-6.jpg"
        },
        {
            id: 7,
            title: "Gestion des traumatismes chez les enfants",
            description: "Guide pratique pour les parents et éducateurs face aux situations traumatiques.",
            category: "psychosocial",
            type: "document",
            date: "2023-09-10",
            downloads: 98,
            image: "images/resource-7.jpg"
        },
        {
            id: 8,
            title: "Microcrédit et développement local",
            description: "Vidéo documentaire sur l'impact du microcrédit dans les communautés rurales.",
            category: "economie",
            type: "video",
            date: "2023-08-05",
            views: 178,
            image: "images/resource-8.jpg"
        }
    ];

    // Éléments du DOM
    const resourcesGrid = document.getElementById('resources-grid');
    const searchInput = document.getElementById('resource-search');
    const categoryFilter = document.getElementById('category-filter');
    const typeFilter = document.getElementById('type-filter');
    const sortSelect = document.getElementById('sort-by');
    const resetBtn = document.getElementById('reset-filters');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');
    
    // Variables de pagination
    let currentPage = 1;
    const resourcesPerPage = 6;
    let filteredResources = [...resourcesData];
    
    // Initialisation
    displayResources();
    setupPagination();
    
    // Événements
    searchInput.addEventListener('input', filterResources);
    categoryFilter.addEventListener('change', filterResources);
    typeFilter.addEventListener('change', filterResources);
    sortSelect.addEventListener('change', sortResources);
    resetBtn.addEventListener('click', resetFilters);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Fonction pour afficher les ressources
    function displayResources() {
        resourcesGrid.innerHTML = '';
        
        const startIndex = (currentPage - 1) * resourcesPerPage;
        const endIndex = startIndex + resourcesPerPage;
        const paginatedResources = filteredResources.slice(startIndex, endIndex);
        
        if (paginatedResources.length === 0) {
            resourcesGrid.innerHTML = '<p class="no-results">Aucune ressource ne correspond à vos critères de recherche.</p>';
            return;
        }
        
        paginatedResources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            
            // Déterminer le badge en fonction du type
            let badgeText = '';
            if (resource.type === 'document') badgeText = 'PDF';
            else if (resource.type === 'video') badgeText = 'Vidéo';
            else if (resource.type === 'article') badgeText = 'Article';
            
            // Déterminer l'icône en fonction du type
            let iconClass = '';
            if (resource.type === 'document') iconClass = 'fas fa-file-pdf';
            else if (resource.type === 'video') iconClass = 'fas fa-video';
            else if (resource.type === 'article') iconClass = 'fas fa-newspaper';
            
            // Déterminer la catégorie en texte
            let categoryText = '';
            if (resource.category === 'psychosocial') categoryText = 'Santé psychosociale';
            else if (resource.category === 'education') categoryText = 'Éducation';
            else if (resource.category === 'economie') categoryText = 'Économie sociale';
            
            resourceCard.innerHTML = `
                <div class="resource-image">
                    <img src="${resource.image}" alt="${resource.title}">
                    <span class="resource-badge">${badgeText}</span>
                </div>
                <div class="resource-content">
                    <span class="resource-category">${categoryText}</span>
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-meta">
                        <span>${formatDate(resource.date)}</span>
                        ${resource.downloads ? `<span>${resource.downloads} téléchargements</span>` : `<span>${resource.views} vues</span>`}
                    </div>
                    <a href="sources.pdf" download class="resource-download">
                        <i class="${iconClass}"></i> ${resource.type === 'document' ? 'Télécharger' : resource.type === 'video' ? 'Regarder' : 'Lire'}
                    </a>
                </div>
            `;
            
            resourcesGrid.appendChild(resourceCard);
        });
    }
    
    // Fonction pour formater la date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    // Fonction pour filtrer les ressources
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const typeValue = typeFilter.value;
        
        filteredResources = resourcesData.filter(resource => {
            // Filtre par recherche
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) || 
                                resource.description.toLowerCase().includes(searchTerm);
            
            // Filtre par catégorie
            const matchesCategory = categoryValue === 'all' || resource.category === categoryValue;
            
            // Filtre par type
            const matchesType = typeValue === 'all' || resource.type === typeValue;
            
            return matchesSearch && matchesCategory && matchesType;
        });
        
        currentPage = 1;
        sortResources();
        setupPagination();
        displayResources();
    }
    
    // Fonction pour trier les ressources
    function sortResources() {
        const sortValue = sortSelect.value;
        
        filteredResources.sort((a, b) => {
            switch (sortValue) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
        
        displayResources();
    }
    
    // Fonction pour réinitialiser les filtres
    function resetFilters() {
        searchInput.value = '';
        categoryFilter.value = 'all';
        typeFilter.value = 'all';
        sortSelect.value = 'date-desc';
        
        filterResources();
    }
    
    // Fonction pour configurer la pagination
    function setupPagination() {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
        
        if (totalPages <= 1) {
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            return;
        }
        
        // Bouton précédent
        prevPageBtn.disabled = currentPage === 1;
        
        // Boutons de numéro de page
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', () => goToPage(i));
            pageNumbersContainer.appendChild(pageNumber);
        }
        
        // Bouton suivant
        nextPageBtn.disabled = currentPage === totalPages;
    }
    
    // Fonction pour aller à une page spécifique
    function goToPage(page) {
        currentPage = page;
        displayResources();
        setupPagination();
        window.scrollTo({ top: resourcesGrid.offsetTop - 100, behavior: 'smooth' });
    }
    
    // Fonction pour aller à la page précédente
    function goToPrevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    // Fonction pour aller à la page suivante
    function goToNextPage() {
        const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    // Gestion de la newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Simuler l'envoi (remplacer par un vrai appel API)
                console.log('Email enregistré :', email);
                alert('Merci pour votre inscription à notre newsletter !');
                emailInput.value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }
    
    // Fonction pour valider l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});



// Ajouter à la fin du fichier resources.js

// Gestion du redimensionnement
function handleResize() {
    // Réorganiser la pagination si nécessaire
    setupPagination();
    
    // Ajustements spécifiques pour très petits écrans
    if (window.innerWidth < 400) {
        document.querySelectorAll('.resource-card').forEach(card => {
            card.style.minWidth = 'auto';
        });
    }
}

// Écouteur d'événement de redimensionnement
window.addEventListener('resize', handleResize);

// Appel initial
handleResize();