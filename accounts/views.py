from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile, User, Friend_Request
from .serializers import ProfileSerializer, UserSerializer, FriendRequestSerializer

# Create your views here.
User = get_user_model()

# Create your views here.


class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class CurrentUserProfileAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Function based views for Friend Request
@api_view(['POST'])
def send_friend_request(request, userID):
    from_user = request.user
    to_user = User.objects.get(id=userID)
    friend_request, created = Friend_Request.objects.get_or_create(
        from_user=from_user, to_user=to_user)
    if created:
        return Response('friend request sent')
    else:
        return Response('friend request was already sent')


@api_view(['POST'])
def accept_friend_request(request):
    friend_request = Friend_Request.objects.get(to_user=request.user.id)
    to_profile = Profile.objects.get(user=request.user.id)
    from_profile = Profile.objects.get(user=friend_request.from_user.id)

    if friend_request.to_user:
        to_profile.friends.add(friend_request.from_user)
        from_profile.friends.add(friend_request.to_user)
        print(friend_request.to_user)

        # friend_request.to_user.friends.add(friend_request.from_user)
        # friend_request.from_user.friends.add(friend_request.to_user)
        friend_request.delete()
        return Response('friend request accepted')
    else:
        return Response('friend request not accepted')


class FriendRequestListAPIView(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Friend_Request.objects.filter(to_user=user)
