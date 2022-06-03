from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from entidades.api import MovieSerializer, GenderSerializer
from entidades.models import MovieGender, Movie, Gender


class MovieGenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieGender
        fields = '__all__'
        depth = 1


class MovieGenderViewSet(viewsets.ModelViewSet):
    serializer_class = MovieGenderSerializer
    queryset = MovieGender.objects.all()

    @action(detail=True, methods=['get'], url_path='list', name='Obtener lista de pelicula por genero',
            permission_classes=([IsAuthenticated]))
    def get_movie_gender(self, request, pk):
        list_movieBygender = MovieGender.objects.filter(gender_id=pk)

        serializer = MovieGenderSerializer(list_movieBygender, many=True)
        return Response(serializer.data)
