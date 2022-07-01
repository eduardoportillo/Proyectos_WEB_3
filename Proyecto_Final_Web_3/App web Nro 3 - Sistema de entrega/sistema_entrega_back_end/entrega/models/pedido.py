import uuid

from django.db import models


class Pedido(models.Model):
    tracking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    usuario_id = models.IntegerField()
    username = models.TextField()
