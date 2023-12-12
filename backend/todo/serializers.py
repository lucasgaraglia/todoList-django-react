
from rest_framework import serializers
from . import models

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = '__all__' # elijo todos los campos del modelo Todo