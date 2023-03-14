from django.conf import settings
from django.db import models

# Create your models here.


# album detail from 3rd party api
class AlbumDetail(models.Model):
    artist = models.CharField(max_length=255)
    cover_image = models.URLField(null=True)
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    tracks = models.JSONField(null=True)
    genre = models.JSONField(null=True)
    api_id = models.IntegerField(null=True)

    def __str__(self):
        return self.title


# user input album detail
class Album(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    album_detail = models.ForeignKey(AlbumDetail, on_delete=models.CASCADE)
    note = models.TextField(blank=True, null=True)
    user_image = models.ImageField(upload_to="albums/", blank=True, null=True)

    def __str__(self):
        return self.album_detail.title


# user detail comment
class Comment(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    text = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # time stamp with moment of creation
    created_at = models.DateTimeField(auto_now_add=True)
    # automatically updates with any changes made to comment
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text[:50]  # only show first 50 char of message
