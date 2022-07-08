from django.http import JsonResponse
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from entrega.api.rastreo_entrega_viewset import RastreoEntregaSerializer
from entrega.models import Entrega, RastreoEntrega


class EntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = '__all__'

class EntregaViewSet(viewsets.ModelViewSet):
    serializer_class = EntregaSerializer
    queryset = Entrega.objects.all()

    @action(detail=True, methods=['get'], url_path='rastreo')
    def getbyentrega(self, request, pk):
        list_rastreo_by_entrega = RastreoEntrega.objects.filter(entrega_id=pk)

        serializer = RastreoEntregaSerializer(list_rastreo_by_entrega, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='pedidopendiente', name='Estado Pendiente')
    def envio_pendiente(self, request, pk=None):
        entrega = get_object_or_404(Entrega, pk=pk)
        entrega.envio_pendiente()
        entrega.save()

        obj_rastreo_entrega = RastreoEntrega()
        obj_rastreo_entrega.longitude = entrega.longitude_origen
        obj_rastreo_entrega.latitude = entrega.latitude_origen
        obj_rastreo_entrega.estado = "Envio Pendiente"
        obj_rastreo_entrega.nombre_ubicacion = request.data['nombre_ubicacion']

        obj_rastreo_entrega.entrega_id = entrega
        obj_rastreo_entrega.save()

        return JsonResponse(
            {"msg": "Rastreo Entrega Registrado estado: Envio Pendiente"}, safe=False, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='encamino', name='Estado en Camino')
    def envio_en_camino(self, request, pk=None):
        entrega = get_object_or_404(Entrega, pk=pk)
        entrega.envio_en_camino()
        entrega.save()

        obj_rastreo_entrega = RastreoEntrega()
        obj_rastreo_entrega.longitude = request.data['longitude']
        obj_rastreo_entrega.latitude = request.data['latitude']
        obj_rastreo_entrega.estado = "Envio En Camino"
        obj_rastreo_entrega.nombre_ubicacion = request.data['nombre_ubicacion']

        obj_rastreo_entrega.entrega_id = entrega
        obj_rastreo_entrega.save()

        return JsonResponse(
            {"msg": "Rastreo Entrega Registrado estado: Envio en Camino"}, safe=False, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='entregado', name='Pedido Entregado')
    def entregado(self, request, pk=None):
        entrega = get_object_or_404(Entrega, pk=pk)
        entrega.entregado()
        entrega.save()

        obj_rastreo_entrega = RastreoEntrega()
        obj_rastreo_entrega.longitude = entrega.longitude_destino
        obj_rastreo_entrega.latitude = entrega.latitude_destino
        obj_rastreo_entrega.estado = "Entregado"
        obj_rastreo_entrega.nombre_ubicacion = request.data['nombre_ubicacion']

        obj_rastreo_entrega.entrega_id = entrega
        obj_rastreo_entrega.save()

        return JsonResponse(
            {"msg": "Rastreo Entrega Registrado estado: Envio Entregado"}, safe=False, status=status.HTTP_201_CREATED)
