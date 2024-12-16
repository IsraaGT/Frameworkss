from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import User

# Create your views here.

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Validar usuario en la base de datos
        user = User.objects.filter(username=username, password=password).first()

        if user:
            request.session['username'] = username  # Guardar sesión
            return redirect('index')  # Redirigir al CRUD
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
            return redirect('login')  # Volver al login si las credenciales son inválidas

    return render(request, 'login.html')  # Renderiza el template del login



def logout_view(request):
    logout(request)
    return redirect('login')

def index(request):
    if 'username' not in request.session:
        return redirect('login')  # Redirigir al login si no hay sesión activa
    
    users = User.objects.all()  # Obtener todos los usuarios
    return render(request, 'index.html', {'users': users})  # Renderiza el template index.html

# Crear un nuevo usuario
def add_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        name = request.POST['name']
        password = request.POST['password']
        User.objects.create(username=username, name=name, password=password)
        return redirect('index')

# Editar un usuario existente
def edit_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        user.username = request.POST['username']
        user.name = request.POST['name']
        user.password = request.POST['password']
        user.save()
        return redirect('index')
    return render(request, 'edit.html', {'user': user})

# Eliminar un usuario
def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return redirect('index')