from rest_framework import serializers, viewsets, status

from entrega.models import RastreoEntrega


class RastreoEntregaSerializer(serializers.ModelSerializer):

    class Meta:
        model = RastreoEntrega
        fields = '__all__'

class RastreoEntregaViewSet(viewsets.ModelViewSet):
    serializer_class = RastreoEntregaSerializer
    queryset = RastreoEntrega.objects.all()