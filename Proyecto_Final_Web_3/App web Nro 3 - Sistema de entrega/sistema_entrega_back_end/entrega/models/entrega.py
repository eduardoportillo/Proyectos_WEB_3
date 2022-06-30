from django.db import models
from django_fsm import FSMIntegerField, transition

from entrega.models.pedido import Pedido


class Entrega(models.Model):
    CREADO = 0
    ENVIO_PENDIENTE = 1
    EN_CAMINO = 2
    ENTREGADO = 3

    ESTADO_CHOICES = [
        (CREADO, 'Pedido Creado'),
        (ENVIO_PENDIENTE, 'Pedido Realizado y en espera de envio'),
        (EN_CAMINO, 'Pedido en camino'),
        (ENTREGADO, 'Pedido entregado'),
    ]

    longitude_origen = models.TextField()
    latitude_origen = models.TextField()
    longitude_destino = models.TextField()
    latitude_destino = models.TextField()

    estado = FSMIntegerField(choices=ESTADO_CHOICES, default=CREADO)

    pedido_id = models.ForeignKey(Pedido, related_name="pedido_entrega", on_delete=models.CASCADE)

    @transition(field=estado, source=CREADO, target=ENVIO_PENDIENTE)
    def envio_pendiente(self):
        pass

    @transition(field=estado, source=[ENVIO_PENDIENTE, EN_CAMINO], target=EN_CAMINO)
    def envio_en_camino(self):
        pass

    @transition(field=estado, source=EN_CAMINO, target=ENTREGADO)
    def entregado(self):
        pass
