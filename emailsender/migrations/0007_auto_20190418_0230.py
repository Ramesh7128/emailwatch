# Generated by Django 2.1.5 on 2019-04-18 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emailsender', '0006_auto_20190418_0225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sentemail',
            name='read_status',
            field=models.CharField(max_length=30),
        ),
    ]
