document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const geolocalizaciónBtn = document.getElementById('obtenerUbicacionBtn');
    const nivelEducativoSelect = document.getElementById('nivelEducativo');

    // Vista previa de la foto de perfil
const inputFoto = document.getElementById('subir-foto');
const vistaPrevia = document.getElementById('vista-previa');
const selectorSpan = document.querySelector('.selector-foto span');

// Añade un "escuchador de eventos" al input
inputFoto.addEventListener('change', function() {
  const archivo = this.files[0]; // Obtiene el primer archivo seleccionado
  
  if (archivo) {
    const lector = new FileReader(); // Crea un lector de archivos
    
    // Cuando el lector termine de cargar
    lector.onload = function(evento) {
      // Muestra la vista previa y su src es el resultado del lector
      vistaPrevia.src = evento.target.result;
      vistaPrevia.style.display = 'block';
      selectorSpan.textContent = 'Cambiar foto'; // Cambia el texto del botón
    };
    
    // Lee el archivo como una URL de datos (base64)
    lector.readAsDataURL(archivo);
  } else {
    // Si no hay archivo, oculta la vista previa y reinicia el texto
    vistaPrevia.src = '#';
    vistaPrevia.style.display = 'none';
    selectorSpan.textContent = 'Seleccionar foto';
  }
});



    form.addEventListener('submit', function(event) {
        // Detener el envío del formulario si no es válido
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Aplicar la clase de validación de Bootstrap
        form.classList.add('was-validated');

        // Validaciones personalizadas
        validarEmail();
        validarTelefono();
        validarContrasena();
        validarConfirmacionContrasena();
        validarFechaNacimiento();
        validarqueAprender();
        validarqueEnsenar();
        mostrarNivelEducativo();
    }, false);

    // Eventos 'input' para validación en tiempo real
    emailInput.addEventListener('input', validarEmail);
    telefonoInput.addEventListener('input', validarTelefono);
    passwordInput.addEventListener('input', validarContrasena);
    confirmPasswordInput.addEventListener('input', validarConfirmacionContrasena);

    function validarEmail() {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(emailInput.value)) {
            emailInput.setCustomValidity("Email inválido.");
        } else {
            emailInput.setCustomValidity("");
        }
    }
// Validar fecha de nacimiento y calcular edad
    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const fechaActual = new Date();
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimientoDate.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
            edad--;
        }
        if (edad < 18) {
            document.getElementById('resultado').innerHTML = "<p class='menor-edad'>Eres menor de edad.</p>";
        } else {
            document.getElementById('resultado').innerHTML = "<p class='mayor-edad'>Eres mayor de edad.</p>";
        }
    }
//* Validar teléfono
    function validarTelefono() {
        const regexTelefono = /^[0-9]{10}$/;
        if (!regexTelefono.test(telefonoInput.value)) {
            telefonoInput.setCustomValidity("El teléfono debe tener 10 dígitos.");
        } else {
            telefonoInput.setCustomValidity("");
        }
    }
    //*validar contraseña

    function validarContrasena() {
        if (passwordInput.value.length < 8) {
            passwordInput.setCustomValidity("La contraseña debe tener al menos 8 caracteres.");
        } else {
            passwordInput.setCustomValidity("");
        }
        // También valida la confirmación de la contraseña
        validarConfirmacionContrasena();
    }

    function validarConfirmacionContrasena() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }
});


/*nivel educativo*/
function mostrarNivelEducativo() {
    const nivelEducativo = document.getElementById('nivelEducativo').value;
    const resultado = document.getElementById('resultadoNivelEducativo');

    if (nivelEducativo) {
        resultado.textContent = `Tu nivel educativo es: ${nivelEducativo}`;
    } else {
        resultado.textContent = "Por favor, selecciona un nivel educativo.";
        validarNivelEducativo();
    }
}

// Evento para actualizar el nivel educativo al cambiar la selección
document.getElementById('nivelEducativo').addEventListener('change', mostrarNivelEducativo);

// Que deseas enseñar
function mostrarQueEnsenar() {
    const queEnsenar = document.getElementById('queEnsenar').value;
    const resultado = document.getElementById('resultadoQueEnsenar');

    if (queEnsenar) {
        resultado.textContent = `Deseas enseñar: ${queEnsenar}`;
    } else {
        resultado.textContent = "Por favor, ingresa un campo de enseñanza.";
        validarQueEnsenar();
    }
}
// Evento para actualizar lo que deseas enseñar al cambiar el valor
document.getElementById('queEnsenar').addEventListener('input', mostrarQueEnsenar);
// Que deseas enseñar - Validación
function validarQueEnsenar() {
    const queEnsenar = document.getElementById('queEnsenar').value;
    if (!queEnsenar) {
        alert("Por favor, ingresa un campo de enseñanza.");
    }
}

// que deseas aprender
function mostrarQueAprender() {
    const queAprender = document.getElementById('queAprender').value;
    const resultado = document.getElementById('resultadoQueAprender');
    if (queAprender) {
        resultado.textContent = `Deseas aprender: ${queAprender}`;
    } else {
        resultado.textContent = "Por favor, ingresa un campo de aprendizaje.";
        validarQueAprender();
    }
}
// Geolocalización

document.getElementById('obtenerUbicacionBtn').addEventListener('click', () => {
    const ubicacionInfo = document.getElementById('ubicacionInfo');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;
                ubicacionInfo.innerHTML = `
                    <p><strong>Latitud:</strong> ${latitud.toFixed(4)}</p>
                    <p><strong>Longitud:</strong> ${longitud.toFixed(4)}</p>
                `;
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        ubicacionInfo.textContent = "El usuario denegó la solicitud de geolocalización.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        ubicacionInfo.textContent = "La información de ubicación no está disponible.";
                        break;
                    case error.TIMEOUT:
                        ubicacionInfo.textContent = "La solicitud de ubicación ha caducado.";
                        break;
                    case error.UNKNOWN_ERROR:
                        ubicacionInfo.textContent = "Ha ocurrido un error desconocido.";
                        break;
                }
            }
        );
    } else {
        ubicacionInfo.textContent = "Tu navegador no soporta la API de Geolocalización.";
        ubicacionInfo.style.display = "block";
    }
});

 if (isValid) {
            // Si la validación es exitosa
            const usuario = {
                nombre: nombre,
                cedula: cedula,
                direccion: direccion,
                telefono: telefono,
                correoElectronico: email,
            };

            // Creación del modelo JSON
            console.log('Usuario registrado (formato JSON):', JSON.stringify(usuario, null, 2));

            // Muestra una alerta de éxito
            alertContainer.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Registro exitoso!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            // Limpiar el formulario
            form.reset();
        }


















































