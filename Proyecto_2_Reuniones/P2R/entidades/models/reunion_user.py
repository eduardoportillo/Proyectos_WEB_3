from django.contrib.auth.models import User
from django.db import models

from entidades.models import Reunion


class ReunionUser(models.Model):

    reunion = models.ForeignKey(Reunion, null=True, on_delete=models.CASCADE, related_name='reunion')
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='user')