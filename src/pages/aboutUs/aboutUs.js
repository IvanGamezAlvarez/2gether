import { addElements } from "/src/common/navElements.js";

// Inicializar el carrusel manualmente
document.addEventListener("DOMContentLoaded", function () {
  var carousel = new bootstrap.Carousel(
    document.getElementById("carouselExample"),
    {
      wrap: true,
    }
  );
});
const map = L.map("map").setView([23.634501, -102.552784], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
}).addTo(map);

// Crear un icono personalizado con el número 12
const numberIcon = L.divIcon({
  className: "number-icon",
  html: "<div>12</div>",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Añadir marcador con el número 12 en México (Coordenadas aproximadas de Ciudad de México)
L.marker([19.4326, -99.1332], { icon: numberIcon }).addTo(map);

addElements();
