import uuid

from django.db import models

from entrega.models import Pedido


class PedidoDetalle(models.Model):
    descripcion = models.TextField()
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    pedido_id = models.ForeignKey(Pedido, related_name="pedido_detalle", on_delete=models.CASCADE)
    producto_id = models.IntegerField()