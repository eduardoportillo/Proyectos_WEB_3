from rest_framework import routers
from django.urls import path, include

from entrega.api.entrega_viewset import EntregaViewSet
from entrega.api.pedido_detalle_viewset import PedidoDetalleViewSet
from entrega.api.pedido_viewset import PedidoViewSet
from entrega.api.rastreo_entrega_viewset import RastreoEntregaViewSet

router = routers.DefaultRouter()
router.register(r'pedido', PedidoViewSet)
router.register(r'entrega', EntregaViewSet)
router.register(r'rastreo', RastreoEntregaViewSet)
router.register(r'pedidodetalle', PedidoDetalleViewSet)

urlpatterns = [
    path('', include(router.urls))
]