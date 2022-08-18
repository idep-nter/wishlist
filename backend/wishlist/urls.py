from django.urls import include, path
from rest_framework import routers

from .views import ItemViewSet, CategoryViewSet


router = routers.DefaultRouter()
router.register(r'items', ItemViewSet, basename='Item')
router.register(r'categories', CategoryViewSet, basename='Category')

urlpatterns = [
    path('', include(router.urls)),
]
