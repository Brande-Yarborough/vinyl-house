from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


# custom user
class User(AbstractUser):

    pass
# https://medium.com/analytics-vidhya/add-friends-with-689a2fa4e41d


class Friend_Request(models.Model):
    from_user = models.ForeignKey(
        User, related_name='from_user', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name="to_user", on_delete=models.CASCADE)


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', blank=True, null=True)
    display_name = models.CharField(max_length=255)
    favorite_genre = models.CharField(max_length=255)
    friends = models.ManyToManyField("User", related_name="friends",)

    def __str__(self):
        return self.user.username
