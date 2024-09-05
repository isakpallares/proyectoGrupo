from rest_framework import serializers
from .models import Propiedad, Unidad, Pago, Usuario

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

# Serializer para Pago
class PagoSerializer(serializers.ModelSerializer):
    unidad = UnidadSerializer(read_only=True)  
    propiedad = PropiedadSerializer(read_only=True)  
    class Meta:
        model = Pago
        fields = '__all__'
        
class  UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario
        fields = '__all__'