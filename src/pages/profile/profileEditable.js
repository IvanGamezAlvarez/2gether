import { addElements } from "/src/common/navElements.js";

// Función para cambiar el banner
function cambiarBanner(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("bannerImage").src = e.target.result;
      // Aquí puedes guardar la imagen en tu base de datos o localStorage
      localStorage.setItem("bannerPersonalizado", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Función para cambiar el avatar
function cambiarAvatar(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("avatarImage").src = e.target.result;
      // Aquí puedes guardar la imagen en tu base de datos o localStorage
      localStorage.setItem("avatarPersonalizado", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Cargar imágenes guardadas al iniciar (opcional)
document.addEventListener("DOMContentLoaded", function () {
  const bannerGuardado = localStorage.getItem("bannerPersonalizado");
  const avatarGuardado = localStorage.getItem("avatarPersonalizado");

  if (bannerGuardado) {
    document.getElementById("bannerImage").src = bannerGuardado;
  }

  if (avatarGuardado) {
    document.getElementById("avatarImage").src = avatarGuardado;
  }

  // ... el resto de tu código de inicialización
});
// Función para editar el nombre de usuario
function editarUsername() {
  const usernameElement = document.getElementById("usernameText");
  const currentUsername = usernameElement.textContent;

  // Crear input para editar
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentUsername;
  input.className =
    "form-control form-control-sm d-inline-block w-auto text-center";
  input.style.fontSize = "1.5rem";
  input.style.fontWeight = "bold";
  input.maxLength = 20; // Límite de 20 caracteres

  // Reemplazar el h2 con el input
  usernameElement.replaceWith(input);
  input.focus();
  input.select();

  // Botones de acción
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-success btn-sm ms-2";
  saveBtn.innerHTML = '<i class="bi bi-check"></i>';
  saveBtn.onclick = function () {
    const validatedUsername = validarUsername(input.value.trim());
    if (validatedUsername !== false) {
      guardarUsername(validatedUsername);
    }
  };

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-secondary btn-sm ms-1";
  cancelBtn.innerHTML = '<i class="bi bi-x"></i>';
  cancelBtn.onclick = function () {
    cancelarEdicionUsername(currentUsername);
  };

  // Ocultar botón de editar temporalmente
  document.getElementById("editUsernameBtn").style.display = "none";

  // Insertar botones de acción
  input.parentNode.appendChild(saveBtn);
  input.parentNode.appendChild(cancelBtn);

  // Validar en tiempo real mientras escribe
  input.addEventListener("input", function () {
    validarInputEnTiempoReal(this);
  });

  // Guardar al presionar Enter
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const validatedUsername = validarUsername(input.value.trim());
      if (validatedUsername !== false) {
        guardarUsername(validatedUsername);
      }
    }
  });
}

// Función para validar el username
function validarUsername(username) {
  // Verificar que no esté vacío
  if (!username) {
    alert("El nombre de usuario no puede estar vacío");
    return false;
  }

  // Verificar longitud máxima
  if (username.length > 20) {
    alert("El nombre de usuario no puede tener más de 20 caracteres");
    return false;
  }

  // Verificar caracteres permitidos (solo letras, números y espacios)
  const regex = /^[a-zA-Z0-9 ]+$/;
  if (!regex.test(username)) {
    alert("Solo se permiten letras, números y espacios");
    return false;
  }

  // Verificar espacios consecutivos (más de 1 espacio seguido)
  if (/\s{2,}/.test(username)) {
    alert("No se permiten más de un espacio consecutivo");
    return false;
  }

  // Limpiar espacios extra al inicio y final, y espacios consecutivos
  return username.replace(/\s+/g, " ").trim();
}

// Función para validar en tiempo real mientras escribe
function validarInputEnTiempoReal(input) {
  let value = input.value;

  // Remover caracteres no permitidos
  value = value.replace(/[^a-zA-Z0-9 ]/g, "");

  // Limitar a 20 caracteres
  if (value.length > 20) {
    value = value.substring(0, 20);
  }

  // Limitar espacios consecutivos (máximo 1 espacio)
  value = value.replace(/\s+/g, " ");

  // Actualizar el valor del input
  input.value = value;
}

// Función para guardar el nuevo username
function guardarUsername(newUsername) {
  // Crear nuevo elemento h2
  const newUsernameElement = document.createElement("h2");
  newUsernameElement.className = "mb-0";
  newUsernameElement.id = "usernameText";
  newUsernameElement.textContent = newUsername;

  // Reemplazar el input
  const input = document.querySelector('input[type="text"]');
  input.replaceWith(newUsernameElement);

  // Remover botones de acción
  document.querySelectorAll(".btn-success, .btn-secondary").forEach((btn) => {
    if (btn.closest(".d-flex")) {
      btn.remove();
    }
  });

  // Mostrar botón de editar nuevamente
  document.getElementById("editUsernameBtn").style.display = "inline-block";

  // Guardar en localStorage
  localStorage.setItem("username", newUsername);

  console.log("Username guardado:", newUsername);
}

// Función para cancelar la edición
function cancelarEdicionUsername(oldUsername) {
  // Crear nuevo elemento h2 con el username original
  const usernameElement = document.createElement("h2");
  usernameElement.className = "mb-0";
  usernameElement.id = "usernameText";
  usernameElement.textContent = oldUsername;

  // Reemplazar el input
  const input = document.querySelector('input[type="text"]');
  input.replaceWith(usernameElement);

  // Remover botones de acción
  document.querySelectorAll(".btn-success, .btn-secondary").forEach((btn) => {
    if (btn.closest(".d-flex")) {
      btn.remove();
    }
  });

  // Mostrar botón de editar nuevamente
  document.getElementById("editUsernameBtn").style.display = "inline-block";
}
let textoOriginal = "";
let enModoEdicion = false;

function habilitarEdicion() {
  const textarea = document.getElementById("sobreMiTextarea");
  const btnEdit = document.getElementById("btnEdit");
  const botonesAccion = document.getElementById("botonesAccion");
  const textoEstatico = document.getElementById("textoEstatico");

  // Guardar el texto original del textarea o del texto estático
  if (textarea.value) {
    textoOriginal = textarea.value;
  } else {
    textoOriginal = textoEstatico.innerHTML;
    textarea.value = textoEstatico.innerHTML;
  }

  // Ocultar texto estático y mostrar textarea
  textoEstatico.style.display = "none";
  textarea.style.display = "block";

  // Habilitar edición
  textarea.disabled = false;
  textarea.style.backgroundColor = "white";
  textarea.focus();
  textarea.setSelectionRange(0, 0);

  // Deshabilitar botón de editar
  btnEdit.disabled = true;
  btnEdit.classList.add("disabled");

  // Mostrar botones de acción (guardar y cancelar)
  botonesAccion.style.display = "block";

  enModoEdicion = true;
}

function cancelarEdicion() {
  const textarea = document.getElementById("sobreMiTextarea");
  const btnEdit = document.getElementById("btnEdit");
  const botonesAccion = document.getElementById("botonesAccion");
  const textoEstatico = document.getElementById("textoEstatico");
  const btnSave = document.getElementById("btnSave");

  // Restaurar el texto original
  textarea.value = textoOriginal;

  // Ocultar textarea y mostrar texto estático
  textarea.style.display = "none";
  textoEstatico.style.display = "block";

  // Deshabilitar edición
  textarea.disabled = true;
  textarea.style.backgroundColor = "#f8f9fa";

  // Habilitar botón de editar y ocultar botones de acción
  btnEdit.disabled = false;
  btnEdit.classList.remove("disabled");
  botonesAccion.style.display = "none";
  btnSave.disabled = true;

  enModoEdicion = false;
}

function verificarCambios() {
  const textarea = document.getElementById("sobreMiTextarea");
  const btnSave = document.getElementById("btnSave");

  // Habilitar botón de guardar solo si hay cambios
  if (textarea.value !== textoOriginal && enModoEdicion) {
    btnSave.disabled = false;
  } else {
    btnSave.disabled = true;
  }
}

function guardarCambios() {
  const textarea = document.getElementById("sobreMiTextarea");
  const btnEdit = document.getElementById("btnEdit");
  const botonesAccion = document.getElementById("botonesAccion");
  const textoEstatico = document.getElementById("textoEstatico");
  const btnSave = document.getElementById("btnSave");

  // Actualizar el texto original
  textoOriginal = textarea.value;

  // Actualizar el texto estático
  textoEstatico.innerHTML = textarea.value;

  // Ocultar textarea y mostrar texto estático
  textarea.style.display = "none";
  textoEstatico.style.display = "block";

  // Deshabilitar edición
  textarea.disabled = true;
  textarea.style.backgroundColor = "#f8f9fa";

  // Habilitar botón de editar y ocultar botones de acción
  btnEdit.disabled = false;
  btnEdit.classList.remove("disabled");
  botonesAccion.style.display = "none";
  btnSave.disabled = true;

  enModoEdicion = false;

  console.log("Texto guardado:", textoOriginal);
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("sobreMiTextarea");
  const textoEstatico = document.getElementById("textoEstatico");

  // Ocultar el textarea inicialmente y mostrar el texto estático
  textarea.style.display = "none";
  textoEstatico.style.display = "block";
  previewImage("coverInput", "coverImage");
  previewImage("profileInput", "profileImage");
});

