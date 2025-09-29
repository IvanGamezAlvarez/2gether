let textoOriginal = '';
let enModoEdicion = false;

function habilitarEdicion() {
    const textarea = document.getElementById('sobreMiTextarea');
    const btnEdit = document.getElementById('btnEdit');
    const botonesAccion = document.getElementById('botonesAccion');
    const textoEstatico = document.getElementById('textoEstatico');
    
    // Guardar el texto original del textarea o del texto estático
    if (textarea.value) {
        textoOriginal = textarea.value;
    } else {
        textoOriginal = textoEstatico.innerHTML;
        textarea.value = textoEstatico.innerHTML;
    }
    
    // Ocultar texto estático y mostrar textarea
    textoEstatico.style.display = 'none';
    textarea.style.display = 'block';
    
    // Habilitar edición
    textarea.disabled = false;
    textarea.style.backgroundColor = 'white';
    textarea.focus();
    textarea.setSelectionRange(0, 0);
    
    // Deshabilitar botón de editar
    btnEdit.disabled = true;
    btnEdit.classList.add('disabled');
    
    // Mostrar botones de acción (guardar y cancelar)
    botonesAccion.style.display = 'block';
    
    enModoEdicion = true;
}

function cancelarEdicion() {
    const textarea = document.getElementById('sobreMiTextarea');
    const btnEdit = document.getElementById('btnEdit');
    const botonesAccion = document.getElementById('botonesAccion');
    const textoEstatico = document.getElementById('textoEstatico');
    const btnSave = document.getElementById('btnSave');
    
    // Restaurar el texto original
    textarea.value = textoOriginal;
    
    // Ocultar textarea y mostrar texto estático
    textarea.style.display = 'none';
    textoEstatico.style.display = 'block';
    
    // Deshabilitar edición
    textarea.disabled = true;
    textarea.style.backgroundColor = '#f8f9fa';
    
    // Habilitar botón de editar y ocultar botones de acción
    btnEdit.disabled = false;
    btnEdit.classList.remove('disabled');
    botonesAccion.style.display = 'none';
    btnSave.disabled = true;
    
    enModoEdicion = false;
}

function verificarCambios() {
    const textarea = document.getElementById('sobreMiTextarea');
    const btnSave = document.getElementById('btnSave');
    
    // Habilitar botón de guardar solo si hay cambios
    if (textarea.value !== textoOriginal && enModoEdicion) {
        btnSave.disabled = false;
    } else {
        btnSave.disabled = true;
    }
}

function guardarCambios() {
    const textarea = document.getElementById('sobreMiTextarea');
    const btnEdit = document.getElementById('btnEdit');
    const botonesAccion = document.getElementById('botonesAccion');
    const textoEstatico = document.getElementById('textoEstatico');
    const btnSave = document.getElementById('btnSave');
    
    // Actualizar el texto original
    textoOriginal = textarea.value;
    
    // Actualizar el texto estático
    textoEstatico.innerHTML = textarea.value;
    
    // Ocultar textarea y mostrar texto estático
    textarea.style.display = 'none';
    textoEstatico.style.display = 'block';
    
    // Deshabilitar edición
    textarea.disabled = true;
    textarea.style.backgroundColor = '#f8f9fa';
    
    // Habilitar botón de editar y ocultar botones de acción
    btnEdit.disabled = false;
    btnEdit.classList.remove('disabled');
    botonesAccion.style.display = 'none';
    btnSave.disabled = true;
    
    enModoEdicion = false;
    
    console.log('Texto guardado:', textoOriginal);
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('sobreMiTextarea');
    const textoEstatico = document.getElementById('textoEstatico');
    
    // Ocultar el textarea inicialmente y mostrar el texto estático
    textarea.style.display = 'none';
    textoEstatico.style.display = 'block';
    previewImage('coverInput', 'coverImage');
    previewImage('profileInput', 'profileImage');
});


    
let tipoHabilidadActual = '';

function mostrarModal(tipo) {
    tipoHabilidadActual = tipo;
    const modal = new bootstrap.Modal(document.getElementById('modalHabilidad'));
    const titulo = document.getElementById('modalTitulo');
    
    if (tipo === 'ofrezco') {
        titulo.textContent = 'Agregar Habilidad que Ofrezco';
    } else {
        titulo.textContent = 'Agregar Habilidad que Busco';
    }
    
    document.getElementById('inputHabilidad').value = '';
    modal.show();
}

function agregarHabilidad() {
    const input = document.getElementById('inputHabilidad');
    const nombreHabilidad = input.value.trim();
    
    if (!nombreHabilidad) {
        alert('Por favor ingresa un nombre para la habilidad');
        return;
    }
    
    const contenedorId = tipoHabilidadActual === 'ofrezco' ? 'habilidadesOfrezco' : 'habilidadesBusco';
    const contenedor = document.getElementById(contenedorId);
    
    // Determinar la clase según el tipo
    const claseColor = tipoHabilidadActual === 'ofrezco' ? 'habilidad-ofrezco' : 'habilidad-busco';
    
    // Crear el elemento de la habilidad
    const habilidadElement = document.createElement('div');
    habilidadElement.className = `habilidad-badge ${claseColor}`;
    habilidadElement.innerHTML = `
        <button type="button" class="btn-eliminar-habilidad" onclick="eliminarHabilidad(this)">
            <i class="bi bi-x"></i>
        </button>
        <span class="habilidad-texto">${nombreHabilidad}</span>
    `;
    
    contenedor.appendChild(habilidadElement);
    
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalHabilidad'));
    modal.hide();
    
    // Limpiar el input
    input.value = '';
}

function eliminarHabilidad(boton) {
    const habilidadElement = boton.closest('.habilidad-badge');
    habilidadElement.remove();
}