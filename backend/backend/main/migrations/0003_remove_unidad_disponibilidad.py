# Generated by Django 5.0.7 on 2024-09-17 23:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_unidad_disponibilidad'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unidad',
            name='disponibilidad',
        ),
    ]
