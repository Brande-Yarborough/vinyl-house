from django.urls import path
from . import views

urlpatterns = [
    # path('', views.fetchDiscogsData()),
    # ask about .as_view being that or need to change to fetchDiscogsData?
    # path('albums/', views.AlbumDetailListAPIView.as_view()),
    path('albums/', views.AlbumListAPIView.as_view()),

    #will need to do something like this:
    # path('user/albums/<int:pk>/', views.UserAlbumDetailAPIView.as_view()),
    # path('comments/', views.CommentListAPIView.as_view()),
]
