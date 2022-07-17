from django.urls import path
from .views import (
    TodoListApiView,
    TodoApiView
)


urlpatterns = [
    path('', TodoListApiView.as_view()),
    path('<int:todo_id>/', TodoApiView.as_view()),
]
