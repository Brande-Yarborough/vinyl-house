# Generated by Django 4.1.7 on 2023-03-21 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_profile_avatar_alter_profile_friends'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='profiles/default-profile.png', null=True, upload_to='profiles/'),
        ),
    ]