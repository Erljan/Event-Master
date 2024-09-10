from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import MyEventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import MyEvents
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST


class AddToMyEvents(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyEventSerializer

    def get_queryset(self):
        return MyEvents.objects.filter(owner=self.request.user).order_by("-added_at")
    
    def perform_create(self, serializer):
        event_id = self.request.data.get('eventId')

        if MyEvents.objects.filter(eventId=event_id, owner=self.request.user).exists():
            return Response({"error": "Event already saved"}, status=HTTP_400_BAD_REQUEST)

        serializer.save(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        event_id = request.data.get("eventId")

        if not event_id:
            return Response({"error": "Event ID is required"}, status=HTTP_400_BAD_REQUEST)
        
        return self.create(request, *args, **kwargs)
    

class RemoveEvent(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, eventId):
        event = MyEvents.objects.filter(eventId=eventId, owner=self.request.user).first()

        if not event:
            return Response({"error": "Event not found or you don't have permission to delete this event"}, status=HTTP_404_NOT_FOUND)

        event.delete()

        return Response({"message": "Event successfully removed"}, status=HTTP_200_OK)