let tipoHabilidadActual = "";

function mostrarModal(tipo) {
  tipoHabilidadActual = tipo;
  const modal = new bootstrap.Modal(document.getElementById("modalHabilidad"));
  const titulo = document.getElementById("modalTitulo");

  if (tipo === "ofrezco") {
    titulo.textContent = "Agregar Habilidad que Ofrezco";
  } else {
    titulo.textContent = "Agregar Habilidad que Busco";
  }

  document.getElementById("inputHabilidad").value = "";
  modal.show();
}

function agregarHabilidad() {
  const input = document.getElementById("inputHabilidad");
  const nombreHabilidad = input.value.trim();

  if (!nombreHabilidad) {
    alert("Por favor ingresa un nombre para la habilidad");
    return;
  }

  const contenedorId =
    tipoHabilidadActual === "ofrezco"
      ? "habilidadesOfrezco"
      : "habilidadesBusco";
  const contenedor = document.getElementById(contenedorId);

  // Determinar la clase según el tipo
  const claseColor =
    tipoHabilidadActual === "ofrezco" ? "habilidad-ofrezco" : "habilidad-busco";

  // Crear el elemento de la habilidad
  const habilidadElement = document.createElement("div");
  habilidadElement.className = `habilidad-badge ${claseColor}`;
  habilidadElement.innerHTML = `
        <button type="button" class="btn-eliminar-habilidad" onclick="eliminarHabilidad(this)">
            <i class="bi bi-x"></i>
        </button>
        <span class="habilidad-texto">${nombreHabilidad}</span>
    `;

  contenedor.appendChild(habilidadElement);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalHabilidad")
  );
  modal.hide();

  // Limpiar el input
  input.value = "";
}

function eliminarHabilidad(boton) {
  const habilidadElement = boton.closest(".habilidad-badge");
  habilidadElement.remove();
}
// Inicializar tooltips para las medallas
document.addEventListener("DOMContentLoaded", function () {
  // ... tu código existente ...

  // Inicializar tooltips de Bootstrap
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      delay: { show: 300, hide: 100 },
    });
  });
});

addElements();
