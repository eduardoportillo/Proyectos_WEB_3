from django.db import models


class Chofer(models.Model):
    nombres = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
