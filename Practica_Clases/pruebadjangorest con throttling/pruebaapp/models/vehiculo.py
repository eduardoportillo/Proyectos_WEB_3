from django.db import models


class Vehiculo(models.Model):
    marca = models.CharField(max_length=200)
    modelo = models.CharField(max_length=200)
    anio = models.IntegerField()

    def __str__(self):
        return self.marca + ' ' + self.modelo + ' (' + str(self.anio) + ')'
