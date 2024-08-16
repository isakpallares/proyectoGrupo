# Generated by Django 5.0.7 on 2024-08-16 00:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_propietario_unidad'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingreso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario', models.CharField(max_length=255)),
                ('contraseña', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Registro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario', models.CharField(max_length=255)),
                ('contraseña', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.DeleteModel(
            name='GastoComun',
        ),
        migrations.RemoveField(
            model_name='pago',
            name='propietario',
        ),
        migrations.RenameField(
            model_name='inquilino',
            old_name='numero_documento_identidad',
            new_name='documento_identidad',
        ),
        migrations.AddField(
            model_name='inquilino',
            name='pagoDeuda',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='pago',
            name='contratoServicio',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.contratoservicio'),
        ),
        migrations.AddField(
            model_name='pago',
            name='inquilino',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.inquilino'),
        ),
        migrations.DeleteModel(
            name='Propietario',
        ),
    ]
