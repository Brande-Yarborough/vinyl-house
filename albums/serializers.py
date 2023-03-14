from rest_framework import serializers
from .models import AlbumDetail, Album, Comment


class AlbumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumDetail
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    # nested serializer
    album_detail = AlbumDetailSerializer()

    class Meta:
        model = Album
        fields = '__all__'


class UserAlbumSerializer(serializers.ModelSerializer):
    album_detail = AlbumDetailSerializer()

    class Meta:
        model = Album
        fields = '__all__'

    def create(self, validated_data):
        album_detail_data = validated_data.pop('album_detail')
        album_detail_api_id = album_detail_data.pop('api_id')
        # retrieve exisiting instance or create new one if it doesn't exist

        album_detail, _ = AlbumDetail.objects.get_or_create(api_id=album_detail_api_id,
                                                            **album_detail_data)
        validated_data['album_detail'] = album_detail
        instance = Album.objects.create(**validated_data)
        return instance


class CommentSerializer(serializers.ModelSerializer):
    # Do I need author name here?
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = '__all__'

    # Do I need to add serializer method field for edit, delete, and reply?
    # serializer method field is getting author status as boolean, to return and determine if author is equal to user
    # will use this to determine if edit and delete buttons will show up for specific author/user
