from django.db import models


class Pelicula(models.Model):
    titulo = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    anio = models.IntegerField()
    duracion = models.IntegerField()
    clasificacion = models.CharField(max_length=200)
    imagen = models.ImageField(upload_to='peliculas')

    def __str__(self):
        return self.titulo
