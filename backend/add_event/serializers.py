from rest_framework import serializers
from .models import CreateEvent


class CreateEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreateEvent
        fields = ['id', 'event_name', 'venue', 'city', 'category','date', 'time', 'indoor'] #exclude the creator since its automatic to authenticated user