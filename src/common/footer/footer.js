export const insertDivFooter = () => {
  const footBar = document.querySelector("#foot-bar");
  if (footBar) {
    const footDiv = document.createElement("div");
    footDiv.classList.add("custom-footer");
    footDiv.innerHTML = ` <div class="footer-main text-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-6">
           <h2 class="footer-title">2gether.com</h2>
          </div>
         
          <div class="col-md-6 col-lg-6 foot-list">
            <h5 class="border-bottom pb-1 ">¿Quieres saber mas sobre nosotros?</h5>
            <a href="/index.html">Volver al inicio</a>
            <a href="/src/pages/aboutUs/aboutus.html">Sobre nosotros</a>
            <a href="/src/pages/card/card.html">Equipo</a>
            <a href="/src/pages/card/card.html#contact">Contactanos</a>

          </div>
        </div>
      </div>
    </div>`;
    footBar.appendChild(footDiv);
  }
};
