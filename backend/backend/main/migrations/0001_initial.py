# Generated by Django 5.0.7 on 2024-09-20 03:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Propiedad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_propiedad', models.CharField(max_length=255)),
                ('direccion_propiedad', models.CharField(blank=True, max_length=100, null=True)),
                ('numero_unidades', models.PositiveIntegerField()),
                ('cuota', models.PositiveIntegerField()),
                ('Presupuesto', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Unidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_unidad', models.PositiveIntegerField()),
                ('nombre_inquilino', models.CharField(blank=True, max_length=150, null=True)),
                ('cedula_inquilino', models.CharField(blank=True, max_length=50, null=True)),
                ('telefono_inquilino', models.CharField(blank=True, max_length=50, null=True)),
                ('coeficiente', models.PositiveIntegerField(blank=True, null=True)),
                ('estado', models.BooleanField(blank=True, default=False, null=True)),
                ('id_propiedad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.propiedad')),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_pago', models.CharField(blank=True, max_length=50, null=True)),
                ('fecha_pago', models.DateField()),
                ('tipo_pago', models.CharField(choices=[('mantenimiento', 'Mantenimiento'), ('servicios', 'Servicios')], default='mantenimiento', max_length=20)),
                ('estado', models.BooleanField(default=False)),
                ('monto_pago', models.PositiveIntegerField(blank=True, null=True)),
                ('id_propiedad', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.propiedad')),
                ('id_unidad', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.unidad')),
            ],
        ),
    ]
