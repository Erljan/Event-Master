from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        data = User.objects.create_user(**validated_data)
        return data
    

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'location']

# {
#   "user": {
#     "id": 3,
#     "username": "erljan",
#     "first_name": "Erljan",
#     "last_name": "Rodrigo",
#     "email": "erl@erl.com"
#   },
#   "bio": null
# }