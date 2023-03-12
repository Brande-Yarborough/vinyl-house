from django.shortcuts import render, HttpResponse
from rest_framework import generics
from .models import AlbumDetail, Album, Comment
from .serializers import AlbumDetailSerializer, AlbumSerializer, CommentSerializer
from .permissions import IsAuthor
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
import discogs_client
d = discogs_client.Client('VinylHouse/0.1',
                          user_token="AhPySnZsfOSbHSygKTMUmTGyWvQwGJvyfhYgDRoC")


# Search function for album
# wrap the list of releases in dictionary with key of 'results'. This ensures that the JSON response is an object with a single property, which makes it easier to work with on the frontend.
@api_view(['GET'])
def search_album(request, query):
    # search for albums matching given query using the 'search' function from the 'd' module, and filter by 'release' type
    results = d.search(query, type='release')
    # create empty list to store details of matching releases
    releases = []
    # loop through each result from search
    for result in results:
        # create dict with details for current release
        release = {
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


# Get the user's collection from Discogs
def collection_view(request, username):
    discogs = discogs_client.Client('VinylHouse/0.1',
                                    user_token="AhPySnZsfOSbHSygKTMUmTGyWvQwGJvyfhYgDRoC")

    user = discogs.user(username='Brande.Y')
    collection = user.collection_folders[0].releases

    # Create a list of serialized releases
    serialized_collection = []
    for release in collection:
        serialized_release = {
            'title': release.basic_information.title,
            'artists': [artist.name for artist in release.basic_information.artists],
            'year': release.basic_information.year,
        }
        serialized_collection.append(serialized_release)
# Return the collection as a JSON response
    return JsonResponse(serialized_collection, safe=False)


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


# def fetchDiscOgsData(request):
#     if request.method == 'POST':
#         type = 'release'
#         title = 'Lemonade'
#         artist = 'Beyonce'
#         genre = ''
#         year = ''

#     results = d.search(artist=artist, type=type, title=title,)
#     print(results[0])
#     return results


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
