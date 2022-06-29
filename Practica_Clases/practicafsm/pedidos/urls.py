from django.urls import path, include
from rest_framework import routers

from pedidos.api import PedidoViewSet, ProductoViewSet, RestauranteViewSet, ClienteViewSet

router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'restaurantes', RestauranteViewSet)

urlpatterns = [
    path('', include(router.urls))
]
