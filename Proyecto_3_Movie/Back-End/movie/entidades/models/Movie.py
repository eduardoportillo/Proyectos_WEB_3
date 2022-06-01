import uuid

from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=100)
    code = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)
    description = models.TextField()

    image = models.ImageField(upload_to="img_movies", null=True)

    def __str__(self):
        return ' (' + str(self.pk) + ')' + self.name