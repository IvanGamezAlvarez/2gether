export const insertDiv = () => {
  const navBar = document.querySelector("#navbar");
  if (navBar) {
    const navDiv = document.createElement("div");
    navDiv.classList.add("custom-navbar");
    navDiv.innerHTML = ` <nav class="navbar navbar-expand-lg nav-color">
    <div class="container-fluid">
      <a class="navbar-brand" href="/src/pages/dashboard/dashboard.html">2gether.com</a>
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

        <ul
          class="navbar-nav d-flex flex-lg-row flex-column  ms-lg-auto ms-0"
        >
          <li class="nav-item">
            <a href="/src/pages/chat/chat.html"><i class="bi bi-chat-fill p-3"></i></a>
          </li>
          <li class="nav-item">
            <a href="/src/pages/profile/profileEditable.html"><i class="bi bi-person-fill p-3"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
    navBar.appendChild(navDiv);
  }
};
