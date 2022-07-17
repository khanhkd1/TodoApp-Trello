from django.contrib import admin
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'isCompleted', 'createdAt', 'updatedAt']


admin.site.register(Todo, TodoAdmin)
