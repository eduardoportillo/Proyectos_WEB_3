from django.db import models

from entidades.models import Movie, Gender

class MovieGender(models.Model):

    movie = models.ForeignKey(Movie, null=True, on_delete=models.CASCADE, related_name='movie_genders')
    gender = models.ForeignKey(Gender, null=True, on_delete=models.CASCADE, related_name='movie_genders')
