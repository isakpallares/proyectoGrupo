from django.db import models
from django.contrib.auth.hashers import make_password, check_password
# Modelo para Propiedades
class Propiedad(models.Model):
    nombre_propiedad = models.CharField(max_length=255)
    direccion_propiedad = models.CharField(max_length=100,blank=True, null=True)
    numero_unidades = models.PositiveIntegerField()
    cuota = models.PositiveIntegerField()
    Presupuesto = models.PositiveIntegerField()
    
    def __str__(self):
        return f'{self.nombre_propiedad}'
    
# Modelo para Unidades
class Unidad(models.Model):
    id_propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE)
    numero_unidad = models.PositiveIntegerField()
    nombre_inquilino = models.CharField(max_length=150, blank=True, null=True)
    cedula_inquilino = models.CharField(max_length=50, blank=True, null=True)
    telefono_inquilino = models.CharField(max_length=50, blank=True, null=True)
    coeficiente = models.PositiveIntegerField(blank=True, null=True)
    estado = models.BooleanField(default=False, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.id_propiedad:
            presupuesto_anual = self.id_propiedad.Presupuesto
            cuota = self.id_propiedad.cuota
            self.coeficiente = (presupuesto_anual * cuota / 100) / 12

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.numero_unidad}'


# Modelo para Pagos
class Pago(models.Model):
    tipo_pago_choises = [
        ('mantenimiento', 'Mantenimiento'),
        ('servicios', 'Servicios'),
    ]
    id_pago = models.CharField(max_length=50, null=True, blank=True)
    id_propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE, blank=True, null=True)
    id_unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE, blank=True, null=True)
    fecha_pago = models.DateField()
    tipo_pago = models.CharField(max_length=20, choices=tipo_pago_choises, default='mantenimiento'
    )
    estado = models.BooleanField(default=False)
    monto_pago = models.PositiveIntegerField(blank=True, null=True)
    def __str__(self):
        return f'Pago {self.fecha_pago}'

class Usuario(models.Model):
    email = models.CharField(max_length = 255)
    password = models.CharField(max_length=15)

    def __str__(self):
        return f'ingreso {self.email}'
    

