# Generated by Django 5.0.7 on 2024-08-20 19:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_contratoservicio_estado_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Presupuesto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('año', models.DateField()),
                ('presupuesto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('propiedad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.propiedad')),
            ],
        ),
    ]
