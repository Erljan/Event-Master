from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime


class CreateEvent(models.Model):
    event_name = models.CharField(max_length=100)
    venue = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    date = models.DateField(default=timezone.now)
    time = models.CharField(max_length=50)
    indoor = models.BooleanField(default=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator")
    created = models.DateTimeField(default=datetime.now)


    def __str__(self):
        return f"{self.event_name} at {self.created.strftime('%m-%d-%Y')} created by {self.creator}"