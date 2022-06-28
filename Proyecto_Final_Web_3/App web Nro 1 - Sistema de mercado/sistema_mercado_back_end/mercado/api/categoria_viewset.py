from rest_framework import serializers, viewsets

from mercado.models import Categoria


class CategoriaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class CategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializers
    queryset = Categoria.objects.all()