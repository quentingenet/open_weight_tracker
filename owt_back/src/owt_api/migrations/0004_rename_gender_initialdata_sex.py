# Generated by Django 5.0.1 on 2024-01-29 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('owt_api', '0003_rename_body_size_initialdata_height'),
    ]

    operations = [
        migrations.RenameField(
            model_name='initialdata',
            old_name='gender',
            new_name='sex',
        ),
    ]
