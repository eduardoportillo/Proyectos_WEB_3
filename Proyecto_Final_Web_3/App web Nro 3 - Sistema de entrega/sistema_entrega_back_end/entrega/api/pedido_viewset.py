from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from entrega.api.entrega_viewset import EntregaSerializer
from entrega.models import Pedido, Entrega, PedidoDetalle


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

        if request.data['entrega_obj']:
            entrega_list = request.data['entrega_obj']
            id_pedido = serializer.data['tracking_id']
            pedido_insertada = Pedido.objects.filter(pk=id_pedido).get()

            obj_entrega = Entrega()
            obj_entrega.longitude_origen = entrega_list['longitude_origen']
            obj_entrega.latitude_origen = entrega_list['latitude_origen']
            obj_entrega.longitude_destino = entrega_list['longitude_destino']
            obj_entrega.latitude_destino = entrega_list['latitude_destino']

            obj_entrega.pedido_id = pedido_insertada
            obj_entrega.save()

            pedido_detalle_list = request.data['pedido_detalle_obj']
            obj_pedido_detalle = PedidoDetalle()

            for pedido in pedido_detalle_list:
                obj_pedido_detalle.descripcion = pedido['descripcion']
                obj_pedido_detalle.cantidad = pedido['cantidad']
                obj_pedido_detalle.precio = pedido['precio']
                obj_pedido_detalle.pedido_id = pedido_insertada
                obj_pedido_detalle.producto_id = pedido['producto_id']
                obj_pedido_detalle.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        no_entrega_obj = {"error": "you didn't pass a entrega_obj o pedido_detalle_obj"}
        return Response(no_entrega_obj, status=status.HTTP_400_BAD_REQUEST, headers=headers)

    @action(detail=True, methods=['get'], url_path='pedidobyuser')
    def getbyuser(self, request, pk):
        list_pedidoByusuario = Pedido.objects.filter(usuario_id=pk)

        serializer = PedidoSerializer(list_pedidoByusuario, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='entrega')
    def getbyentrega(self, request, pk):
        list_entrega_by_pedido = Entrega.objects.filter(pedido_id=pk)

        serializer = EntregaSerializer(list_entrega_by_pedido, many=True)
        return Response(serializer.data)
