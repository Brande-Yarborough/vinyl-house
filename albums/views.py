from django.shortcuts import render
from rest_framework import generics
from .models import AlbumDetail
from .serializers import AlbumDetailSerializer


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
