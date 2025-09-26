console.log("hola amigos");
const navBar = document.querySelector("#navbar");

const insertDiv = () => {
  if (navBar) {
    const navDiv = document.createElement("div");
    navDiv.innerHTML = ` <nav class="navbar navbar-expand-lg nav-color">
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html">2gether.com</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/src/pages/aboutUs/aboutus.html"
              >Sobre nosotros</a
            >
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="/src/pages/card/card.html">Tarjetas</a>
          </li>
        </ul>
        <ul
          class="navbar-nav d-flex flex-lg-row flex-column align-items-lg-end align-items-start ms-lg-auto ms-0"
        >
          <li class="nav-item">
            <a href=""><i class="bi bi-chat-fill p-3"></i></a>
          </li>
          <li class="nav-item">
            <a href=""><i class="bi bi-person-fill p-3"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
    navBar.appendChild(navDiv);
  }
};
insertDiv();

{
  /*
  /* <nav class="navbar navbar-expand-lg nav-color">
  <div class="container-fluid">
    <a class="navbar-brand" href="/index.html">2gether.com</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="bi bi-list"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/pages/aboutUs/aboutus.html"
            >Sobre nosotros</a
          >
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" href="/pages/card/card.html">Tarjetas</a>
        </li>
      </ul>
      <ul
        class="navbar-nav d-flex flex-lg-row flex-column align-items-lg-end align-items-start ms-lg-auto ms-0"
      >
        <li class="nav-item">
          <a href=""><i class="bi bi-chat-fill p-3"></i></a>
        </li>
        <li class="nav-item">
          <a href=""><i class="bi bi-person-fill p-3"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav> */
}
