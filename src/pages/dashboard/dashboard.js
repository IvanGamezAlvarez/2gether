import { fetchSuggestions, fetchIdealExchanges, fetchHelpOpportunities } from './api.js';

function createCardHTML(user) {
  const offerBadges = user.skillsOffer.map(skill => 
     `<span class="badge skills-offer fw-semibold me-1">${skill.name}</span>`
  ).join('');

  const seekBadges = user.skillsSeek.map(skill => 
    `<span class="badge skills-seek fw-semibold me-1">${skill}</span>`
  ).join('');

  return `
    <div class="col">
      <div class="card shadow-sm border-0 rounded-4 h-100">
        <div class="card-body p-3 d-flex flex-column">
          <div class="d-flex align-items-start">
            <img src="${user.imageUrl}" 
                 alt="Foto de perfil de ${user.username}" 
                 class="profile-photo rounded-circle">
            
            <div class="ms-3 flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="fw-bold mb-1">${user.username}</h6>
                  <p class="card-text text-muted mb-0 text-xs">${user.description}</p>
                </div>
                <a href="" class="btn btn-custom px-3 text-nowrap ms-3">Ver perfil</a>
              </div>
              
              <div class="mt-3">
                <div class="row">
                  <div class="col-12 col-sm-6 mb-2 mb-sm-0">
                    <h6 class="small text-muted mb-1">Enseña</h6>
                    ${offerBadges}
                  </div>
                  <div class="col-12 col-sm-6">
                    <h6 class="small text-muted mb-1">Busca aprender</h6>
                    ${seekBadges}
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