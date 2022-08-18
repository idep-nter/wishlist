from django.contrib import admin
from django.urls import path, include
from wishlist import urls as wishlist_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(wishlist_urls)),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.jwt')),
]
