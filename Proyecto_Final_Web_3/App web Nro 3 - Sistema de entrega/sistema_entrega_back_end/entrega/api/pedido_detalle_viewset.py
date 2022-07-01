from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from entrega.models import PedidoDetalle


class PedidoDetalleSerializer(serializers.ModelSerializer):

    class Meta:
        model = PedidoDetalle
        fields = '__all__'

class PedidoDetalleViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoDetalleSerializer
    queryset = PedidoDetalle.objects.all()