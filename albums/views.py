from django.shortcuts import render, HttpResponse
from rest_framework import generics
from .models import AlbumDetail, Album, Comment
from .serializers import AlbumDetailSerializer, AlbumSerializer, CommentSerializer
from .permissions import IsAuthor
from django.http import JsonResponse


# Create your views here.
import discogs_client
d = discogs_client.Client('VinylHouse/0.1',
                          user_token="AhPySnZsfOSbHSygKTMUmTGyWvQwGJvyfhYgDRoC")


def testing(request):
    # if request.method == 'POST':
    data = {'greeting': 'Hello'}
    # return HttpResponse(data, request)
    type = 'release'
    title = 'Lemonade'
    artist = 'Beyonce'
    genre = ''
    year = ''

    results = d.search(artist=artist, type=type, title=title,)
    results = results.page(1)
    # results.data.keys[0]
    print(results[0].data.keys())

    return JsonResponse(results[0].data, safe=False)


def fetchDiscOgsData(request):
    if request.method == 'POST':
        type = 'release'
        title = 'Lemonade'
        artist = 'Beyonce'
        genre = ''
        year = ''

    results = d.search(artist=artist, type=type, title=title,)
    print(results[0])
    return results


# API end point to show all albums detail, List gets many records
class AlbumDetailListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to table and get all objects or albums detail
    queryset = AlbumDetail.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = AlbumDetailSerializer
    # permission_classes = (IsAuthenticated,)


class AlbumListAPIView(generics.ListCreateAPIView):
    # look at permissions for this-not going to get back all albums, only want to see your albums or friends albums
    # queryset = Album.objects.all()
    # serializer_class = AlbumSerializer

    def get_queryset(self):
        return 'Hello'


class CommentListAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
