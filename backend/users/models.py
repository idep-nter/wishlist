from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
  username = models.CharField(max_length=255, unique=True)
  email = models.EmailField(unique=True)
  password = models.CharField(max_length=255)


  def __str__(self):
        return self.username