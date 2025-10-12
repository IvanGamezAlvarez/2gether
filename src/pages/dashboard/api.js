const usersData = [
  {
    id: 1,
    username: "Iván Gámez",
    description: "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/public/img/cards/IvanGamez_Portrait.jpg",
    skillsOffer: [{ name: "Guitarra", level: 'Experto' }],
    skillsSeek: ["Java"]
  },
  {
    id: 2,
    username: "Gerardo López",
    description: "Desarrollador con interés en la tecnología y el diseño, más que usar herramientas, disfruto construirlas.",
    imageUrl: "/public/img/cards/GerardoLopez_Portrait.jpg",
    skillsOffer: [{ name: "CSS", level: 'Intermedio' }],
    skillsSeek: ["JavaScript"]
  },
  {
    id: 3,
    username: "Cristian Crespo",
    description: "Apasionado por la tecnología, especializado en crear soluciones innovadoras y con gran interés en el desarrollo de videojuegos.",
    imageUrl: "/public/img/cards/CristianOlegario_Portrait.jpg",
    skillsOffer: [{ name: "Java", level: 'Principiante' }],
    skillsSeek: ["React"]
  },
  {
    id: 4,
    username: "Alejandro Mundo",
    description: "Apasionado por el desarrollo de aplicaciones web, con enfoque en la calidad del código y aprendizaje constante.",
    imageUrl: "/public/img/cards/AlejandroMundo_Portrait.jpg",
    skillsOffer: [{ name: "Java", level: 'Intermedio' }],
    skillsSeek: ["Spring Boot"]
  },
  {
    id: 5,
    username: "Andres Vera",
    description: "Apasionado por la tecnología y por descubrir cómo las ideas se convierten en soluciones reales.",
    imageUrl: "/public/img/cards/AndresVera_Portrait.jpg",
    skillsOffer: [{ name: "Inglés", level: 'Intermedio' }],
    skillsSeek: ["Guitarra"]
  },
  {
    id: 6,
    username: "Ariadna Ornelas",
    description: "Programadora orientada a crear experiencias digitales útiles y bien diseñadas.",
    imageUrl: "/public/img/cards/AriadnaOrnelas_Portrait.jpg",
    skillsOffer: [{ name: "Inglés", level: 'Experto' }, { name: "SQL", level: 'Intermedio' }],
    skillsSeek: ["SQL"]
  },
  {
    id: 7,
    username: "Roxana Cordova",
    description: "Aplico el pensamiento sistémico para optimizar procesos y crear soluciones de software eficientes.",
    imageUrl: "/public/img/cards/RoxanaCordova_Portrait.jpg",
    skillsOffer: [{ name: "Scrum", level: 'Intermedio' }],
    skillsSeek: ["React"]
  },
  {
    id: 8,
    username: "Luis Guzman",
    description: "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/public/img/cards/JoseGuzman_Portrait.jpg",
    skillsOffer: [{ name: "Java", level: 'Experto' }, { name: "SQL", level: 'Intermedio' }],
    skillsSeek: ["React"]
  },
  {
    id: 9,
    username: "Jennifer Tavera",
    description: "Ingeniera de software apasionada por el desarrollo web, autodidacta y orientada al detalle.",
    imageUrl: "/public/img/cards/JenniferTavera_Portrait.jpg",
    skillsOffer: [{ name: "Java", level: 'Principiante' }, { name: "SQL", level: 'Intermedio' }],
    skillsSeek: ["AWS", "Docker"]
  },
  {
    id: 10,
    username: "Carlos Gómez",
    description: "Frontend Developer enfocado en crear interfaces accesibles y performantes para todos los usuarios.",
    imageUrl: "https://i.pravatar.cc/150?img=12",
    skillsOffer: [{ name: "Java", level: 'Experto' }, { name: "SQL", level: 'Principiante' }],
    skillsSeek: ["Testing"]
  },
  {
    id: 11,
    username: "Diego Hernández",
    description: "Diseñadora UX/UI con pasión por interfaces limpias y experiencias memorables.",
    imageUrl: "https://i.pravatar.cc/150?img=60",
    skillsOffer: [{ name: "Figma", level: 'Experto' }],
    skillsSeek: ["JavaScript"]
  },
  {
    id: 12,
    username: "Ana López",
    description: "Fullstack Developer enfocado en crear aplicaciones escalables y optimizadas.",
    imageUrl: "https://i.pravatar.cc/150?img=32",
    skillsOffer: [{ name: "React", level: 'Intermedio' }, { name: "Node.js", level: 'Intermedio' }],
    skillsSeek: ["AWS", "Docker"]
  }
];

const availableSkills = [
    "Java", "SQL", "AWS", "React", "Go", "Docker", "HTML", "CSS", "Inglés",
    "Testing", "Vue.js", "TypeScript", "Spring Boot", "PostgreSQL", "Figma",
    "Guitarra", "Scrum", "Node.js"
];

/**
 * Simulates fetching the list of all available skills.
 */
export function fetchAllSkills() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(availableSkills.sort());
        }, 300);
    });
}

/**
 * Simulates fetching profiles for the "Intercambios Ideales" module.
 */
export function fetchIdealExchanges() {
    return new Promise(resolve => setTimeout(() => resolve(usersData.slice(0, 6)), 500));
}

/**
 * Simulates fetching profiles for the "Sugerencias para ti" module.
 */
export function fetchSuggestions() {
    return new Promise(resolve => setTimeout(() => resolve(usersData.slice(6, 8)), 800));
}

/**
 * Simulates fetching profiles for the "Puedo ayudar a..." module.
 */
export function fetchHelpOpportunities() {
    return new Promise(resolve => setTimeout(() => resolve(usersData.slice(8, 12)), 1200));
}