# Generated by Django 5.0.1 on 2024-02-03 19:01

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owt_api', '0002_alter_weightrecord_body_water_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weightrecord',
            name='fat_mass',
            field=models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(5), django.core.validators.MaxValueValidator(70)]),
        ),
        migrations.AlterField(
            model_name='weightrecord',
            name='muscular_mass',
            field=models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(10), django.core.validators.MaxValueValidator(100)]),
        ),
    ]
