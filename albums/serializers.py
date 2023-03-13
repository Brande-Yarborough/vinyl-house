from rest_framework import serializers
from .models import AlbumDetail, Album, Comment


class AlbumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumDetail
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'


class UserAlbumSerializer(serializers.ModelSerializer):
    # user_name = serializers.ReadOnlyField(source='user.username')
    # details = AlbumDetailSerializer(many=False, read_only=True)
    cover_image = serializers.ReadOnlyField(source="detail.cover_image")
    artist = serializers.ReadOnlyField(source="detail.artist")
    title = serializers.ReadOnlyField(source="detail.title")

    class Meta:
        model = Album
        fields = ('cover_image', 'artist', 'title')

    def create(self, validated_data):
        pass


class CommentSerializer(serializers.ModelSerializer):
    # Do I need author name here?
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = '__all__'

    # Do I need to add serializer method field for edit, delete, and reply?
    # serializer method field is getting author status as boolean, to return and determine if author is equal to user
    # will use this to determine if edit and delete buttons will show up for specific author/user
