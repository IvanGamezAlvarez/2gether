class InteractiveRating {
    // MODIFICACIÓN: Aceptar profileManager en el constructor
    constructor(profileManager) {
        this.profileManager = profileManager; // Almacena la instancia para acceder a los datos de la API
        this.currentRating = 0;
        this.tempRating = 0;
        this.ratingContent = document.getElementById('ratingContent');
        this.thankYouContent = document.getElementById('thankYouContent');
        this.starsContainer = document.getElementById('starsContainer');
        this.ratingValue = document.getElementById('ratingValue');
        this.ratingText = document.getElementById('ratingText');
        this.submitBtn = document.getElementById('submitRating');

        this.ratingMessages = {
            1: "Pésimo",
            2: "Regular",
            3: "Bueno",
            4: "Muy bueno",
            5: "Excelente"
        };

        this.init();
    }

    init() {
        this.createStars();
        this.addEventListeners();
    }

    createStars() {
        this.starsContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.className = 'bi bi-star star';
            star.dataset.rating = i;
            this.starsContainer.appendChild(star);
        }
    }

    addEventListeners() {
        const stars = this.starsContainer.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('mouseenter', (e) => {
                this.tempRating = parseInt(e.target.dataset.rating);
                this.updateStarsDisplay(this.tempRating);
                this.updateRatingText(this.tempRating);
            });

            star.addEventListener('click', (e) => {
                this.currentRating = parseInt(e.target.dataset.rating);
                this.updateStarsDisplay(this.currentRating);
                this.updateRatingText(this.currentRating);
                this.enableSubmit();
            });
        });

        this.starsContainer.addEventListener('mouseleave', () => {
            this.updateStarsDisplay(this.currentRating);
            this.updateRatingText(this.currentRating);
        });

        this.submitBtn.addEventListener('click', () => {
            this.submitRating();
        });
    }

    updateStarsDisplay(rating) {
        const stars = this.starsContainer.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.classList.remove('bi-star');
                star.classList.add('bi-star-fill');
            } else {
                star.classList.remove('active');
                star.classList.remove('bi-star-fill');
                star.classList.add('bi-star');
            }
        });
    }

    updateRatingText(rating) {
        this.ratingValue.textContent = `${rating}/5`;
        if (rating > 0) {
            this.ratingText.textContent = this.ratingMessages[rating];
        } else {
            this.ratingText.textContent = "Desliza sobre las estrellas";
        }
    }

    enableSubmit() {
        this.submitBtn.disabled = false;
    }

    // Implementación de cálculo y envío PUT (para el rating)
    async submitRating() {

        const userId = this.profileManager.currentProfileId;
        const apiBase = this.profileManager.API_URL_BASE;
        const currentRating = this.profileManager.currentRating;
        const currentNumReviewers = this.profileManager.currentNumReviewers;
        const newReviewValue = this.currentRating;

        if (!userId || newReviewValue === 0) {
            console.error("No se puede enviar la calificación: ID de usuario no encontrado o calificación es 0.");
            return;
        }

        // --- LÓGICA DE CÁLCULO EN EL FRONTEND ---
        const newNumReviewers = currentNumReviewers + 1;
        const totalPoints = (currentRating * currentNumReviewers) + newReviewValue;
        const newAverageRating = totalPoints / newNumReviewers;

        // --- PAYLOAD para el PUT ---
        const updatePayload = {
            rating: newAverageRating,
            numReviewers: newNumReviewers
        };

        const ratingUrl = `${apiBase}${userId}`;

        try {
            const response = await fetch(ratingUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Añadir token de autenticación si el endpoint lo requiere
                },
                body: JSON.stringify(updatePayload)
            });

            if (response.ok) {
                // Si la actualización es exitosa:
                this.ratingContent.classList.add('hidden');
                this.thankYouContent.classList.remove('hidden');
                console.log(`Calificación ${newReviewValue} enviada. Nuevo Rating: ${newAverageRating.toFixed(2)}`);

                // Actualizar el estado del ProfileManager y el DOM
                this.profileManager.currentRating = newAverageRating;
                this.profileManager.currentNumReviewers = newNumReviewers;
                this.profileManager.updateRatingDisplay(newAverageRating, newNumReviewers);

            } else {
                console.error(`Error al enviar la calificación: ${response.status} ${response.statusText}`);
                alert("Hubo un error al enviar tu calificación. Verifica la respuesta de la API.");
            }
        } catch (error) {
            console.error("Fallo en la conexión al enviar calificación:", error);
            alert("Fallo de red al enviar la calificación.");
        }
    }
}

// -------------------------------------------------------------
// CLASE PARA MANEJAR LA LÓGICA DEL PERFIL DINÁMICO
// -------------------------------------------------------------

class ProfileManager {
    constructor() {
        this.API_URL_BASE = 'https://2gether.duckdns.org/api/v1/users/';
        this.currentProfileId = null; 
        this.currentRating = 0.0;
        this.currentNumReviewers = 0;
    }

    getUserIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    async fetchUserData(userId) {
        if (!userId) {
            console.error("ID de usuario no encontrado en la URL.");
            return null;
        }

        try {
            const response = await fetch(`${this.API_URL_BASE}${userId}`);
            if (!response.ok) {
                // Manejar error
                throw new Error(`Error al cargar el usuario: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fallo al obtener datos del usuario:", error);
            return null;
        }
    }

    updateProfileDOM(user) {
        if (!user) {
            // Manejo cuando el usuario no se encuentra
            document.getElementById('usernameText').textContent = "Usuario no encontrado";
            return;
        }

        // Almacenamiento de datos para cálculo de rating
        this.currentProfileId = user.id;
        this.currentRating = user.rating || 0.0;
        this.currentNumReviewers = user.numReviewers || 0;
        
        // 1. Datos básicos
        document.getElementById('usernameText').textContent = user.name || 'Sin nombre';
        document.getElementById('avatarImage').src = user.photoUrl || '/public/img/profileEditable/image-profile-generic.png';
        
        // 2. Sobre mí
        const aboutMeElement = document.querySelector('.text-box p');
        aboutMeElement.textContent = user.aboutMe || 'El usuario aún no ha escrito sobre sí mismo.';

        // 3. Habilidades (Enseño)
        // Usamos los IDs del HTML
        this.updateSkillSection('habilidad-ofrezco', user.skillToTeach, user.teachingLevel, 'skill-teach-container', 'lightning-teach-container');
        
        // 4. Habilidades (Busco aprender)
        // Usamos NULL para el nivel (no debe mostrar rayitos llenos)
        this.updateSkillSection('habilidad-busco', user.skillToLearn, null, 'skill-learn-container', 'lightning-learn-container');

        // 5. Rating (General)
        this.updateRatingDisplay(this.currentRating, this.currentNumReviewers);
    }

    // CORRECCIÓN: Usar los IDs directos para actualizar las habilidades
    updateSkillSection(className, skillName, level, skillContainerId, lightningContainerId) {
        const skillContainer = document.getElementById(skillContainerId);
        const lightningContainer = document.getElementById(lightningContainerId);

        if (!skillContainer || !lightningContainer) {
            // Esto es un error si los IDs no existen en el HTML
            console.error(`Contenedores de habilidad no encontrados: ${skillContainerId} o ${lightningContainerId}`);
            return;
        }

        // Actualizar nombre de la habilidad
        skillContainer.innerHTML = `
            <button class="${className}">
                <span class="fw-semibold">${skillName || 'No especificado'}</span>
            </button>
        `;
        
        // Actualizar nivel
        lightningContainer.innerHTML = this.renderLightning(level, className.includes('ofrezco'));
    }

    updateRatingDisplay(rating, numReviewers) {
        const ratingElement = document.querySelector('.text-muted.fs-3');
        const starsContainer = document.querySelector('.d-flex.gap-1');

        if (ratingElement) {
            ratingElement.textContent = `(${rating ? rating.toFixed(1) : '0.0'})`;
        }

        // Renderizar las estrellas llenas y vacías basadas en el rating
        starsContainer.innerHTML = this.renderStarRating(rating);
    }

    renderStarRating(rating) {
        let starsHtml = '';
        const roundedRating = Math.round(rating * 2) / 2;

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                // Estrella llena
                starsHtml += '<i class="bi bi-star-fill text-warning fs-6 fs-md-5 fs-1"></i>';
            } else if (i - 0.5 === roundedRating) {
                // Media estrella
                starsHtml += '<i class="bi bi-star-half text-warning fs-6 fs-md-5 fs-1"></i>';
            } else {
                // Estrella vacía
                starsHtml += '<i class="bi bi-star text-warning fs-6 fs-md-5 fs-1"></i>';
            }
        }
        return starsHtml;
    }

    renderLightning(level, isTeaching) {
        let count = 0;
        let colorClass = isTeaching ? 'lightning-green' : 'lightning-red';

        if (level === 'Básico') count = 1;
        else if (level === 'Intermedio') count = 2;
        else if (level === 'Avanzado') count = 3;
        
        let html = '';
        for (let i = 0; i < 3; i++) {
            if (i < count) {
                html += `<i class="bi bi-lightning-charge-fill ${colorClass}"></i>`;
            } else {
                html += `<i class="bi bi-lightning-charge ${colorClass}"></i>`;
            }
        }
        return html;
    }
    
    async start() {
        const userId = this.getUserIdFromUrl();
        const userData = await this.fetchUserData(userId);
        this.updateProfileDOM(userData);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    // CORRECCIÓN 1: Eliminar bloques obsoletos (ya están fuera del código)
    
    // CORRECCIÓN 2: Inicializar ProfileManager PRIMERO
    const profileManager = new ProfileManager();
    profileManager.start();

    // Inicializar lógica de calificación interactiva - PASAR INSTANCIA
    new InteractiveRating(profileManager); 

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});