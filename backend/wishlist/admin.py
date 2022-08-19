from django.contrib import admin
from .models import Item, Category

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'price', 'category', 'description', 'image', 'link']

    # def save_model(self, request, obj, form, change):
    #     if getattr(obj, 'author', None) is None:
    #         obj.author = request.user
    #     obj.save()
    

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
