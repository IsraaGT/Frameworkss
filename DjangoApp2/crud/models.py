# Create your models here.
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    status = models.IntegerField(default=1)

    class Meta:
        db_table = 'django'  # Asegura que use la tabla `django` existente
        managed = False