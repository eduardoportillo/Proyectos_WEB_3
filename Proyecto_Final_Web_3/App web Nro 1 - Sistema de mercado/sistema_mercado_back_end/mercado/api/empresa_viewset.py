from rest_framework import serializers, viewsets
from rest_framework.decorators import action

from mercado.models import Empresa


class EmpresaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class EmpresaViewSet(viewsets.ModelViewSet):
    serializer_class = EmpresaSerializers
    queryset = Empresa.objects.all()

    # @action(detail=True, methods=['get'], url_path='productobyempres', name='Obtener lista de productos de empresa',)
    # def get_movie_gender(self, request, pk):
    #     list_movieBygender = Empresa.objects.filter(gender_id=pk)
    #
    #     serializer = MovieGenderSerializer(list_movieBygender, many=True)
    #     return Response(serializer.data)