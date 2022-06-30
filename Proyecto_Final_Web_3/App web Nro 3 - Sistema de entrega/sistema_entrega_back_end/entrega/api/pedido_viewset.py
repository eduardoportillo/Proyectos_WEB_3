from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from entrega.models import Pedido, Entrega


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

        if request.data['entrega_obj ']:
            entrega_list = request.data['entrega_obj ']
            id_pedido = serializer.data['tracking_id']
            pedido_insertada = Pedido.objects.filter(pk=id_pedido).get()

            # for entrega in entrega_list:
            obj_entrega = Entrega()
            obj_entrega.longitud_origen = entrega_list['longitud_origen']
            obj_entrega.latitud_origen = entrega_list['latitud_origen']
            obj_entrega.longitud_destino = entrega_list['longitud_destino']
            obj_entrega.latitud_destino = entrega_list['latitud_destino']

            obj_entrega.pedido_id = pedido_insertada
            obj_entrega.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        no_entrega_obj = {"error": "you didn't pass a entrega_obj"}
        return Response(no_entrega_obj, status=status.HTTP_400_BAD_REQUEST, headers=headers)