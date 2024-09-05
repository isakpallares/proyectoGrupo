from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .models import Propiedad, Unidad, Pago, Usuario
from .serializers import PropiedadSerializer, UnidadSerializer,  PagoSerializer, UsuarioSerializer


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer
    def perform_create(self, serializer):
        nombre_edificio = serializer.validated_data.get('numero_unidad',None)
        if Propiedad.objects.filter(nombre_edificio=nombre_edificio).exists():
            raise ValidationError("Ya existe esta propiedad.")
        serializer.save()
# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    def perform_create(self, serializer):
        numero_unidad = serializer.validated_data.get('numero_unidad', None)
        if Unidad.objects.filter(numero_unidad=numero_unidad).exists():
            raise ValidationError("Ya existe esta unidad.")
        serializer.save()
    
# ViewSet para Pago
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
