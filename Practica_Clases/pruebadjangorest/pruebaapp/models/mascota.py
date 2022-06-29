from django.db import models

from pruebaapp.models import Persona


class Mascota(models.Model):
    TIPO_CHOICES = [
        (0, 'Perro'),
        (1, 'Gato'),
        (2, 'Loro'),
        (3, 'Mapache'),
    ]
    nombre = models.CharField(max_length=200)
    tipo = models.IntegerField(choices=TIPO_CHOICES)

    # Foreign Keys
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='mascotas')
