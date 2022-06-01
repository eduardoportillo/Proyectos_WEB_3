from rest_framework import serializers, viewsets

from entidades.api import MovieSerializer, GenderSerializer
from entidades.models import Movie, MovieGender, Gender


class MovieGenderSerializer(serializers.ModelSerializer):
    movie_id = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Movie.objects.all(),
        source="movie"
    )
    movie = MovieSerializer(many=True, read_only=True)

    gender_id = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Gender.objects.all(),
        source="gender"
    )
    gender = GenderSerializer(many=True, read_only=True)

    class Meta:
        model = MovieGender
        fields = '__all__'


class MovieGenderViewSet(viewsets.ModelViewSet):
    serializer_class = MovieGenderSerializer
    queryset = Movie.objects.all()
