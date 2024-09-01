from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserProfileSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserProfile
from rest_framework.exceptions import NotFound


# class CreateUserViews(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

class CreateUserViews(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        UserProfile.objects.get_or_create(user=user) 


class GetUserInfo(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user

        profile, created = UserProfile.objects.get_or_create(user=user)
        return profile

    
