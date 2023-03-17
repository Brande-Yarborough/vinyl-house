from django.shortcuts import render, HttpResponse
from rest_framework import generics, status
from .models import AlbumDetail, Album, Comment
from .serializers import AlbumDetailSerializer, AlbumSerializer, CommentSerializer, UserAlbumSerializer, UserAlbumDetailSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .permissions import IsUser, IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Create your views here.
import discogs_client
d = discogs_client.Client('VinylHouse/0.1',
                          user_token="AhPySnZsfOSbHSygKTMUmTGyWvQwGJvyfhYgDRoC")


# Search function for album
# wrap the list of releases in dictionary with key of 'results'. This ensures that the JSON response is an object with a single property, which makes it easier to work with on the frontend.
@api_view(['GET'])
def search_album(request, query):
    # search for albums matching given query using the 'search' function from the 'd' module, and filter by 'release' type
    results = d.search(query, type='release').page(1)
    # create empty list to store details of matching releases
    releases = []
    # loop through each result from search
    for result in results:
        # create dict with details for current release
        # import pdb
        # pdb.set_trace()
        release = {
            'api_id': result.id,
            'title': result.title,
            'artist': result.artists[0].name,
            'tracks': [track.title for track in result.tracklist],
            'year': result.year,
            'genre': result.data['genre'],
            'formats': [format['name'] for format in result.formats],
            'cover_image': result.data['cover_image'],
        }
        # add release details to list of releases
        releases.append(release)
        print(releases)
        # return list of releases in JSON response with 'results' key
    return Response({'results': releases})


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
    release = results[0]
    # release_detail = d.release(release.id)

    # results = results.page(1)
    # # results.data.keys[0]
    # print(results[0].data.keys())
    # print(release_detail.data)
    # import pdb
    # pdb.set_trace()

    album = {
        'artist': release.artists[0].name,
        'title': release.title,
        'year': release.year,
        'genre': release.data['genre'],
        'cover_image': release.data['cover_image'],
        'tracks': [{'position': track.position, 'title': track.title, 'duration': track.duration} for track in release.tracklist]
    }

    # return JsonResponse(results[0].data, safe=False)
    return JsonResponse(album, safe=False)


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
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        album = self.request.query_params.get('album')
        return Comment.objects.filter(album=album).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class UserAlbumListAPIView(generics.ListCreateAPIView):
    serializer_class = UserAlbumSerializer

    def get_queryset(self):
        return Album.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserAlbumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserAlbumDetailSerializer
    # queryset = Album.objects.all()
    # permission_classes = (IsUser,)

    def get_queryset(self):
        return Album.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# View to see friends album collection
class FriendAlbumListAPIView(generics.ListCreateAPIView):
    serializer_class = UserAlbumSerializer

    def get_queryset(self):
        # target the kwargs and pull out the pk value
        # use the pk value to filter the albums table
        pk = self.kwargs.get('pk')
        return Album.objects.filter(user=pk)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FriendAlbumDetailListView(generics.ListAPIView):
    serializer_class = UserAlbumSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Album.objects.filter(id=pk)
