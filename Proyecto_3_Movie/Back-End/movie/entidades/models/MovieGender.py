from django.db import models

from entidades.models import Movie, Gender


class MovierGender(models.Model):

    movie = models.ForeignKey(Movie, null=True, on_delete=models.CASCADE, related_name='movie')
    gender = models.ForeignKey(Gender, null=True, on_delete=models.CASCADE, related_name='gender')