from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from mercado.models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        # depth = 1


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializers
    queryset = Producto.objects.all()

    @action(detail=True, methods=['get'], url_path='getbyempresa')
    def getbyempresa(self, request, pk):
        list_productoByempresa = Producto.objects.filter(empresa_id=pk)

        serializer = ProductoSerializers(list_productoByempresa, many=True)
        return Response(serializer.data)
