from django.conf import settings
from django.db import models

# Create your models here.

# album detail from 3rd party api


class AlbumDetail(models.Model):
    image = models.ImageField(upload_to="albums/", null=True)
    artist = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    release_title = models.CharField(max_length=255)
    track = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    year = models.IntegerField()
    label = models.CharField(max_length=255)
    api_key = models.IntegerField()

    def __str__(self):
        return self.title

# user album detail


class Album(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    album = models.ForeignKey(AlbumDetail, on_delete=models.CASCADE)
    note = models.TextField()
    image = models.ImageField(upload_to="albums/", null=True)

    def __str__(self):
        return self.album.title

# user detail comment


class Comment(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
