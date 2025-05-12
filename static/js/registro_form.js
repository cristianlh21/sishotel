const container = document.querySelector('.container');
const LoginLink = document.querySelector('.LogInLink');
const RegisterLink = document.querySelector(".RegisterLink");

RegisterLink.addEventListener('click', ()=>{
    container.classList.add('active');
})

LoginLink.addEventListener('click', ()=>{
    container.classList.remove('active');
})