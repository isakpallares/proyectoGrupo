from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.utils import timezone
from .models import Propiedad, Unidad, Pago, Usuario
from .serializers import PropiedadSerializer, UnidadSerializer,  PagoSerializer, UsuarioSerializer


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer
    def perform_create(self, serializer):
        nombreEdificio = serializer.validated_data.get('numero_unidad',None)
        if Propiedad.objects.filter(nombre_edificio=nombreEdificio).exists():
            raise ValidationError("Ya existe esta propiedad.")
        serializer.save()

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    def perform_create(self, serializer):
        numeroUnidad = serializer.validated_data.get('numero_unidad', None)
        if Unidad.objects.filter(numero_unidad=numeroUnidad).exists():
            raise ValidationError("Ya existe esta unidad.")
        serializer.save()
    
# ViewSet para Pago

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    
    def create(self, request, *args, **kwargs):
        fecha_pago = request.data.get('fecha_pago')
        
        if fecha_pago:
            fecha_pago = timezone.datetime.strptime(fecha_pago, '%Y-%m-%d').date()
            if fecha_pago < timezone.now().date():
                raise ValidationError({"detail": "El pago ya ha vencido."})
        
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        fecha_pago = request.data.get('fecha_pago')

        if fecha_pago:
            fecha_pago = timezone.datetime.strptime(fecha_pago, '%Y-%m-%d').date()
            if fecha_pago < timezone.now().date():
                raise ValidationError({"detail": "El pago ya ha vencido y no puede ser actualizado."})

        return super().update(request, *args, **kwargs)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    def perform_create(self, serializer):
        email_v = serializer.validated_data.get('email',None)
        if Usuario.objects.filter(email=email_v).exists():
            raise ValidationError("Ya existe este usuario")
    
        serializer.save()

