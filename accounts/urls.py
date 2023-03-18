from django.urls import path
from .views import ProfileListAPIView, ProfileDetailAPIView, CurrentUserProfileAPIView, send_friend_request, accept_friend_request, FriendRequestListAPIView
from .models import Profile, User, Friend_Request

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view(), name="profile-add"),
    path('profiles/<int:pk>/', ProfileDetailAPIView.as_view(), name='profile_detail'),
    path('profiles/current_user/',
         CurrentUserProfileAPIView.as_view(), name="profile_detail"),
    path('send_friend_request/<int:userID>/',
         send_friend_request, name='send friend request'),
    path('accept_friend_request/',
         accept_friend_request, name='accept friend request'),
    path('friend_requests/',
         FriendRequestListAPIView.as_view(), name='friend_requests'),
]
