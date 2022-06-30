from rest_framework import serializers, viewsets

from entrega.api.pedido_viewset import PedidoSerializer
from entrega.models import Entrega, Pedido


class EntregaSerializer(serializers.ModelSerializer):
    pedido_id = serializers.PrimaryKeyRelatedField(
        many=False,
        write_only=True,
        queryset=Pedido.objects.all(),
        source="pedido"
    )
    pedido = PedidoSerializer(many=False, read_only=True)

    class Meta:
        model = Entrega
        fields = '__all__'


class EntregaViewSet(viewsets.ModelViewSet):
    serializer_class = EntregaSerializer
    queryset = Entrega.objects.all()
