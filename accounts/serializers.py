from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, User, Friend_Request


class FriendSerializer(serializers.ModelSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_avatar = serializers.ImageField(
        source='profile.avatar', read_only=True)

    class Meta:
        model = User
        fields = ('username', 'id', 'profile_id', 'profile_avatar',)


class FriendRequestSerializer(serializers.ModelSerializer):
    # represented as string representations of the related User objects
    from_user = serializers.StringRelatedField()
    to_user = serializers.StringRelatedField()
    from_user_image = serializers.ImageField(
        source="from_user.profile.avatar", read_only=True)

    class Meta:
        model = Friend_Request
        fields = ('id', 'from_user', 'to_user', 'from_user_image',)


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
