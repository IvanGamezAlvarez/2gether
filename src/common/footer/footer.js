export const insertDivFooter = () => {
  const footBar = document.querySelector("#foot-bar");
  if (footBar) {
    const footDiv = document.createElement("div");
    footDiv.innerHTML = ` <div class="footer-main text-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-lg-3">
            <h5 class="border-bottom pb-1 w-75">Compañía</h5>
            <a href="#">Sobre nosotros</a>
            <a href="#">Equipo</a>
            <a href="#">Afíliate</a>
            <a href="#">Trabaja con nosotros</a>
          </div>
          <div class="col-md-3 col-lg-3">
            <h5 class="border-bottom pb-2 w-75">Ayuda</h5>
            <a href="#">Preguntas frecuentes (FAQ)</a>
            <a href="#">Guía de uso</a>
            <a href="#">Reportar un problema</a>
            <a href="#">Centro de aprendizaje</a>
          </div>
          <div class="col-md-3 col-lg-3">
            <h5 class="border-bottom pb-2 w-75">Síguenos</h5>
            <a href="#">Preguntas frecuentes (FAQ)</a>
            <a href="#">Guía de uso</a>
            <a href="#">Reportar un problema</a>
            <a href="#">Centro de aprendizaje</a>
          </div>
          <div class="col-md-3 col-lg-3">
            <h5 class="border-bottom pb-2 w-75">Explora</h5>
            <a href="#">Cursos destacados</a>
            <a href="#">Eventos y webinars</a>
            <a href="#">Afíliate / Publica tu anuncio</a>
            <a href="#">Eventos o webinars</a>
          </div>
        </div>
      </div>
    </div>`;
    footBar.appendChild(footDiv);
  }
};
