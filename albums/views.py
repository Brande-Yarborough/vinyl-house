from django.shortcuts import render
from rest_framework import generics
from .models import AlbumDetail, Album, Comment
from .serializers import AlbumDetailSerializer, AlbumSerializer, CommentSerializer


# Create your views here.
import discogs_client
d = discogs_client.Client('ExampleApplication/0.1',
                          user_token="AhPySnZsfOSbHSygKTMUmTGyWvQwGJvyfhYgDRoC")


def fetchDiscOgsData(request):
    if request.method == 'POST':
        type = 'release'
        title = ''
        artist = 'Beyonce'
        genre = ''
        year = ''

    results = d.search(artist=artist, type=type)
    print(results[0])
    return results


# API end point to show all albums detail, List gets many records
class AlbumDetailListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to table and get all objects or albums detail
    queryset = AlbumDetail.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = AlbumDetailSerializer


class AlbumListAPIView(generics.ListCreateAPIView):
    # look at permissions for this-not going to get back all albums, only want to see your albums or friends albums
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class CommentListAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    # need to add permission class IsAuthor

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
