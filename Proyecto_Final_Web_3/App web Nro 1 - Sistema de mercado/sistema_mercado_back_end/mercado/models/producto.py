from django.db import models

from mercado.models.categoria import Categoria
from mercado.models.empresa import Empresa


class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=9, decimal_places=4)
    imagen_producto = models.ImageField(upload_to="imagen_producto", null=True)
    empresa_id = models.ForeignKey(Empresa, null=False, on_delete=models.CASCADE, related_name='empresa_producto')
    categoria_id = models.ForeignKey(Categoria, null=False, on_delete=models.CASCADE, related_name='categoria_producto')

    def __str__(self):
        return ' (' + str(self.pk) + ') ' + self.nombre + ' ' + str(self.precio)
