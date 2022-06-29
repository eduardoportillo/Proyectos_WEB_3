from django.db import models


class Producto(models.Model):
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    nombre = models.CharField(max_length=200, default="")
