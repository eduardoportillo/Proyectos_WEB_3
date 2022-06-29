from rest_framework import viewsets, serializers

from pruebaapp.models import Vehiculo


class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'


class VehiculoViewSet(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    queryset = Vehiculo.objects.all()
