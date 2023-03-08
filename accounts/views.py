from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Profile, User, Friend_Request
from .serializers import ProfileSerializer

# Create your views here.
User = get_user_model()

# Create your views here.


class ProfileCreateAPIView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Function based views for Friend Request
@api_view(['POST'])
def send_friend_request(request, userID):
    from_user = request.user
    to_user = User.Objects.get(id=userID)
    friend_request, created = Friend_Request.objects.getorcreate(
        from_user=from_user, to_user=to_user)
    if created:
        return Response('friend request sent')
    else:
        return Response('friend request was already sent')


@api_view(['POST'])
def accept_friend_request(request, requestID):
    friend_request = Friend_Request.objects.get(id=requestID)
    if friend_request.to_user == request.user:
        friend_request.to_user.friends.add(friend_request.from_user)
        friend_request.from_user.friends.add(friend_request.to_user)
        friend_request.delete()
        return Response('friend request accepted')
    else:
        return Response('friend request not accepted')
