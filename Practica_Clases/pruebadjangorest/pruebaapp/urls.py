from django.urls import path, include
from rest_framework import routers

from pruebaapp.api import PersonaViewSet, MascotaViewSet, VehiculoViewSet

router = routers.DefaultRouter()
router.register(r'personas', PersonaViewSet)
router.register(r'mascotas', MascotaViewSet)
router.register(r'vehiculos', VehiculoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
