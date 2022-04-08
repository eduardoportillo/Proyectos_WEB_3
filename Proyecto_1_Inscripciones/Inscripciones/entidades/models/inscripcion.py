from django.db import models

from entidades.models import Alumno, OfertaMateria


class Inscripcion(models.Model):

    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name='alumno')
    oferta_materia = models.ForeignKey(OfertaMateria, on_delete=models.CASCADE, related_name='oferta_materia')