from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, User


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id',)


class ProfileSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
