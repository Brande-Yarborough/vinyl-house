from rest_framework import serializers
from .models import AlbumDetail, Album, Comment
from accounts.models import Profile


class CommentSerializer(serializers.ModelSerializer):
    # Do I need author name here?
    author_name = serializers.ReadOnlyField(source='author.username')
    is_author = serializers.SerializerMethodField('get_author_status')
    # user_profile = serializers.SerializerMethodField('get_profile')
    user_profile = serializers.ImageField(
        source="author.profile.avatar", read_only=True)

    # def get_profile(self, comment):
    #     print(Profile.user)
    #     return Profile.user == self.context.get('request').user

    # serializer method field is getting author status as boolean, to return and determine if author is equal to user
    # will use this to determine if edit and delete buttons will show up for specific author/user

    def get_author_status(self, comment):
        return comment.author == self.context.get('request').user

    class Meta:
        model = Comment
        fields = '__all__'


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
    comments = CommentSerializer(
        many=True, read_only=True)
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Album
        fields = '__all__'
        # depth = 1

    def create(self, validated_data):
        album_detail_data = validated_data.pop('album_detail')
        album_detail_api_id = album_detail_data.pop('api_id')
        # retrieve exisiting instance or create new one if it doesn't exist

        album_detail, _ = AlbumDetail.objects.get_or_create(api_id=album_detail_api_id,
                                                            **album_detail_data)
        validated_data['album_detail'] = album_detail
        instance = Album.objects.create(**validated_data)
        return instance


class UserAlbumDetailSerializer(serializers.ModelSerializer):
    album_detail = AlbumDetailSerializer()
    comments = CommentSerializer(
        many=True, read_only=True)

    class Meta:
        model = Album
        fields = '__all__'

        def create(self, validated_data):
            album_detail_data = validated_data.pop('album_detail')
            album_detail_api_id = album_detail_data.pop('api_id')

            album_detail, _ = AlbumDetail.objects.get(
                api_id=album_detail_api_id, **album_detail_data)

            validated_data['album_detail'] = album_detail
            instance = Album.objects.get(**validated_data)
            return instance
