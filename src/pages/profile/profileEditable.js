// import { addElements } from "/src/common/navElements.js";

// function cambiarBanner(input) {
//   if (input.files && input.files[0]) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       document.getElementById("bannerImage").src = e.target.result;
//       localStorage.setItem("bannerPersonalizado", e.target.result);
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// }

// function cambiarAvatar(input) {
//   if (input.files && input.files[0]) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       document.getElementById("avatarImage").src = e.target.result;
//       localStorage.setItem("avatarPersonalizado", e.target.result);
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const bannerGuardado = localStorage.getItem("bannerPersonalizado");
  const avatarGuardado = localStorage.getItem("avatarPersonalizado");

  if (bannerGuardado) {
    document.getElementById("bannerImage").src = bannerGuardado;
  }
  if (avatarGuardado) {
    document.getElementById("avatarImage").src = avatarGuardado;
  }

  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const textarea = document.getElementById("sobreMiTextarea");
  const textoEstatico = document.getElementById("textoEstatico");
  textarea.style.display = "none";
  textoEstatico.style.display = "block";
});

function cambiarBanner(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("bannerImage").src = e.target.result;

      localStorage.setItem("bannerPersonalizado", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function cambiarAvatar(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("avatarImage").src = e.target.result;

      localStorage.setItem("avatarPersonalizado", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bannerGuardado = localStorage.getItem("bannerPersonalizado");
  const avatarGuardado = localStorage.getItem("avatarPersonalizado");

  if (bannerGuardado) {
    document.getElementById("bannerImage").src = bannerGuardado;
  }

  if (avatarGuardado) {
    document.getElementById("avatarImage").src = avatarGuardado;
  }
});

function editarUsername() {
  const usernameElement = document.getElementById("usernameText");
  const currentUsername = usernameElement.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentUsername;
  input.className =
    "form-control form-control-sm d-inline-block w-auto text-center";
  input.style.fontSize = "1.5rem";
  input.style.fontWeight = "bold";
  input.maxLength = 20;

  usernameElement.replaceWith(input);
  input.focus();
  input.select();

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

  document.getElementById("editUsernameBtn").style.display = "none";

  input.parentNode.appendChild(saveBtn);
  input.parentNode.appendChild(cancelBtn);

  input.addEventListener("input", function () {
    validarInputEnTiempoReal(this);
  });

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const validatedUsername = validarUsername(input.value.trim());
      if (validatedUsername !== false) {
        guardarUsername(validatedUsername);
      }
    }
  });
}

function validarUsername(username) {
  if (!username) {
    alert("El nombre de usuario no puede estar vacío");
    return false;
  }

  if (username.length > 20) {
    alert("El nombre de usuario no puede tener más de 20 caracteres");
    return false;
  }

  const regex = /^[a-zA-Z0-9 ]+$/;
  if (!regex.test(username)) {
    alert("Solo se permiten letras, números y espacios");
    return false;
  }

  if (/\s{2,}/.test(username)) {
    alert("No se permiten más de un espacio consecutivo");
    return false;
  }

  return username.replace(/\s+/g, " ").trim();
}

function validarInputEnTiempoReal(input) {
  let value = input.value;

  value = value.replace(/[^a-zA-Z0-9 ]/g, "");

  if (value.length > 20) {
    value = value.substring(0, 20);
  }

  value = value.replace(/\s+/g, " ");

  input.value = value;
}

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
  // previewImage("coverInput", "coverImage");
  // previewImage("profileInput", "profileImage");
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
async function cargarPerfil() {
  try {
    // 🔹 Tomamos el userId del localStorage
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (!userId) {
      console.error("No se encontró userId en localStorage");
      return;
    }

    // 🔹 Construimos la URL usando el userId
    const url = `https://2gether.duckdns.org/api/v1/users/${userId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    // 🔹 Actualizamos el DOM con los datos
    document.getElementById("usernameText").textContent = data.name;
    document.getElementById("textoEstatico").textContent = data.aboutMe;

    // document.getElementById("bannerImage").src = data.banner;
    // document.getElementById("avatarImage").src = data.avatar;

    // Habilidades que ofrece
    const ofrezcoContenedor = document.getElementById("habilidadesOfrezco");
    ofrezcoContenedor.innerHTML = "";

    const badge = document.createElement("span");
    badge.className = "habilidad-ofrezco";
    badge.textContent = data.skillToTeach;
    ofrezcoContenedor.appendChild(badge);

    // // Habilidades que busca
    const buscoContenedor = document.getElementById("habilidadesBusco");
    buscoContenedor.innerHTML = "";

    const badgeToLearn = document.createElement("span");
    badgeToLearn.className = "habilidad-busco";
    badgeToLearn.textContent = data.skillToLearn;
    buscoContenedor.appendChild(badgeToLearn);
  } catch (error) {
    console.error("❌ Error al cargar el perfil:", error);
  }
}

// Ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", cargarPerfil);
