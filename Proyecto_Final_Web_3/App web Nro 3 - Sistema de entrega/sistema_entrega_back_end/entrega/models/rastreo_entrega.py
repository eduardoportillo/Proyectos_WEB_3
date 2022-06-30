from django.db import models

from entrega.models.entrega import Entrega


class RastreoEntrega(models.Model):
    estado = models.TextField()
    nombre_ubicacion = models.TextField()
    longitude = models.TextField()
    latitude = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    entrega_id = models.ForeignKey(Entrega, related_name="entrega_rastreo", on_delete=models.CASCADE)
