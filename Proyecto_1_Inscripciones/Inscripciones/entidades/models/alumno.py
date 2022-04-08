from django.db import models

class Alumno(models.Model):
    GENEROS_CHOICES = [
        (1, 'Masculino'),
        (0, 'Indefinido'),
        (-1, 'Femenino')
    ]

    nombres = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
    registro = models.IntegerField()
    semestre = models.IntegerField()
    edad = models.IntegerField()
    ci = models.IntegerField()
    genero = models.IntegerField(choices=GENEROS_CHOICES)

    def __str__(self):
        return self.nombres + ' ' + self.apellidos + ' (' + str(self.pk) + ')'