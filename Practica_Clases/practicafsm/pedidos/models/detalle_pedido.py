from django.db import models

from pedidos.models import Pedido, Producto


class DetallePedido(models.Model):
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    # Relationships
    pedido = models.ForeignKey(Pedido, related_name="detalle", on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, related_name="detalle", on_delete=models.CASCADE)
