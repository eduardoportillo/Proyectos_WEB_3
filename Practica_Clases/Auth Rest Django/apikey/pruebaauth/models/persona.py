from django.db import models


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

    def __str__(self):
        return self.nombres + ' ' + self.apellidos + ' (' + str(self.pk) + ')'
