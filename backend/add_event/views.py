from django.shortcuts import render, get_object_or_404
from .serializers import CreateEventSerializer
from .models import CreateEvent
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED,HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.exceptions import ValidationError



class CreateOrGetAllEvents(generics.ListCreateAPIView):
    serializer_class = CreateEventSerializer

    # This will allow other users to see all the events, and only authenticated users can create event
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        return CreateEvent.objects.all().order_by("-created")
    
    def perform_create(self, serializer):
        try:
            serializer.save(creator=self.request.user)
        except Exception as e:
            print(e)


class GetMyEvents(generics.ListAPIView):
    serializer_class = CreateEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CreateEvent.objects.filter(creator=user)


class GetAnEvent(generics.RetrieveAPIView):
    queryset = CreateEvent.objects.all()
    serializer_class = CreateEventSerializer
    lookup_field = 'id'

class DeleteEvent(APIView):
    # serializer_class = CreateEventSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        event = CreateEvent.objects.filter(creator=self.request.user, id=id)

        if not event:
            return Response({"error":"No event to get"}, status=HTTP_400_BAD_REQUEST)

        # serializer = CreateEventSerializer(event)

        event.delete()

        return Response("Event deleted", status=HTTP_204_NO_CONTENT)
