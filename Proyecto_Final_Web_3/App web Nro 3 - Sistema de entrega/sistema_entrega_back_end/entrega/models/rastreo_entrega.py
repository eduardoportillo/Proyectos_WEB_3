from django.db import models

from entrega.models.entrega import Entrega


class RastreoEntrega(models.Model):
    entrega_update = models.IntegerField()
    nombre_ubicacion = models.TextField()
    longitud = models.TextField()
    latitud = models.TextField()
    entrega_id = models.ForeignKey(Entrega, related_name="entrega_rastreo", on_delete=models.CASCADE)
