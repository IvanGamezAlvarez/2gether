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

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginAdvise = document.querySelector("#login-advise");

  // Limpia mensajes anteriores
  loginAdvise.textContent = "";
  loginAdvise.classList.remove(
    "formulario-input-error-activo",
    "formulario-grupo-correcto"
  );

  if (campos.email && campos.password) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://tu-api.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor o credenciales inválidas");
      }

      const data = await response.json();

      if (data.success) {
        // Guardamos la información del usuario
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Mostrar mensaje de éxito
        loginAdvise.textContent = "Inicio de sesión exitoso ✅";
        loginAdvise.classList.add("formulario-grupo-correcto");

        // Redirigir después de un breve delay
        setTimeout(() => {
          window.location.href = "/home.html";
        }, 800);
      } else {
        // Credenciales incorrectas
        loginAdvise.textContent = "Correo o contraseña incorrectos ";
        loginAdvise.classList.add("formulario-input-error-activo");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      loginAdvise.textContent = "No logramos conectarnos con el servidor";
      loginAdvise.classList.add("formulario-input-error-activo");
    }
  } else {
    loginAdvise.textContent = "Por favor completa correctamente los campos.";
    loginAdvise.classList.add("formulario-input-error-activo");
  }
});
