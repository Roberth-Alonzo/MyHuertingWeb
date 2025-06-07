// Función para mostrar error debajo del input/select
function mostrarError(input, mensaje) {
    limpiarError(input);
    const divError = document.createElement('div');
    divError.className = 'error';
    divError.textContent = mensaje;
    divError.style.color = 'red';
    divError.style.fontSize = '0.9em';
    divError.style.marginTop = '4px';

    input.insertAdjacentElement('afterend', divError);
}

// Limpiar error específico debajo del input
function limpiarError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains('error')) {
        next.remove();
    }
}

// Limpiar todos los errores del formulario
function limpiarErrores() {
    document.querySelectorAll('.error').forEach(div => div.remove());
}

// Cargar miembros desde localStorage
function cargarMiembros() {
    const selectMiembro = document.getElementById("miembro");
    if (!selectMiembro) return;

    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.nombre;
        option.textContent = usuario.nombre;
        selectMiembro.appendChild(option);
    });
}

// Validar formulario, mostrar errores debajo y devolver booleano
function validarFormulario() {
    limpiarErrores();

    const titulo = document.getElementById('titulo');
    const miembro = document.getElementById('miembro');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const descripcion = document.getElementById('descripcion');
    const archivoInput = document.getElementById('archivo');
    const archivo = archivoInput.files[0];

    let valido = true;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(fecha.value);

    if (!titulo.value.trim() || titulo.value.trim().length < 5) {
        mostrarError(titulo, 'El título es obligatorio y debe tener al menos 5 caracteres.');
        valido = false;
    } else if (titulo.length > 20) {
        document.getElementById('error-nombre').textContent = 'El título no debe tener más de 20 caracteres.';
        valido = false;
    }

    if (!miembro.value) {
        mostrarError(miembro, 'Por favor, asigna un usuario a la tarea.');
        valido = false;
    }

    if (fecha.value) {
        const parts = fecha.value.split('-');
        const fechaSeleccionada = new Date(parts[0], parts[1] - 1, parts[2]);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < hoy) {
            mostrarError(fecha, 'La fecha no puede ser anterior al día de hoy.');
            valido = false;
        }
    } else {
        mostrarError(fecha, 'La fecha es obligatoria.');
        valido = false;
    }

    if (!hora.value) {
        mostrarError(hora, 'La hora es obligatoria.');
        valido = false;
    }

    if (!descripcion.value.trim() || descripcion.value.trim().length < 5) {
        mostrarError(descripcion, 'La descripción es obligatoria y debe tener al menos 5 caracteres.');
        valido = false;
    } else if (descripcion.length > 300) {
        document.getElementById('error-observaciones').textContent = 'La descripción no pueden tener más de 300 caracteres.';
        valido = false;
    }

    if (archivo) {
        if (archivo.type !== "application/pdf") {
            mostrarError(archivoInput, 'Solo se permiten archivos en formato PDF.');
            valido = false;
        }
    const maxSizeMB = 2;
        if (archivo.size > maxSizeMB * 1024 * 1024) {
            mostrarError(archivoInput, `El archivo no debe superar los ${maxSizeMB} MB.`);
            valido = false;
        }
    }

    return valido;
}

// Guardar nueva tarea con validaciones
function guardarTarea(e) {
    e.preventDefault();

    if (!validarFormulario()) {
        return false;
    }

    const titulo = document.getElementById('titulo').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const miembro = document.getElementById('miembro').value;

    const tarea = {
        titulo,
        fecha,
        hora,
        descripcion,
        miembro,
        estado: "Pendiente"
    };

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    alert("¡Tarea programada exitosamente!");
    window.location.href = "tareas.html";

    return true;
}

// Mostrar tareas en tabla
function cargarTareas() {
    const tbody = document.querySelector("#tabla-tareas tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    if (tareas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No hay tareas programadas.</td></tr>`;
        return;
    }

    tareas.forEach((tarea, index) => {
        if (!tarea.titulo || !tarea.fecha || !tarea.hora || !tarea.descripcion) return;

    const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${tarea.titulo}</td>
            <td>${tarea.fecha}</td>
            <td>${tarea.hora}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.archivo ? `<a href="${tarea.archivo}" target="_blank">Ver PDF</a>` : "No adjunto"}</td>
            <td>${tarea.miembro || 'Sin asignar'}</td>
            <td class="${tarea.estado === 'Realizada' ? 'estado-realizada' : 'estado-pendiente'}">${tarea.estado}</td>
            <td><button class="btn-eliminar" onclick="eliminarTarea(${index})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarTarea(index) {
    if (!confirm("¿Deseas eliminar esta tarea?")) return;
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
}

// Evento al cargar DOM
document.addEventListener("DOMContentLoaded", function () {
    cargarMiembros();
    cargarTareas();

    // Agregar listener al formulario para controlar submit
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', guardarTarea);
    }
});
