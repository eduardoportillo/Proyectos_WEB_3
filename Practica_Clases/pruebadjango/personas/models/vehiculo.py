from django.db import models

from personas.models import Persona


class Vehiculo(models.Model):
    TIPO_CHOICES = [
        (0, 'Auto'),
        (1, 'Moto'),
        (2, 'Bote'),
    ]
    marca_modelo = models.CharField(max_length=200)
    tipo = models.IntegerField(choices=TIPO_CHOICES)

    # Foreign Keys
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='vehiculos')
