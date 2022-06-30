from django.db import models


class Empresa(models.Model):
    nombre = models.CharField(max_length=50)
    imagen_logo = models.ImageField(upload_to="imagen_logo", null=True)
    latitude = models.TextField()
    longitude = models.TextField()

    def __str__(self):
        return ' (' + str(self.pk) + ')' + self.nombre
