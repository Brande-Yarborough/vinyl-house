from django.urls import path
from . import views
from .views import search_album

urlpatterns = [
    # path('', views.fetchDiscogsData()),
    # path('albums/', views.AlbumDetailListAPIView.as_view()),
    # path('albums/', views.AlbumListAPIView.as_view()),
    path('albums/', views.testing),
    path('search/<str:query>/', search_album, name='search_album'),
    path('user/albums/', views.UserAlbumListAPIView.as_view()),
    path('user/albums/<int:pk>/', views.UserAlbumDetailAPIView.as_view()),
    path('comments/', views.CommentListAPIView.as_view()),
    path('comments/<int:pk>/', views.CommentDetailAPIView.as_view()),
    path('friend/<int:pk>/albums/', views.FriendAlbumListAPIView.as_view()),
    path('friend/<int:pk>/albumdetail/',
         views.FriendAlbumDetailListView.as_view()),
]
