# Generated by Django 2.1.5 on 2019-04-15 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_usersocialcredentials'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersocialcredentials',
            name='refresh_token',
            field=models.CharField(default=None, max_length=200),
            preserve_default=False,
        ),
    ]