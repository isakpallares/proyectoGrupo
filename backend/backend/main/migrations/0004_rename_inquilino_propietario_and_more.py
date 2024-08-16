# Generated by Django 5.0.7 on 2024-08-16 13:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_ingreso_registro_delete_gastocomun_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Inquilino',
            new_name='Propietario',
        ),
        migrations.RenameField(
            model_name='pago',
            old_name='inquilino',
            new_name='propietario',
        ),
        migrations.AlterField(
            model_name='pago',
            name='cuota',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.cuotamantenimiento'),
        ),
    ]
