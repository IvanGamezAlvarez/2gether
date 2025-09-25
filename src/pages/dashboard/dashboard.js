const usersData = [
  {
    id: 1,
    username: "Carlos Sánchez",
    description: "Desarrolladora Full-Stack con pasión por el diseño UX/UI. Amante del café y el código limpio.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["Java", "SQL"],
    skillsSeek: ["React"]
  },
  {
    id: 2,
    username: "Carlos Sánchez",
    description: "Especialista en bases de datos y backend. Me encanta optimizar queries y la arquitectura de sistemas.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["PostgreSQL"],
    skillsSeek: ["Go", "Docker"]
  },
  {
    id: 3,
    username: "Ana Gómez",
    description: "Frontend Developer enfocada en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["HTML5", "CSS"],
    skillsSeek: ["Testing"]
  },
  {
    id: 4,
    username: "Ana Gómez",
    description: "Frontend Developer enfocada en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["CSS", "Vue.js"],
    skillsSeek: ["TypeScript"]
  },
    {
    id: 5,
    username: "Ana Gómez",
    description: "Desarrolladora Full-Stack con pasión por el diseño UX/UI. Amante del café y el código limpio.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["Java", "SQL"],
    skillsSeek: ["React"]
  },
  {
    id: 6,
    username: "Carlos Sánchez",
    description: "Especialista en bases de datos y backend. Me encanta optimizar queries y la arquitectura de sistemas.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["PostgreSQL"],
    skillsSeek: ["Go", "Docker"]
  },
  {
    id: 7,
    username: "Ana Gómez",
    description: "Frontend Developer enfocada en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["HTML5", "CSS"],
    skillsSeek: ["Testing"]
  },
  {
    id: 8,
    username: "Ana Gómez",
    description: "Frontend Developer enfocada en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["CSS", "Vue.js"],
    skillsSeek: ["TypeScript"]
  },
  {
    id: 9,
    username: "Ana Gómez",
    description: "Frontend Developer enfocada en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?u=ana",
    skillsOffer: ["CSS", "Vue.js"],
    skillsSeek: ["TypeScript"]
  },
];

function createCardHTML(user) {
  const offerBadges = user.skillsOffer.map(skill => 
    `<span class="badge skills-offer fw-semibold me-1">${skill}</span>`
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

  const fragment = document.createDocumentFragment();
  const container = document.getElementById(containerId);

  users.forEach(user => {
    const cardWrapper = document.createElement('div');
    cardWrapper.innerHTML = createCardHTML(user);
    
    fragment.appendChild(cardWrapper.firstElementChild);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

const matches = usersData.slice(0, 3);
const suggestions = usersData.slice(3, 9);

renderCards(usersData, 'cards-matches');
renderCards(matches, 'cards-suggestions');
renderCards(suggestions, 'cards-help');

