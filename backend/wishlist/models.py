from django.db import models
# from django.contrib.auth.models import User

from users.models import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=200)
    verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Item(models.Model):
    user = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    important = models.BooleanField()
    image = models.URLField(max_length=200)
    link = models.URLField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name
