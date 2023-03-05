from django.shortcuts import render

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
