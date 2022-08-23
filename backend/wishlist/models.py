from django.db import models
from django_currentuser.middleware import (get_current_user, get_current_authenticated_user)
from django_currentuser.db.models import CurrentUserField

from users.models import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255)
    verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Item(models.Model):
    user = CurrentUserField()
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    important = models.BooleanField()
    image = models.URLField(max_length=255)
    link = models.URLField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name
