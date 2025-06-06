document.addEventListener('DOMContentLoaded', mostrarCultivos);

const form = document.getElementById('cultivoForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Limpiar errores
        document.getElementById('error-nombre').textContent = '';
        document.getElementById('error-fecha').textContent = '';
        document.getElementById('error-cantidad').textContent = '';
        document.getElementById('error-observaciones').textContent = '';

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const fecha = document.getElementById('fecha').value;
        const cantidad = document.getElementById('cantidad').value.trim();
        const observaciones = document.getElementById('observaciones').value.trim();

        let valido = true;

        // Validar campos
        if (nombre === '') {
            document.getElementById('error-nombre').textContent = 'Por favor, ingresa el nombre del cultivo.';
            valido = false;
        } else if (nombre.length < 3) {
            document.getElementById('error-nombre').textContent = 'El nombre debe tener al menos 3 caracteres.';
            valido = false;
        } else if (nombre.length > 20) {
            document.getElementById('error-nombre').textContent = 'El nombre no debe tener más de 20 caracteres.';
            valido = false;
        }

        if (fecha === '') {
            document.getElementById('error-fecha').textContent = 'Por favor, selecciona una fecha de siembra.';
            valido = false;
        }

        if (cantidad === '') {
            document.getElementById('error-cantidad').textContent = 'Por favor, ingresa la cantidad sembrada.';
            valido = false;
        } else if (parseInt(cantidad) <= 0) {
            document.getElementById('error-cantidad').textContent = 'La cantidad debe ser mayor que cero.';
            valido = false;
        }

        if (observaciones !== '' && observaciones.length < 5) {
            document.getElementById('error-observaciones').textContent = 'Las observaciones deben tener al menos 5 caracteres si se escriben.';
            valido = false;
        } else if (observaciones.length > 300) {
            document.getElementById('error-observaciones').textContent = 'Las observaciones no pueden tener más de 300 caracteres.';
            valido = false;
        }

        // Guardar solo si es válido
        if (valido) {
            const cultivo = { nombre, fecha, cantidad, observaciones };

            let cultivos = JSON.parse(localStorage.getItem('cultivos')) || [];
            cultivos.push(cultivo);
            localStorage.setItem('cultivos', JSON.stringify(cultivos));

            this.reset();
            mostrarCultivos();

            alert('✅ Cultivo agregado correctamente.');
            window.location.href = '/Funciones/gestionarCultivos/listaCultivos.html';
        }
    });
}

function mostrarCultivos() {
    const lista = document.getElementById('contenedorCultivos');
    if (!lista) return;

    lista.innerHTML = '';

    const cultivos = JSON.parse(localStorage.getItem('cultivos')) || [];

    cultivos.forEach((cultivo, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-cultivo';
        tarjeta.innerHTML = `
            <h3>${cultivo.nombre}</h3>
            <p><strong>Fecha:</strong> ${cultivo.fecha}</p>
            <p><strong>Unidades:</strong> ${cultivo.cantidad}</p>
            <p><strong>Observaciones:</strong> ${cultivo.observaciones || 'Ninguna'}</p>

            <form onsubmit="return confirmarEliminacion(${index})">
                <button type="submit" class="delete-btn">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="30" width="30">
                            <path d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                    </span>
                </button>
            </form>
        `;
        lista.appendChild(tarjeta);
    });
}

// Función global para confirmar y eliminar
function confirmarEliminacion(index) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este cultivo? Los usuarios no podrán tener acceso a este");
    if (confirmar) {
        let cultivos = JSON.parse(localStorage.getItem('cultivos')) || [];
        cultivos.splice(index, 1);
        localStorage.setItem('cultivos', JSON.stringify(cultivos));
        mostrarCultivos();
        alert("✅ Cultivo eliminado correctamente.");
    }
    return false; 
}
