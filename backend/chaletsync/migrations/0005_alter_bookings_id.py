# Generated by Django 5.0.1 on 2024-05-20 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chaletsync', '0004_alter_bookings_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookings',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
