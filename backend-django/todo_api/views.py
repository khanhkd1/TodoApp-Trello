from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from rest_framework import permissions
from .models import Todo
from .serializers import TodoSerializer
from pytz import timezone
from datetime import datetime


class TodoListApiView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        List all the todo items for given requested user
        """
        todos = Todo.objects.all().order_by('-id')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Create the Todo with given todo data
        """
        data = {
            'name': request.data.get('name'), 
        }
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoApiView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, todo_id, *args, **kwargs):
        """
        Modify the Todo with given todo data
        """
        todo_instance = Todo.objects.get(id=todo_id)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = {
            # 'name': request.data.get('name'),
            'isCompleted': request.data.get('isCompleted'),
            'updatedAt': str(datetime.now(timezone(settings.TIME_ZONE)).strftime("%d/%m/%Y-%H:%M:%S"))
        }
        serializer = TodoSerializer(instance=todo_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, todo_id, *args, **kwargs):
        """
        Deletes the todo item with given todo_id if exists
        """
        todo_instance = Todo.objects.get(id=todo_id)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        todo_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
