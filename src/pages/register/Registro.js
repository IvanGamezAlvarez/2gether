document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtención de Elementos del DOM (Variables del Scope Principal)
  const form = document.getElementById("registroForm");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const fechaNacimientoInput = document.getElementById("fechaNacimiento");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const avatarInput = document.getElementById("avatarInput");
  const paisSelect = document.getElementById("pais-select");

  const ubicacionInfoDiv = document.getElementById("ubicacionInfo");
  const obtenerUbicacionBtn = document.getElementById("obtenerUbicacionBtn");
  const nivelEducativoSelect = document.getElementById("nivelEducativo");
  const campoEstudioInput = document.getElementById("campoEstudio"); // 'Qué deseas estudiar'
  const campoEnsenanzaInput = document.getElementById("campoEnsenanza"); // 'Qué deseas enseñar'

  // --- Funciones de Validación ---

  /**
   * @description Valida el formato del correo electrónico usando una RegEx.
   */
  function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(emailInput.value)) {
      emailInput.setCustomValidity(
        "Por favor, ingresa un correo electrónico válido."
      );
    } else {
      emailInput.setCustomValidity("");
    }
  }

  /**
   * @description Valida que la fecha de nacimiento indique que el usuario es mayor de 18 años.
   * Requiere un elemento con id='resultadoEdad' en el HTML para mostrar el mensaje.
   */
  function validarFechaNacimiento() {
    const fechaNacimientoStr = fechaNacimientoInput.value;
    const resultadoEdadDiv = document.getElementById("resultadoEdad"); // Asumo que tienes un div para esto

    if (!fechaNacimientoStr) {
      fechaNacimientoInput.setCustomValidity(
        "Debes ingresar tu fecha de nacimiento."
      );
      if (resultadoEdadDiv) resultadoEdadDiv.innerHTML = "";
      return;
    }

    const fechaNacimientoDate = new Date(fechaNacimientoStr);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

    // Ajuste si aún no ha cumplido años este mes
    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
    ) {
      edad--;
    }

    if (edad < 18) {
      fechaNacimientoInput.setCustomValidity(
        "Debes ser mayor de 18 años para registrarte."
      );
      if (resultadoEdadDiv)
        resultadoEdadDiv.innerHTML =
          "<p class='text-danger mt-1'>❌ Eres menor de edad (se requiere 18+).</p>";
    } else {
      fechaNacimientoInput.setCustomValidity("");
      if (resultadoEdadDiv)
        resultadoEdadDiv.innerHTML =
          "<p class='text-success mt-1'>✅ Eres mayor de edad.</p>";
    }
  }

  /**
   * @description Valida que el teléfono tenga exactamente 10 dígitos numéricos.
   */
  function validarTelefono() {
    const regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(telefonoInput.value)) {
      telefonoInput.setCustomValidity(
        "El teléfono debe tener exactamente 10 dígitos."
      );
    } else {
      telefonoInput.setCustomValidity("");
    }
  }

  /**
   * @description Valida que la contraseña tenga al menos 8 caracteres.
   */
  function validarContrasena() {
    if (passwordInput.value.length < 8) {
      passwordInput.setCustomValidity(
        "La contraseña debe tener al menos 8 caracteres."
      );
    } else {
      passwordInput.setCustomValidity("");
    }
    // Llama a la confirmación para actualizar su estado si la contraseña cambia
    validarConfirmacionContrasena();
  }

  /**
   * @description Valida que la contraseña y su confirmación coincidan.
   */
  function validarConfirmacionContrasena() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
    } else {
      confirmPasswordInput.setCustomValidity("");
    }
  }

  /**
   * @description Valida si el campo 'Qué deseas estudiar' está vacío.
   */
  function validarCampoEstudio() {
    if (!campoEstudioInput.value.trim()) {
      campoEstudioInput.setCustomValidity(
        "Por favor, ingresa el campo que deseas estudiar."
      );
    } else {
      campoEstudioInput.setCustomValidity("");
    }
  }

  /**
   * @description Valida si el campo 'Qué deseas enseñar' está vacío.
   */
  function validarCampoEnsenanza() {
    if (!campoEnsenanzaInput.value.trim()) {
      campoEnsenanzaInput.setCustomValidity(
        "Por favor, ingresa el campo que deseas enseñar."
      );
    } else {
      campoEnsenanzaInput.setCustomValidity("");
    }
  }

  // --- Eventos del Formulario y Validaciones ---

  // 2. Evento de Envío (Submit)
  // ---- SUBMIT ----
  form.addEventListener(
    "submit",
    async function (event) {
      event.preventDefault();

      // Ejecutar validaciones
      validarEmail();
      validarTelefono();
      validarContrasena();
      validarConfirmacionContrasena();
      validarFechaNacimiento();
      validarCampoEstudio();
      validarCampoEnsenanza();

      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        event.stopPropagation();
        return;
      }

      // Construimos el objeto del usuario
      const usuario = {
        nombre: document.getElementById("nombre").value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        campoEstudio: campoEstudioInput.value,
        campoEnsenanza: campoEnsenanzaInput.value,
        nivelEnsenanza: nivelEducativoSelect.value,
        pais: paisSelect.value, // 👈 agregado
      };

      console.log(
        "Usuario a registrar (JSON):",
        JSON.stringify(usuario, null, 2)
      );

      const alertContainer = document.querySelector(".card-body");

      try {
        // 🔥 Envío al endpoint real
        const response = await fetch("https://tu-api.com/api/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });

        if (!response.ok) throw new Error("Error en el registro");

        const data = await response.json();

        alertContainer.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              🎉 ¡Registro exitoso! Bienvenido, ${usuario.nombre} desde ${usuario.pais}.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `
        );

        form.reset();
        form.classList.remove("was-validated");
      } catch (error) {
        console.error("Error:", error);
        alertContainer.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              ❌ Ocurrió un error al registrar. Inténtalo nuevamente.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `
        );
      }
    },
    false
  );

  // 3. Eventos para Validación en Tiempo Real (Input/Change)
  emailInput.addEventListener("input", validarEmail);
  telefonoInput.addEventListener("input", validarTelefono);
  passwordInput.addEventListener("input", validarContrasena);
  confirmPasswordInput.addEventListener("input", validarConfirmacionContrasena);
  fechaNacimientoInput.addEventListener("change", validarFechaNacimiento);
  campoEstudioInput.addEventListener("input", validarCampoEstudio);
  campoEnsenanzaInput.addEventListener("input", validarCampoEnsenanza);

  // --- Funcionalidades Adicionales ---

  // 4. Vista Previa de la Foto de Perfil
  avatarInput.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    // Vista previa inmediata
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("avatarImage").src = e.target.result;
    };
    reader.readAsDataURL(file);

    // --- FUTURO: Subida al bucket ---
    // Ejemplo (cuando conectes tu API o SDK):
    /*
    try {
      const url = await subirImagenABucket(file);
      document.getElementById("avatarImage").src = url;
      usuario.fotoUrl = url; // agregar al objeto usuario antes de enviarlo
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
    */
  });

  // 6. Mensaje del Nivel Educativo (Opcional, se integra en el evento 'change')
  nivelEducativoSelect.addEventListener("change", function () {
    const resultadoDiv = document.getElementById("resultadoNivelEducativo"); // Asumo un div en el HTML
    if (resultadoDiv) {
      if (this.value) {
        resultadoDiv.textContent = `Nivel seleccionado: ${this.value}`;
      } else {
        resultadoDiv.textContent = "Por favor, selecciona un nivel educativo.";
      }
    }
  });
});
