# Generated by Django 5.0.1 on 2024-05-20 02:34

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chaletsync', '0005_alter_bookings_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookings',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
