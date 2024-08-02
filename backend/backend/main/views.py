from rest_framework import viewsets
from .models import Propiedad, Unidad, Propietario, Inquilino, CuotaMantenimiento, GastoComun, Pago, ContratoServicio
from .serializers import PropiedadSerializer, UnidadSerializer, PropietarioSerializer, InquilinoSerializer, CuotaMantenimientoSerializer, GastoComunSerializer, PagoSerializer, ContratoServicioSerializer

# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer

# ViewSet para Propietario
class PropietarioViewSet(viewsets.ModelViewSet):
    queryset = Propietario.objects.all()
    serializer_class = PropietarioSerializer

# ViewSet para Inquilino
class InquilinoViewSet(viewsets.ModelViewSet):
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer

# ViewSet para CuotaMantenimiento
class CuotaMantenimientoViewSet(viewsets.ModelViewSet):
    queryset = CuotaMantenimiento.objects.all()
    serializer_class = CuotaMantenimientoSerializer

# ViewSet para GastoComun
class GastoComunViewSet(viewsets.ModelViewSet):
    queryset = GastoComun.objects.all()
    serializer_class = GastoComunSerializer

# ViewSet para Pago
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# ViewSet para ContratoServicio
class ContratoServicioViewSet(viewsets.ModelViewSet):
    queryset = ContratoServicio.objects.all()
    serializer_class = ContratoServicioSerializer
