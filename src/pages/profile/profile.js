class InteractiveRating {
    constructor() {
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

    submitRating() {
        this.ratingContent.classList.add('hidden');
        this.thankYouContent.classList.remove('hidden');
        console.log(`Calificación enviada: ${this.currentRating} estrellas`);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveRating();

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});