from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, User, Friend_Request


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id',)


class FriendRequestSerializer(serializers.ModelSerializer):
    # represented as string representations of the related User objects using StringRelatedField
    from_user = serializers.StringRelatedField()
    to_user = serializers.StringRelatedField()

    class Meta:
        model = Friend_Request
        fields = ('id', 'from_user', 'to_user', 'created_at')


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
