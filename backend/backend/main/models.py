from django.db import models

# Modelo para Propiedades
class Propiedad(models.Model):
    direccion = models.CharField(max_length=255)
    numero_pisos = models.PositiveIntegerField()
    numero_unidades = models.PositiveIntegerField()
    año_construcción = models.PositiveIntegerField()
    nombre_edificio = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_edificio

# Modelo para Unidades
class Unidad(models.Model):
    propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE)
    numero_unidad = models.CharField(max_length=50)
    tipo_unidad = models.CharField(max_length=50)  # Ejemplo: apartamento, oficina, etc.
    area = models.FloatField()

    def __str__(self):
        return f'{self.numero_unidad} - {self.propiedad.nombre_edificio}'

# Modelo para Propietarios
class Propietario(models.Model):

    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    documento_identidad = models.CharField(max_length=50, unique=True)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    direccion = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.nombre} {self.apellido}'

# Modelo para Inquilinos
class Inquilino(models.Model):
    unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    numero_documento_identidad = models.CharField(max_length=50, unique=True)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return f'{self.nombre} {self.apellido} - {self.unidad.numero_unidad}'

# Modelo para Cuotas de Mantenimiento
class CuotaMantenimiento(models.Model):
    unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
    fecha = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('pagada', 'Pagada'), ('pendiente', 'Pendiente')])

    def __str__(self):
        return f'Cuota {self.id} - {self.unidad.numero_unidad}'

# Modelo para Gastos Comunes
class GastoComun(models.Model):
    fecha = models.DateField()
    descripcion = models.CharField(max_length=255)
    monto = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Gasto {self.id} - {self.descripcion}'

# Modelo para Pagos
class Pago(models.Model):
    cuota = models.ForeignKey(CuotaMantenimiento, on_delete=models.CASCADE)
    propietario = models.ForeignKey(Propietario, on_delete=models.CASCADE)
    fecha = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Pago {self.id} - {self.cuota.unidad.numero_unidad}'

# Modelo para Contratos de Servicios
class ContratoServicio(models.Model):
    proveedor = models.CharField(max_length=255)
    tipo_servicio = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Contrato {self.id} - {self.tipo_servicio}'
