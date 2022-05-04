from django.db import models


class Reunion(models.Model):

    nombres_reunion = models.CharField(max_length=200)
    fecha_hora_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombres + ' ' + self.apellidos + ' (' + str(self.pk) + ')'