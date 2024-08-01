from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.api_overview, name='api-overview'),
    # Otras rutas de la API
]