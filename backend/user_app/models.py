from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(blank=True, max_length=5)
    # image = models.ImageField()

    def __str__(self):
        return self.user.username