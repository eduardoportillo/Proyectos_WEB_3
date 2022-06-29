from django.db import models


class Cliente(models.Model):
    nombres = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
