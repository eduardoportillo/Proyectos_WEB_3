from django.db import models
from django_fsm import FSMIntegerField, transition

from entrega.models.pedido import Pedido


class Entrega(models.Model):
    ENVIO_PENDIENTE = 1
    EN_CAMINO = 2
    ENTREGADO = 3

    ESTADO_CHOICES = [
        (ENVIO_PENDIENTE, 'Pedido Realizado y en espera de envio'),
        (EN_CAMINO, 'Pedido en camino'),
        (ENTREGADO, 'Pedido entregado'),
    ]

    longitud_origen = models.TextField()
    latitud_origen = models.TextField()
    longitud_destino = models.TextField()
    latitud_destino = models.TextField()

    estado = FSMIntegerField(choices=ESTADO_CHOICES, default=ENVIO_PENDIENTE)

    pedido_id = models.ForeignKey(Pedido, related_name="pedido_entrega", on_delete=models.CASCADE)

    @transition(field=estado, source=ENVIO_PENDIENTE, target=EN_CAMINO)
    def envio_en_camino(self):
        pass

    @transition(field=estado, source=EN_CAMINO, target=ENTREGADO)
    def envio_en_camino(self):
        pass