from rest_framework import serializers
from .models import AlbumDetail

class AlbumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumDetail
        fields = '__all__'