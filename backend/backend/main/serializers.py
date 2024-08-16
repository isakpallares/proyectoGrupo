from rest_framework import serializers
from .models import Propiedad, Unidad, Inquilino, CuotaMantenimiento, Pago, ContratoServicio

# Serializer para Propiedad
class PropiedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propiedad
        fields = '__all__'

# Serializer para Unidad
class UnidadSerializer(serializers.ModelSerializer):
    propiedad = PropiedadSerializer(read_only=True)  

    class Meta:
        model = Unidad
        fields = '__all__'

# Serializer para Inquilino
class InquilinoSerializer(serializers.ModelSerializer):
    unidad = UnidadSerializer(read_only=True)  

    class Meta:
        model = Inquilino
        fields = '__all__'

# Serializer para CuotaMantenimiento
class CuotaMantenimientoSerializer(serializers.ModelSerializer):
    unidad = UnidadSerializer(read_only=True)  # Anidar el serializer de Unidad

    class Meta:
        model = CuotaMantenimiento
        fields = '__all__'


# Serializer para ContratoServicio
class ContratoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContratoServicio
        fields = '__all__'

# Serializer para Pago
class PagoSerializer(serializers.ModelSerializer):
    cuota = CuotaMantenimientoSerializer(read_only=True)  
    inquilino = InquilinoSerializer(read_only=True)  
    contrato_servicios = ContratoServicioSerializer(read_only=True)

    class Meta:
        model = Pago
        fields = '__all__'