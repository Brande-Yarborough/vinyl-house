from django.contrib import admin
from .models import AlbumDetail, Album, Comment

# Register your models here.
admin.site.register(AlbumDetail)
admin.site.register(Album)
admin.site.register(Comment)
