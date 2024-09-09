from rest_framework import serializers
from .models import MyEvents


class MyEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyEvents
        fields = ["eventId"]