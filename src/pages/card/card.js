const cardsDiv = document.querySelector("#cards");

const devsData = [
  {
    name: "Ivan Gamez Avarez",
    role: "Full Stack Developer",
    description:
      "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/img/cards/IvanGamez_Portrait.jpg",
    linkedinUrl: "https://www.linkedin.com/in/ivangamezdev/",
    githubUrl: "https://github.com/IvanGamezAlvarez",
  },
  {
    name: "Gerardo López ",
    role: "Develop Web",
    description:
      "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/img/cards/GerardoLopez_Portrait.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/gerardo-l%C3%B3pez1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    githubUrl: "https://github.com/GerardoALzGa",
  },
  {
    name: "Jennifer M. Tavera",
    role: "Full Stack Developer",
    description:
      "Ingeniera de software apasionada por el desarrollo web, autodidacta y orientada al detalle.",
    imageUrl: "/img/cards/JenniferTavera_Portrait.jpg",
    linkedinUrl: "http://www.linkedin.com/in/jennifer-martineztavera",
    githubUrl: "https://github.com/cordovaroxana95-art",
  },
  {
    name: "Cristian Crespo",
    role: "Full Stack Developer",
    description:
      "Apasionado por la tecnología, especializado en crear soluciones innovadoras y con gran interés en el desarrollo de videojuegos..",
    imageUrl: "/img/cards/CristianOlegario_Portrait.jpg",
    linkedinUrl: "https://www.linkedin.com/in/cristian-olegario-crespo-ponce/",
    githubUrl: "https://github.com/KittyCOCP",
  },
  {
    name: "Alejandro Mundo",
    role: "Java Full Stack Jr.",
    description:
      "Apasionado por el desarrollo de aplicaciones web, con un enfoque comprometido en la calidad del código, el aprendizaje constante y la solución eficiente de problemas.",
    imageUrl: "/img/cards/AlejandroMundo_Portrait.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/alejandromundol?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    githubUrl: "https://github.com/AlejandroMundo1512",
  },
  {
    name: "Andres Vera",
    role: "Full Stack Developer",
    description:
      "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/img/cards/AndresVera_Portrait.jpg",
    linkedinUrl: "https://www.linkedin.com/in/andresosv1996/",
    githubUrl: "https://github.com/Andresztar",
  },
  {
    name: "Roxana Cordova",
    role: "Full Stack Developer",
    description:
      "Aplico el pensamiento sistémico para optimizar procesos y crear soluciones de software eficientes.",
    imageUrl: "/img/cards/RoxanaCordova_Portrait.jpg",
    linkedinUrl: "http://www.linkedin.com/in/ing-roxana-cordova",
    githubUrl: "https://github.com/cordovaroxana95-art",
  },
  {
    name: "Ariadna Ornelas",
    role: "Full Stack Developer",
    description:
      "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/img/cards/IvanGamez_Portrait.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Jose Luis Guzman",
    role: "Full Stack Developer",
    description:
      "Entusiasta de la informática, el diseño y los videojuegos; más que un usuario, me gusta ser un creador.",
    imageUrl: "/img/cards/JoseGuzman_Portrait.jpg",
    linkedinUrl: "http://www.linkedin.com/in/joseguzman-dev",
    githubUrl: "https://github.com/jluis000",
  },
];

const AddingDevCards = () => {
  let fragCode = document.createDocumentFragment();
  for (const dev of devsData) {
    const card = document.createElement("div");
    card.innerHTML = `<div class="card">
        <div class="content">
          <span></span>
          <div class="img">
            <img src=${dev.imageUrl} alt="" />
          </div>
          <h4>${dev.name}</h4>
          <h6>${dev.role}</h6>
          <p>
            ${dev.description}
          </p>
        </div>
        <div class="links">
          <a target="blank"  href="${dev.githubUrl}"><i class="fa-brands fa-github"></i></a>
          <a target="blank"  href="${dev.linkedinUrl}"><i class="fa-brands fa-linkedin"></i></a>
        </div>
      </div>`;
    fragCode.appendChild(card);
  }
  cardsDiv.appendChild(fragCode);
};

AddingDevCards();
