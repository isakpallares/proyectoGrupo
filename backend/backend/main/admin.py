from django.contrib import admin
from .models import Propiedad, Unidad, Pago, Usuario

# Registro del modelo Propiedad
@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ('direccion_propiedad', 'nombre_propiedad', 'numero_unidades', 'cuota', 'Presupuesto')
    search_fields = ('direccion_propiedad', 'nombre_propiedad')
    list_filter = ('nombre_propiedad',)
    ordering = ('nombre_propiedad',)


# Registro del modelo Unidad
@admin.register(Unidad)
class UnidadAdmin(admin.ModelAdmin):
    list_display = ('id_propiedad', 'numero_unidad','nombre_inquilino','cedula_inquilino', 'telefono_inquilino', 'estado', 'coeficiente')
    search_fields = ['numero_unidad']
    list_filter = ['numero_unidad']
    ordering = ['numero_unidad']
# Registro del modelo Pago
@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('id_propiedad', 'id_unidad', 'fecha_pago', 'tipo_pago', 'monto_pago')
    search_fields = ['id_unidad']
    list_filter = ['fecha_pago', 'monto_pago']
    ordering = ['-fecha_pago']
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('contraseña', 'email')
    search_fields = ['email']
    list_filter = ['email']
    ordering = ['email']
