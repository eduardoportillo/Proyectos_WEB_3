from django.db import models


class Restaurante(models.Model):
    latitud = models.CharField(max_length=200)
    longitud = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
