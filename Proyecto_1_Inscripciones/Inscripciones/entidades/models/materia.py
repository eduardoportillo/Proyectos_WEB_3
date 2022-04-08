from django.db import models

class Materia(models.Model):
    nombres = models.CharField(max_length=200)
    semestre = models.IntegerField()
    carrera = models.CharField(max_length=200)