from django.urls import path, include
from rest_framework import routers

from mercado.api.categoria_viewset import CategoriaViewSet
from mercado.api.empresa_viewset import EmpresaViewSet
from mercado.api.producto_viewset import ProductoViewSet

router = routers.DefaultRouter()
router.register(r'empresa', EmpresaViewSet)
router.register(r'producto', ProductoViewSet)
router.register(r'categoria', CategoriaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
