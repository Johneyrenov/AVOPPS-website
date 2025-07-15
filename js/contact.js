// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showFormMessage('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulation d'envoi (remplacer par un vrai appel API)
            simulateFormSubmission(formData);
        });
    }
    
    // Fonction pour valider l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Fonction pour afficher les messages
    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Supprimer l'ancien message s'il existe
        const oldMessage = contactForm.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Ajouter le nouveau message
        contactForm.appendChild(messageDiv);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Simulation d'envoi du formulaire
    function simulateFormSubmission(formData) {
        // Ici, vous remplaceriez par un vrai appel AJAX/Fetch à votre backend
        console.log('Données du formulaire:', formData);
        
        // Simuler un délai de traitement
        setTimeout(() => {
            showFormMessage('Merci pour votre message! Nous vous contacterons bientôt.', 'success');
            contactForm.reset();
        }, 1000);
    }
    
    // Initialisation de la carte (Google Maps)
    if (document.getElementById('map')) {
        initMap();
    }
});

// Fonction d'initialisation de la carte Google Maps
function initMap() {
    // Coordonnées de AVOPPS (exemple)
    const avoppsLocation = { lat: 19.1399, lng: -72.4876 };
    
    // Création de la carte
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: avoppsLocation,
        styles: [
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Marqueur
    new google.maps.Marker({
        position: avoppsLocation,
        map: map,
        title: 'AVOPPS - Action et Volontariat de Prise en Charge Psychosociale'
    });
}