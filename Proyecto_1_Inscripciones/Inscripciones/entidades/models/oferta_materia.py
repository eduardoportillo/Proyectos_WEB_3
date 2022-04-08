from django.db import models

from entidades.models.docente import Docente
from entidades.models.materia import Materia


class OfertaMateria(models.Model):

    horario = models.CharField(max_length=200)

    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='materia')
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE, related_name='docente')
