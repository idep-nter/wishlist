from django.shortcuts import render
from urllib import request
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .serializer import ItemSerializer, CategorySerializer
from .models import Item, Category


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemPagination(PageNumberPagination):
    page_size = 12


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    pagination_class = ItemPagination
    queryset = Item.objects.all()

    # def get_queryset(self):
        # return Item.objects.filter(user=self.request.user)

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.user = self.request.user
        obj.save()        