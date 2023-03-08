from django.urls import path
from .views import ProfileCreateAPIView, send_friend_request, accept_friend_request
from .models import Profile, User, Friend_Request

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileCreateAPIView.as_view(), name="profile-add"),
    path('send_friend_request/<int:userID>/',
         send_friend_request, name='send friend request'),
    path('accept_friend_request/<int:requestID>/',
         accept_friend_request, name='accept friend request'),
]
