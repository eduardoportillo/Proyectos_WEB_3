from django.db import models

from pruebaapp.models import Vehiculo


class Persona(models.Model):
    GENEROS_CHOICES = [
        (1, 'Masculino'),
        (0, 'Indefinido'),
        (-1, 'Femenino')
    ]

    nombres = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
    edad = models.IntegerField()
    fecha_nacimiento = models.DateField()
    ciudad = models.CharField(max_length=200)
    genero = models.IntegerField(choices=GENEROS_CHOICES)

    # Foreign Keys
    vehiculos = models.ManyToManyField(Vehiculo, related_name="owners")

    def __str__(self):
        return self.nombres + ' ' + self.apellidos + ' (' + str(self.pk) + ')'
