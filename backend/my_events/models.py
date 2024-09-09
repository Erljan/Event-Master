from django.db import models
from django.contrib.auth.models import User
from datetime import datetime



class MyEvents(models.Model):
    owner = models.ForeignKey(User, related_name="events", on_delete=models.CASCADE)
    eventId = models.CharField()
    added_at = models.DateTimeField(default=datetime.now)



