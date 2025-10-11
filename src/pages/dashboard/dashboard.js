import { fetchSuggestions, fetchIdealExchanges, fetchHelpOpportunities } from './api.js';

function getLevelIcons(level) {
  const totalIcons = 3;
  let filledIcons = 0;
  let levelClass = '';
  
  switch (level.toLowerCase()) {
      case 'principiante': 
        filledIcons = 1;
        levelClass = 'level-beginner';
        break;
      case 'intermedio': 
        filledIcons = 2;
        levelClass = 'level-intermediate';
        break;
      case 'experto':
        filledIcons = 3;
        levelClass = 'level-expert';
        break;
  }
  
  let html = `<div class="level-icons mt-0 ${levelClass}">`;
  for (let i = 0; i < filledIcons; i++) {
      html += '<i class="bi bi-lightning-charge-fill"></i>';
  }
  for (let i = 0; i < totalIcons - filledIcons; i++) {
      html += '<i class="bi bi-lightning-charge-fill text-secondary text-opacity-25"></i>';
  }
  html += '</div>';
  return html;
}

function createCardHTML(user) {
  const offerBadges = user.skillsOffer.map(skill => 
     `<div class="skill-item">
        <span class="badge skills-offer">${skill.name}</span>
        ${getLevelIcons(skill.level)} 
      </div>`
  ).join('');

  const seekBadges = user.skillsSeek.map(skill => 
    `<span class="badge skills-seek fw-semibold me-1">${skill}</span>`
  ).join('');

  return `
    <div class="col">
      <div class="card shadow-sm border-0 rounded-4 h-100">
        <div class="card-body p-3 d-flex flex-column">
          <div class="d-flex align-items-start">
            <div class="profile-photo-container">
              <img src="${user.imageUrl}" 
                alt="Foto de perfil de ${user.username}">
            </div>
            <div class="ms-3 flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="fw-bold mb-1">${user.username}</h6>
                  <p class="card-text text-muted mb-0 text-xs">${user.description}</p>
                </div>
                <a href="#" class="btn btn-custom fw-semibold px-3 text-nowrap ms-3">Ver perfil</a>
              </div>
              
              <div class="mt-3">
                <div class="row">
                  <div class="col-6 mb-2 mb-sm-0">
                    <h6 class="skill-section-title mb-2">Enseña</h6>
                    <div class="d-flex flex-wrap gap-1">${offerBadges}</div>
                  </div>
                  <div class="col-6">
                    <h6 class="skill-section-title mb-2">Busca aprender</h6>
                    <div class="d-flex flex-wrap gap-1">${seekBadges}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCards(users, containerId) {
  const container = document.getElementById(containerId);
  if (!users || users.length === 0) {
    container.innerHTML = `<div class="col-12"><p class="text-center text-muted">No se encontraron resultados.</p></div>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  users.forEach(user => {
    const cardWrapper = document.createElement('div');
    cardWrapper.innerHTML = createCardHTML(user);
    
    fragment.appendChild(cardWrapper.firstElementChild);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [idealMatches, suggestions, helpOpportunities] = await Promise.all([
      fetchIdealExchanges(),
      fetchSuggestions(),
      fetchHelpOpportunities()
    ]);

    renderCards(idealMatches, 'cards-matches');
    renderCards(suggestions, 'cards-suggestions');
    renderCards(helpOpportunities, 'cards-help');
  } catch (error) {
    console.error("Error al cargar los datos del dashboard:", error);
  }
});