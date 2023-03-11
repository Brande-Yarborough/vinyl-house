from django.urls import path
from . import views
from .views import search_album

urlpatterns = [
    # path('', views.fetchDiscogsData()),
    # ask about .as_view being that or need to change to fetchDiscogsData?
    # path('albums/', views.AlbumDetailListAPIView.as_view()),
    # path('albums/', views.AlbumListAPIView.as_view()),
    path('albums/', views.testing),
    path('search/<str:query>/', search_album, name='search_album'),
]

# will need to do something like this:
# path('user/albums/<int:pk>/', views.UserAlbumDetailAPIView.as_view()),
# path('comments/', views.CommentListAPIView.as_view()),
