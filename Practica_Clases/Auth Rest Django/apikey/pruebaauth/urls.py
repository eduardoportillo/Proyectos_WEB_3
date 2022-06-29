from django.urls import include, path
from rest_framework import routers

from pruebaauth.api import PersonaViewSet

router = routers.DefaultRouter()
router.register(r'personas', PersonaViewSet)

urlpatterns = [
    path('', include(router.urls))
]
