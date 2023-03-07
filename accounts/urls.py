from django.urls import path
from .views import ProfileCreateAPIView
from .models import Profile

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileCreateAPIView.as_view(), name="profile-add"),
]
