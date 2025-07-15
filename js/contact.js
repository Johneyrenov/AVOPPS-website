document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };

            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showFormMessage('Veuillez entrer une adresse email valide', 'error');
                return;
            }
   
            simulateFormSubmission(formData);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        const oldMessage = contactForm.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }

        contactForm.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    function simulateFormSubmission(formData) {
        console.log('Données du formulaire:', formData);
        
        setTimeout(() => {
            showFormMessage('Merci pour votre message! Nous vous contacterons bientôt.', 'success');
            contactForm.reset();
        }, 1000);
    }
    
    if (document.getElementById('map')) {
        initMap();
    }
});

function initMap() {
    const avoppsLocation = { lat: 19.1399, lng: -72.4876 };

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
    
    new google.maps.Marker({
        position: avoppsLocation,
        map: map,
        title: 'AVOPPS - Action et Volontariat de Prise en Charge Psychosociale'
    });
}