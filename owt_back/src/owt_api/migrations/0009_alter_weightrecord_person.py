# Generated by Django 5.0.1 on 2024-02-11 19:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owt_api', '0008_alter_person_initial_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weightrecord',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weight_records', to='owt_api.person'),
        ),
    ]
