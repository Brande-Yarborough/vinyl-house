# Generated by Django 4.1.7 on 2023-03-13 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0005_remove_albumdetail_api_key'),
    ]

    operations = [
        migrations.RenameField(
            model_name='album',
            old_name='album',
            new_name='details',
        ),
        migrations.RenameField(
            model_name='album',
            old_name='image',
            new_name='user_image',
        ),
        migrations.RemoveField(
            model_name='albumdetail',
            name='genre',
        ),
        migrations.RemoveField(
            model_name='albumdetail',
            name='image',
        ),
        migrations.RemoveField(
            model_name='albumdetail',
            name='tracklist',
        ),
        migrations.AddField(
            model_name='albumdetail',
            name='cover_image',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='album',
            name='note',
            field=models.TextField(null=True),
        ),
    ]