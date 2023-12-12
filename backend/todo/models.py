from django.db import models

# Create your models here.

class Todo(models.Model):
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True) # cuando se crea el objeto, created = esa fecha

    def __str__(self):
        return f'{self.body} - {self.completed}'