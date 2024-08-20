from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .models import Propiedad, Unidad, Propietario, CuotaMantenimiento, Pago, ContratoServicio, Presupuesto
from .serializers import PropiedadSerializer, UnidadSerializer, PropietarioSerializer, CuotaMantenimientoSerializer,  PagoSerializer, ContratoServicioSerializer, PresupuestoSerializer


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer
    def perform_create(self, serializer):
        nombre_edificio = serializer.validated_data.get('numero_unidad',None)
        if Propiedad.objects.filter(nombre_edificio=nombre_edificio).exists():
            raise ValidationError("Ya existe esta propiedad.")
        serializer.save()

class PresupuestoViewSet(viewsets.ModelViewSet):
    queryset = Presupuesto.objects.all()
    serializer_class = PresupuestoSerializer
    
    

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    def perform_create(self, serializer):
        numero_unidad = serializer.validated_data.get('numero_unidad', None)
        if Unidad.objects.filter(numero_unidad=numero_unidad).exists():
            raise ValidationError("Ya existe esta unidad.")
        serializer.save()
        
class PropietarioViewSet(viewsets.ModelViewSet):
    queryset = Propietario.objects.all()
    serializer_class = PropietarioSerializer
    def perform_create(self, serializer):
        documento_identidad = serializer.validated_data.get('documento_identidad', None)
        if Propietario.objects.filter(documento_identidad=documento_identidad).exists():
            raise ValidationError("Ya existe este propietario.")
        serializer.save()

# ViewSet para CuotaMantenimiento
class CuotaMantenimientoViewSet(viewsets.ModelViewSet):
    queryset = CuotaMantenimiento.objects.all()
    serializer_class = CuotaMantenimientoSerializer

# ViewSet para Pago
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# ViewSet para ContratoServicio
class ContratoServicioViewSet(viewsets.ModelViewSet):
    queryset = ContratoServicio.objects.all()
    serializer_class = ContratoServicioSerializer
