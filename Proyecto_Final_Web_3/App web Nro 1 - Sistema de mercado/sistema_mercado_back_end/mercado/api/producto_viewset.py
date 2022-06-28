from rest_framework import serializers, viewsets

from mercado.models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializers
    queryset = Producto.objects.all()
