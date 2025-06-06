document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let valido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('passwordConfirm').value;

    clearErrors();

    if (nombre === '') {
        showError('nombreError', 'El nombre es obligatorio');
        valido = false;
    } else if (nombre.length < 4) {
        showError('nombreError', 'El nombre debe tener al menos 4 caracteres');
        valido = false;
    }

    if (email === '') {
        showError('emailError', 'El email es obligatorio');
        valido = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        showError('emailError', 'Email inválido');
        valido = false;
    }

    if (password === '') {
        showError('passwordError', 'La contraseña es obligatoria');
        valido = false;
    } else if (password.length < 6) {
        showError('passwordError', 'La contraseña debe tener al menos 6 caracteres');
        valido = false;
    }

    if (confirm === '') {
        showError('passwordConfirmError', 'Debes confirmar la contraseña');
        valido = false;
    } else if (password !== confirm) {
        showError('passwordConfirmError', 'Las contraseñas no coinciden');
        valido = false;
    }

    // Guardar en localStorage
    if (!valido) return;

    // Guardar en localStorage el usuario actual
    const userData = {
        nombre: nombre,
        email: email,
        password: password
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Guardar en la lista de usuarios registrados
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    usuariosRegistrados.push({ nombre, email, password });
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = '/login/login.html';
});

function showError(id, mensaje) {
    const el = document.getElementById(id);
    el.textContent = mensaje;
    el.style.display = 'block';
    document.getElementById(id.replace('Error', '')).classList.add('input-error');
}

function clearErrors() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(err => {
        err.textContent = '';
        err.style.display = 'none';
    });

    const campos = document.querySelectorAll('.input-error');
    campos.forEach(campo => campo.classList.remove('input-error'));
}

// Validación en tiempo real del nombre
const nombreInput = document.getElementById('nombre');
const nombreError = document.getElementById('nombreError');

nombreInput.addEventListener('input', () => {
    const nombre = nombreInput.value.trim();

    if (nombre.length > 0 && nombre.length < 4) {
        nombreError.textContent = 'Nombre muy corto';
        nombreError.style.display = 'block';
        nombreInput.classList.add('input-error');
    } else {
        nombreError.textContent = '';
        nombreError.style.display = 'none';
        nombreInput.classList.remove('input-error');
    }
});

// Medidor de fuerza de contraseña
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const colors = ['red', 'orange', 'yellow', 'green'];
    const messages = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];

    const width = (strength / 4) * 100;
    strengthBar.style.width = `${width}%`;
    strengthBar.style.background = colors[strength - 1] || 'red';
    strengthText.textContent = messages[strength - 1] || 'Muy débil';
    strengthText.style.color = colors[strength - 1] || 'red';
});

// Validación en tiempo real de coincidencia de contraseñas
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const passwordConfirmError = document.getElementById('passwordConfirmError');

function validarCoincidenciaContrasena() {
    const password = passwordInput.value;
    const confirmPassword = passwordConfirmInput.value;

    if (confirmPassword.length === 0) {
        passwordConfirmError.textContent = '';
        passwordConfirmError.style.display = 'none';
        passwordConfirmInput.classList.remove('input-error');
        return;
    }

    if (password !== confirmPassword) {
        passwordConfirmError.textContent = 'Las contraseñas no coinciden';
        passwordConfirmError.className = 'error incorrecto';
        passwordConfirmError.style.display = 'block';
        passwordConfirmInput.classList.add('input-error');
    } else {
        passwordConfirmError.textContent = 'Las contraseñas coinciden';
        passwordConfirmError.className = 'error correcto';
        passwordConfirmError.style.display = 'block';
        passwordConfirmInput.classList.remove('input-error');
    }
}

passwordInput.addEventListener('input', validarCoincidenciaContrasena);
passwordConfirmInput.addEventListener('input', validarCoincidenciaContrasena);
