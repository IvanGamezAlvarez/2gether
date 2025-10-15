const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

import { insertDivFooter } from "/src/common/footer/footer.js";
import "/src/common/footer/footer.css";

document.addEventListener("DOMContentLoaded", () => {
  insertDivFooter();
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// Mostrar la primera slide al cargar
showSlide(currentIndex);

// validación
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const campos = {
  email: false,
  password: false,
};

const expresiones = {
  password: /^.{8,12}$/, // 8 a 12 caracteres
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-correcto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-incorrecto");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.remove("formulario-input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-correcto");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.add("formulario-input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

// Rellenar los campos con localStorage al cargar
window.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email) {
    emailInput.value = email;
    validarCampo(expresiones.email, emailInput, "email");
  }

  if (password) {
    passwordInput.value = password;
    validarCampo(expresiones.password, passwordInput, "password");
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.email && campos.password) {
    // Guardar en localStorage
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    formulario.reset();
    alert("Ingresaste correctamente");

    document.querySelectorAll(".formulario-grupo-correcto").forEach((icono) => {
      icono.classList.remove("formulario-grupo-correcto");
    });
  } else {
    alert("Correo o contraseña incorrectos");
  }
});
