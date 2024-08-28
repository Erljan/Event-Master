from rest_framework import serializers
from .models import CreateEvent


class CreateEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreateEvent
        fields = ['event_name', 'venue', 'city', 'category', 'time', 'indoor'] #exclude the creator since its automatic to authenticated user