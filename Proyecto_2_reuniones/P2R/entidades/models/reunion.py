from django.contrib.auth.models import User
from django.db import models

class Reunion(models.Model):
    nombres_reunion = models.CharField(max_length=200)
    fecha_hora_reunion = models.DateTimeField()
    fecha_hora_creacion = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, related_name='usertoreunion')
    user_owner = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='reunionowner')

    def __str__(self):
        return ' (' + str(self.pk) + ')' + self.nombres_reunion
