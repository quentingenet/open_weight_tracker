# Generated by Django 5.0.1 on 2024-01-29 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('owt_api', '0002_alter_initialdata_gender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='initialdata',
            old_name='body_size',
            new_name='height',
        ),
    ]
