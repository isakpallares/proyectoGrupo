from django.contrib import admin
from .models import Propiedad, Unidad, Propietario, CuotaMantenimiento, Pago, ContratoServicio, Ingreso, Registro

# Registro del modelo Propiedad
@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ('direccion', 'numero_pisos', 'numero_unidades', 'año_construcción', 'nombre_edificio')
    search_fields = ('direccion', 'nombre_edificio')
    list_filter = ('año_construcción',)
    ordering = ('nombre_edificio',)

# Registro del modelo Unidad
@admin.register(Unidad)
class UnidadAdmin(admin.ModelAdmin):
    list_display = ('numero_unidad', 'tipo_unidad', 'area', 'propiedad')
    search_fields = ('numero_unidad', 'propiedad__nombre_edificio')
    list_filter = ('tipo_unidad', 'propiedad')
    ordering = ('propiedad', 'numero_unidad')


# Registro del modelo Inquilino
@admin.register(Propietario)
class PropietarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'documento_identidad', 'telefono', 'email', 'unidad')
    search_fields = ('nombre', 'apellido', 'documento_identidad', 'unidad__numero_unidad')
    ordering = ('unidad', 'apellido', 'nombre')

# Registro del modelo CuotaMantenimiento
@admin.register(CuotaMantenimiento)
class CuotaMantenimientoAdmin(admin.ModelAdmin):
    list_display = ('unidad', 'fecha', 'monto', 'estado')
    search_fields = ('unidad__numero_unidad',)
    list_filter = ('estado', 'fecha')
    ordering = ('-fecha', 'unidad')


# Registro del modelo Pago
@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('cuota', 'propietario', 'fecha', 'monto', 'contratoServicio')
    search_fields = ('cuota__unidad__numero_unidad', 'propietario__nombre', 'propietario__apellido')
    list_filter = ('fecha',)
    ordering = ('-fecha', 'cuota')

# Registro del modelo ContratoServicio
@admin.register(ContratoServicio)
class ContratoServicioAdmin(admin.ModelAdmin):
    list_display = ('proveedor', 'tipo_servicio', 'fecha_inicio', 'fecha_fin', 'monto', 'estado')
    search_fields = ('proveedor', 'tipo_servicio')
    list_filter = ('tipo_servicio', 'fecha_inicio', 'fecha_fin')
    ordering = ('-fecha_inicio', 'proveedor')

@admin.register(Ingreso)
class IngresoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'contraseña')
    search_fields = ['usuario']
    list_filter = ['usuario']
    ordering = ['usuario']

@admin.register(Registro)
class RegistroAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'contraseña', 'email')
    search_fields = ['usuario']
    list_filter = ['usuario']
    ordering = ['usuario']
