import json

from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from entidades.models import Movie, MovieGender


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        depth = 1


class MovieViewSet(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        genders = request.POST.get('genders', False)

        if genders:
            genderJson = json.loads(genders)

            movie_id = serializer.data['id']

            for key in genderJson:
                MovieGender.objects.create(movie_id=movie_id, gender_id=genderJson[key])

            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        no_gender_id = {"error": "you didn't pass a gender_id"}
        return Response(no_gender_id, status=status.HTTP_400_BAD_REQUEST, headers=headers)
