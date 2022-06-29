from rest_framework import serializers, viewsets

from pedidos.models import Restaurante


class RestauranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurante
        fields = '__all__'


class RestauranteViewSet(viewsets.ModelViewSet):
    serializer_class = RestauranteSerializer
    queryset = Restaurante.objects.all()
