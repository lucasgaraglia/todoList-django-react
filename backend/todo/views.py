from django.shortcuts import render

# con viewsets es mas facil crear las vistas
from rest_framework import viewsets

from . import serializers
from . import models

# Create your views here.

# esta es la unica view que vamos a necesitar crear desde el backend para la Todo app,
# con esto se pueden hacer todas las operaciones CRUD
class TodoViewSet(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer

