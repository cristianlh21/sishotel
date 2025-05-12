
const container =document.querySelector('.container');
const btnSignIn = document.getElementById('btn-sing-in');
const btnSignUp = document.getElementById('btn-sing-up');

btnSignIn.addEventListener('click', ()=>{
    container.classList.remove('toggle');
})

btnSignUp.addEventListener('click', ()=>{
    container.classList.add('toggle');
})


function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}


document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('id_username');
    const emailInput = document.getElementById('id_email');
    const password1Input = document.getElementById('id_password1');
    const password2Input = document.getElementById('id_password2');

    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const password1Error = document.getElementById('password1-error');
    const password2Error = document.getElementById('password2-error');

    const submitBtn = document.getElementById('submit-btn');

    let usernameValid = false;
    let emailValid = false;
    let passwordValid = false;
    let passwordMatch = false;

    function toggleSubmit() {
        submitBtn.disabled = !(usernameValid && emailValid && passwordValid && passwordMatch);
    }

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const checkUsername = debounce(function () {
        const username = usernameInput.value.trim();
        if (username.length > 2) {
            fetch(`/ajax/check-username/?username=${encodeURIComponent(username)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exists) {
                        usernameError.textContent = 'Este nombre de usuario ya está en uso.';
                        usernameValid = false;
                    } else {
                        usernameError.textContent = '';
                        usernameValid = true;
                    }
                    toggleSubmit();
                });
        } else {
            usernameError.textContent = 'Debe tener al menos 3 caracteres.';
            usernameValid = false;
            toggleSubmit();
        }
    }, 300);

    const checkEmail = debounce(function () {
        const email = emailInput.value.trim();
        if (email.length > 5 && email.includes('@')) {
            fetch(`/ajax/check-email/?email=${encodeURIComponent(email)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exists) {
                        emailError.textContent = 'Este correo ya está registrado.';
                        emailValid = false;
                    } else {
                        emailError.textContent = '';
                        emailValid = true;
                    }
                    toggleSubmit();
                });
        } else {
            emailError.textContent = 'Email inválido.';
            emailValid = false;
            toggleSubmit();
        }
    }, 300);

    function checkPasswordStrength() {
        const pwd = password1Input.value.trim();
        const bar = document.getElementById('password-strength-bar');
        let strength = 0;

        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[\W_]/.test(pwd)) strength++; // símbolos

        // Establecer el porcentaje de la barra
        let width = (strength / 5) * 100;
        bar.style.width = `${width}%`;

        // Determinar la clase según la fortaleza
        if (strength <= 2) {
            bar.className = 'weak'; // Rojo
            bar.classList.add('weak');
        } else if (strength === 3 || strength === 4) {
            bar.className = 'medium'; // Naranja
            bar.classList.add('medium');
        } else if (strength === 5) {
            bar.className = 'strong'; // Verde
            bar.classList.add('strong');
        }

        if (strength <= 2) {
            bar.style.backgroundColor = 'weak';
            password1Error.textContent = 'Contraseña débil.';
            password1Error.classList.toggle('debil');
            passwordValid = false;
        } else if (strength === 3 || strength === 4) {
            bar.style.backgroundColor = 'medium';
            password1Error.textContent = 'Contraseña aceptable.';
            password1Error.classList.toggle('medio');
            passwordValid = true;
        } else if (strength === 5) {
            bar.style.backgroundColor = 'strong';
            password1Error.textContent = '';
            password1Error.classList.toggle('fuerte');
            passwordValid = true;
        }

    checkPasswordMatch();
    toggleSubmit();
    }

    function checkPasswordMatch() {
        const pwd1 = password1Input.value.trim();
        const pwd2 = password2Input.value.trim();

        if (pwd2 && pwd1 !== pwd2) {
            password2Error.textContent = 'Las contraseñas no coinciden.';
            passwordMatch = false;
        } else {
            password2Error.textContent = '';
            passwordMatch = true;
        }

        toggleSubmit();
    }

    if (usernameInput) usernameInput.addEventListener('input', checkUsername);
    if (emailInput) emailInput.addEventListener('input', checkEmail);
    if (password1Input) password1Input.addEventListener('input', checkPasswordStrength);
    if (password2Input) password2Input.addEventListener('input', checkPasswordMatch);

    toggleSubmit(); // estado inicial
});

