# Generated by Django 5.0.7 on 2024-09-14 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unidad',
            name='coeficiente',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]