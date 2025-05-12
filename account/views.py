from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.models import User
from .forms import UserRegisterForm

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserRegisterForm()
        
    template = "account/account_form.html" if request.htmx else 'account/registro_form.html'
    print(template)
    return render(request, template , {'form': form})

def validar_username_htmx(request):
    username = request.GET.get("username", "")
    if User.objects.filter(username=username).exists():
        return HttpResponse('<div class="error">Este nombre de usuario ya está en uso.</div>')
    return HttpResponse("")

def validar_email_htmx(request):
    email = request.GET.get("email", "")
    print(email)
    if User.objects.filter(email=email).exists():
        return HttpResponse('<div class="error">Este correo electrónico ya está registrado.</div>')
    return HttpResponse("")

def validar_passwords_htmx(request):
    password1 = request.GET.get("password1", "")
    password2 = request.GET.get("password2", "")
    print(password1, password2)
    if password1 and password2 and password1 != password2:
        return HttpResponse('<div class="error">Las contraseñas no coinciden.</div>')
    
    return HttpResponse("")  # Sin mensaje si coinciden o están vacías

def check_username(request):
    username = request.GET.get('username', None)
    exists = User.objects.filter(username=username).exists()
    return JsonResponse({'exists': exists})

def check_email(request):
    email = request.GET.get('email', '')
    exists = User.objects.filter(email=email).exists()
    return JsonResponse({'exists': exists})