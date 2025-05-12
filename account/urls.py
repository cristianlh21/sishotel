from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('register/', views.register, name='register'),
    
    path("validar/username/", views.validar_username_htmx, name="validar_username_htmx"),
    path("validar/email/", views.validar_email_htmx, name="validar_email_htmx"),
    path("validar/passwords/", views.validar_passwords_htmx, name="validar_passwords_htmx"),
    
    
    path('ajax/check-username/', views.check_username, name='check_username'),
    path('ajax/check-email/', views.check_email, name='check_email'),
]