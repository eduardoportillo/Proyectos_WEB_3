from rest_framework import viewsets, serializers, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from pedidos.models import Pedido, DetallePedido


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'


class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        if request.data['detalle']:
            detalle_list = request.data['detalle']
            id_pedido = serializer.data['id']
            for detalle in detalle_list:
                obj_detalle = DetallePedido()
                obj_detalle.producto = detalle['producto']
                obj_detalle.pedido = id_pedido
                obj_detalle.cantidad = detalle['cantidad']
                obj_detalle.precio = detalle['precio']
                obj_detalle.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'], url_path='confirmar', name='Confirmar pedido')
    def confirmar_pedido(self, request, pk=None):
        pedido = get_object_or_404(Pedido, pk=pk)
        pedido.confirmar_pedido()
        pedido.save()
        serializer = PedidoSerializer(pedido, many=False)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='chofer_con_pedido', name='Chofer obtuvo el pedido')
    def chofer_tiene_pedido(self, request, pk=None):
        pedido = get_object_or_404(Pedido, pk=pk)
        pedido.chofer_tiene_pedido()
        pedido.save()
        serializer = PedidoSerializer(pedido, many=False)
        return Response(serializer.data)
