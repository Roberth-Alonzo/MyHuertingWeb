document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('input').value;

    const storedData = JSON.parse(localStorage.getItem('userData'));

    const errorMessage = document.getElementById('loginError');

    if (storedData && storedData.email === emailInput && storedData.password === passwordInput) {
        window.location.href = '/menuPrincipal/menuPrincipal.html'; 
    } else {
        if (!errorMessage) {
            const div = document.querySelector('.input-div.pass');
            const error = document.createElement('span');
            error.id = 'loginError';
            error.style.color = 'red';
            error.style.fontSize = '0.9em';
            error.textContent = 'Credenciales incorrectas';
            div.appendChild(error);
        } else {
            errorMessage.textContent = 'Credenciales incorrectas';
        }
    }
});
