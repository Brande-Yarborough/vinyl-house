# Generated by Django 4.1.7 on 2023-03-14 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0008_rename_details_album_detail_albumdetail_api_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='album',
            old_name='detail',
            new_name='album_detail',
        ),
    ]