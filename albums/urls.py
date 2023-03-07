from django.urls import path
from . import views

urlpatterns = [
    # path('', views.fetchDiscogsData()),
    # ask about .as_view being that or need to change to fetchDiscogsData?
    path('albums/', views.AlbumDetailListAPIView.as_view()),
]
