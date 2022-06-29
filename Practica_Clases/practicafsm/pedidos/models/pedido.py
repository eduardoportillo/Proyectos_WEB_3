from django.db import models
from django_fsm import FSMIntegerField, transition

from pedidos.models import Chofer, Restaurante, Cliente


class Pedido(models.Model):
    fecha = models.DateTimeField()
    ESTADO_REALIZADO = 1
    ESTADO_CONFIRMADO = 2
    ESTADO_ACEPTADO = 3
    ESTADO_CHOFER_ESPERA = 4
    ESTADO_CHOFER_EN_CAMINO = 5
    ESTADO_ENTREGADO = 6
    ESTADO_CANCELADO = -1

    ESTADO_CHOICES = [
        (ESTADO_REALIZADO, 'Pedido Realizado'),
        (ESTADO_CONFIRMADO, 'Pedido confirmado por el restaurante'),
        (ESTADO_ACEPTADO, 'Pedido aceptado por el chofer'),
        (ESTADO_CHOFER_ESPERA, 'Chofer esperando el pedido en el restaurante'),
        (ESTADO_CHOFER_EN_CAMINO, 'Chofer ya tiene el pedido'),
        (ESTADO_ENTREGADO, 'Pedido Entregado'),
        (ESTADO_CANCELADO, 'Cancelado'),
    ]
    estado = FSMIntegerField(choices=ESTADO_CHOICES, default=ESTADO_REALIZADO)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    PAGO_CHOICES = [
        (1, 'Efectivo'),
        (2, 'Tarjeta'),
        (3, 'QR'),
        (4, 'Transferencia'),
    ]
    metodo_pago = models.IntegerField(choices=PAGO_CHOICES)
    latitud_destino = models.CharField(max_length=200)
    longitud_destino = models.CharField(max_length=200)
    direccion = models.CharField(max_length=200)
    nit = models.CharField(max_length=200)
    nombre_factura = models.CharField(max_length=200)
    razon_cancelacion = models.CharField(max_length=200, null=True)

    # Relationships
    chofer = models.ForeignKey(Chofer, related_name="pedidos", on_delete=models.CASCADE, null=True)
    restaurante = models.ForeignKey(Restaurante, related_name="pedidos", on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, related_name="pedidos", on_delete=models.CASCADE)

    @transition(field=estado, source=ESTADO_REALIZADO, target=ESTADO_CONFIRMADO)
    def confirmar_pedido(self):
        pass

    @transition(field=estado, source=ESTADO_CONFIRMADO, target=ESTADO_ACEPTADO)
    def chofer_acepto_pedido(self, chofer):
        self.chofer = chofer

    @transition(field=estado, source=ESTADO_ACEPTADO, target=ESTADO_CHOFER_ESPERA)
    def chofer_espera_pedido(self):
        pass

    @transition(field=estado, source=ESTADO_CHOFER_ESPERA, target=ESTADO_CHOFER_EN_CAMINO)
    def chofer_tiene_pedido(self):
        pass

    @transition(field=estado, source=ESTADO_CHOFER_EN_CAMINO, target=ESTADO_ENTREGADO)
    def entregar_pedido(self):
        pass

    @transition(
        field=estado,
        source=[ESTADO_REALIZADO, ESTADO_ACEPTADO, ESTADO_CONFIRMADO, ESTADO_CHOFER_ESPERA],
        target=ESTADO_CANCELADO
    )
    def cancelar_pedido(self, razon):
        self.razon_cancelacion = razon
