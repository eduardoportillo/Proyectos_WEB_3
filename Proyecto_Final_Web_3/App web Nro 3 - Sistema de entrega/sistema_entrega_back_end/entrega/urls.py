from rest_framework import routers
from django.urls import path, include

from entrega.api.entrega_viewset import EntregaViewSet
from entrega.api.pedido_viewset import PedidoViewSet

router = routers.DefaultRouter()
router.register(r'pedido', PedidoViewSet)
router.register(r'entrega', EntregaViewSet)

urlpatterns = [
    path('', include(router.urls))
]